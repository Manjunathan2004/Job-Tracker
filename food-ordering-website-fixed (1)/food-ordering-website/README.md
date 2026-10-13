# Foodie — React + Node/Express Food Ordering App

## Features
- Responsive food menu, search and category filters
- Add products to cart, change quantities and remove items
- Cart subtotal, delivery fee and total calculation
- Checkout form and order confirmation
- Express API for food data and placing/listing demo orders

> Demo note: orders are stored in server memory and disappear when the server restarts. This project does not collect payments and does not use a database.

## Run in VS Code

### 1. Frontend
Open a terminal in the project root (the folder containing the root `package.json`):

```bash
npm install
npm run dev
```

Open http://localhost:5173

### 2. Backend (optional API)
Open a second terminal:

```bash
cd server
npm install
npm run dev
```

API: http://localhost:5000/api/foods

The frontend cart and checkout work independently of the API. The Express server exposes demo API endpoints for future integration.

## Troubleshooting
- If npm says `package.json` is missing, run `dir` and change to the folder where the root `package.json` and `src` folder are present.
- Keep each `npm run dev` terminal open while using that server.
- Food photos load from Unsplash and require internet access.
