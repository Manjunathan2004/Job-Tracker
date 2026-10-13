const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const crypto = require('crypto');

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const frontendPath = path.join(__dirname, '..', 'Frontend');
const dataDirectory = path.join(__dirname, 'data');
const dataFile = path.join(dataDirectory, 'internships.json');
const allowedStatuses = new Set(['Applied', 'Interview', 'Offer', 'Rejected']);

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(express.static(frontendPath));

async function ensureDataFile() {
  await fs.mkdir(dataDirectory, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, '[]\n', 'utf8');
  }
}

async function readInternships() {
  await ensureDataFile();
  const raw = await fs.readFile(dataFile, 'utf8');
  const parsed = JSON.parse(raw || '[]');
  return Array.isArray(parsed) ? parsed : [];
}

async function writeInternships(items) {
  await ensureDataFile();
  const tempFile = `${dataFile}.tmp`;
  await fs.writeFile(tempFile, `${JSON.stringify(items, null, 2)}\n`, 'utf8');
  await fs.rename(tempFile, dataFile);
}

function validateInternship(body) {
  const company = String(body.company || '').trim();
  const role = String(body.role || '').trim();
  const location = String(body.location || '').trim();
  const status = String(body.status || 'Applied').trim();
  const applicationDate = String(body.applicationDate || '').trim();

  if (!company || !role || !location || !applicationDate) {
    return { error: 'Company, role, location and application date are required.' };
  }
  if (company.length > 100 || role.length > 100 || location.length > 100) {
    return { error: 'Company, role and location must be 100 characters or fewer.' };
  }
  if (!allowedStatuses.has(status)) {
    return { error: 'Status must be Applied, Interview, Offer or Rejected.' };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(applicationDate) || Number.isNaN(Date.parse(`${applicationDate}T00:00:00Z`))) {
    return { error: 'Please provide a valid application date in YYYY-MM-DD format.' };
  }
  return { value: { company, role, location, status, applicationDate } };
}

app.get('/api/health', async (req, res) => {
  try {
    await ensureDataFile();
    res.json({ status: 'ok', database: 'local-json', message: 'InternHub API is ready.' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/api/internships', async (req, res) => {
  try {
    const items = await readInternships();
    items.sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Could not load internships.', error: error.message });
  }
});

app.get('/api/internships/:id', async (req, res) => {
  try {
    const items = await readInternships();
    const item = items.find((entry) => entry._id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Internship not found.' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Could not load internship.', error: error.message });
  }
});

app.post('/api/internships', async (req, res) => {
  const validation = validateInternship(req.body || {});
  if (validation.error) return res.status(400).json({ message: validation.error });
  try {
    const items = await readInternships();
    const now = new Date().toISOString();
    const item = { _id: crypto.randomUUID(), ...validation.value, createdAt: now, updatedAt: now };
    items.push(item);
    await writeInternships(items);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Could not save internship.', error: error.message });
  }
});

app.put('/api/internships/:id', async (req, res) => {
  const validation = validateInternship(req.body || {});
  if (validation.error) return res.status(400).json({ message: validation.error });
  try {
    const items = await readInternships();
    const index = items.findIndex((entry) => entry._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Internship not found.' });
    items[index] = { ...items[index], ...validation.value, updatedAt: new Date().toISOString() };
    await writeInternships(items);
    res.json(items[index]);
  } catch (error) {
    res.status(500).json({ message: 'Could not update internship.', error: error.message });
  }
});

app.delete('/api/internships/:id', async (req, res) => {
  try {
    const items = await readInternships();
    const index = items.findIndex((entry) => entry._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Internship not found.' });
    const [deleted] = items.splice(index, 1);
    await writeInternships(items);
    res.json({ message: 'Internship deleted successfully.', deleted });
  } catch (error) {
    res.status(500).json({ message: 'Could not delete internship.', error: error.message });
  }
});

app.use('/api', (req, res) => res.status(404).json({ message: 'API endpoint not found.' }));
app.get('*path', (req, res) => res.sendFile(path.join(frontendPath, 'index.html')));

ensureDataFile()
  .then(() => app.listen(PORT, () => {
    console.log(`InternHub is running at http://localhost:${PORT}`);
    console.log('Internship data is saved locally in Backend/data/internships.json');
  }))
  .catch((error) => {
    console.error('Unable to prepare internship data file:', error.message);
    process.exit(1);
  });
