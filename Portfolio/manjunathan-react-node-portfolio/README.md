# Manjunathan S — React + Node.js Portfolio

A responsive personal portfolio based on the supplied resume. The frontend uses React + Vite, and the backend uses Node.js + Express.

## Requirements
- Node.js 18+ (recommended: current LTS)
- npm

## Run in VS Code
1. Extract the ZIP file.
2. Open the extracted `manjunathan-react-node-portfolio` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Install the root helper package:
   ```bash
   npm install
   ```
5. Install frontend and backend dependencies:
   ```bash
   npm run install:all
   ```
6. Start both servers:
   ```bash
   npm run dev
   ```
7. Open the frontend URL shown by Vite, usually `http://localhost:5173`.

Backend runs at `http://localhost:5000`. Test its health endpoint at `http://localhost:5000/api/health`.

## Project structure
```text
manjunathan-react-node-portfolio/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── server/
│   ├── package.json
│   └── server.js
├── package.json
└── README.md
```

## Contact form
The form sends data to `POST /api/contact`. The server validates the fields and logs the message in the terminal. This demo does not send email or persist messages to a database; configure an email provider or database before deploying.

## Personal details
The portfolio uses the details visible in the supplied resume. Review your phone number, email, college dates, CGPA, and project details before publishing. Replace the sample GitHub and LinkedIn URLs in `client/src/App.jsx` with your real profile links.
