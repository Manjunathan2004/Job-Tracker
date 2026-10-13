const API_URL = "/api/internships";

const internshipForm = document.getElementById("internshipForm");
const internshipList = document.getElementById("internshipList");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const formMessage = document.getElementById("formMessage");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const internshipCount = document.getElementById("internshipCount");

let internships = [];
let editingId = null;

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function formatDate(date) {
  if (!date) return "Not provided";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "Not provided" : parsed.toLocaleDateString("en-IN");
}

async function requestJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...(options.headers || {}) }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || `Request failed (${response.status})`);
  return payload;
}

async function loadInternships() {
  internshipList.innerHTML = "<p>Loading internships...</p>";
  try {
    internships = await requestJSON(API_URL);
    renderFilteredInternships();
  } catch (error) {
    internshipList.innerHTML = `<p class="error">${escapeHTML(error.message)}. Check that the backend server is running.</p>`;
    internshipCount.textContent = "Could not load data";
  }
}

function searchInternships() {
  document.getElementById("internships").scrollIntoView({ behavior: "smooth" });
  renderFilteredInternships();
}

function renderFilteredInternships() {
  const term = (searchInput.value || "").trim().toLowerCase();
  const location = (locationFilter.value || "").trim().toLowerCase();
  const filtered = internships.filter((item) => {
    const searchable = [item.company, item.role, item.location, item.status].join(" ").toLowerCase();
    return searchable.includes(term) && (!location || String(item.location || "").toLowerCase().includes(location));
  });
  internshipCount.textContent = `${filtered.length} internship${filtered.length === 1 ? "" : "s"}`;
  if (!filtered.length) {
    internshipList.innerHTML = "<p>No internships found. Add one using the form above.</p>";
    return;
  }
  internshipList.innerHTML = filtered.map((item) => `
    <article class="internship-card">
      <div class="company-logo">${escapeHTML((item.company || "?").charAt(0).toUpperCase())}</div>
      <h3>${escapeHTML(item.role)}</h3>
      <p><strong>Company:</strong> ${escapeHTML(item.company)}</p>
      <p><strong>Location:</strong> ${escapeHTML(item.location)}</p>
      <p><strong>Status:</strong> <span class="status-pill">${escapeHTML(item.status)}</span></p>
      <p><strong>Application date:</strong> ${escapeHTML(formatDate(item.applicationDate))}</p>
      <div class="card-buttons">
        <button type="button" class="edit-btn" data-action="edit" data-id="${escapeHTML(item._id)}">Edit</button>
        <button type="button" class="delete-btn" data-action="delete" data-id="${escapeHTML(item._id)}">Delete</button>
      </div>
    </article>
  `).join("");
}

function resetForm() {
  internshipForm.reset();
  editingId = null;
  formTitle.textContent = "Add an Internship";
  submitBtn.textContent = "Add Internship";
  cancelEditBtn.hidden = true;
  formMessage.textContent = "";
  document.getElementById("applicationDate").value = new Date().toISOString().slice(0, 10);
}

internshipForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const internshipData = {
    company: document.getElementById("company").value.trim(),
    role: document.getElementById("role").value.trim(),
    location: document.getElementById("applicationLocation").value.trim(),
    status: document.getElementById("status").value,
    applicationDate: document.getElementById("applicationDate").value
  };
  if (Object.values(internshipData).some((value) => !value)) {
    formMessage.textContent = "Please fill in all fields.";
    return;
  }
  submitBtn.disabled = true;
  const wasEditing = Boolean(editingId);
  try {
    if (editingId) {
      await requestJSON(`${API_URL}/${editingId}`, { method: "PUT", body: JSON.stringify(internshipData) });
      formMessage.textContent = "Internship updated successfully.";
    } else {
      await requestJSON(API_URL, { method: "POST", body: JSON.stringify(internshipData) });
      formMessage.textContent = "Internship added successfully.";
    }
    resetForm();
    await loadInternships();
    formMessage.textContent = wasEditing ? "Internship updated successfully." : "Internship added successfully.";
  } catch (error) {
    formMessage.textContent = error.message;
  } finally {
    submitBtn.disabled = false;
  }
});

internshipList.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const item = internships.find((entry) => entry._id === button.dataset.id);
  if (!item) return;

  if (button.dataset.action === "edit") {
    editingId = item._id;
    document.getElementById("company").value = item.company || "";
    document.getElementById("role").value = item.role || "";
    document.getElementById("applicationLocation").value = item.location || "";
    document.getElementById("status").value = item.status || "Applied";
    document.getElementById("applicationDate").value = item.applicationDate ? new Date(item.applicationDate).toISOString().slice(0, 10) : "";
    formTitle.textContent = "Edit Internship";
    submitBtn.textContent = "Save Changes";
    cancelEditBtn.hidden = false;
    formMessage.textContent = "";
    internshipForm.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (button.dataset.action === "delete" && confirm(`Delete the internship at ${item.company}?`)) {
    try {
      await requestJSON(`${API_URL}/${item._id}`, { method: "DELETE" });
      await loadInternships();
      formMessage.textContent = "Internship deleted successfully.";
    } catch (error) {
      formMessage.textContent = error.message;
    }
  }
});

searchInput.addEventListener("input", renderFilteredInternships);
locationFilter.addEventListener("change", renderFilteredInternships);
document.getElementById("refreshBtn").addEventListener("click", loadInternships);
cancelEditBtn.addEventListener("click", resetForm);

document.querySelectorAll(".category-card h3").forEach((heading) => {
  heading.closest(".category-card").style.cursor = "pointer";
  heading.closest(".category-card").addEventListener("click", () => {
    searchInput.value = heading.textContent;
    locationFilter.value = "";
    renderFilteredInternships();
    document.getElementById("internships").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll(".nav-buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    alert("Login and registration are not included in this internship tracker version.");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("applicationDate").value = new Date().toISOString().slice(0, 10);
  loadInternships();
});
