# InternHub — Full-Stack Internship Portal

Frontend and backend are connected. The Express server serves the website and its API from one address. Internship records are saved in `Backend/data/internships.json`, so **MongoDB or an `.env` file is not required** to run the included version.

## Requirements
- Node.js 18 or newer
- npm

## Run in VS Code (Windows)
1. Extract this ZIP file.
2. In VS Code, choose **File → Open Folder** and open `internship-portal-connected`.
3. Open **Terminal → New Terminal**.
4. Run these commands:

   ```powershell
   cd Backend
   npm install
   npm start
   ```

5. Wait until the terminal shows `InternHub is running at http://localhost:5000`.
6. Open **http://localhost:5000** in Chrome. Do not open `Frontend/index.html` directly; use the local server URL so API requests work.

## Features
- Responsive internship portal homepage and category sections
- Add internship records
- View and search saved records
- Filter by location from the hero section
- Edit and delete records
- Application status and date fields
- REST API with validation and health check
- Persistent local JSON storage; records remain after restarting the server

## API endpoints
- `GET /api/health` — API health
- `GET /api/internships` — list all records
- `GET /api/internships/:id` — get one record
- `POST /api/internships` — create a record
- `PUT /api/internships/:id` — update a record
- `DELETE /api/internships/:id` — delete a record

## Storage note
This ready-to-run version uses a local JSON file to avoid requiring a separate MongoDB account or connection string. To reset all saved records, stop the server and replace the contents of `Backend/data/internships.json` with `[]`.

## Login and registration
The supplied design includes Login and Register buttons, but no authentication backend was included. Those buttons are kept as placeholders and do not create accounts.
