# goodWill 🩸

## Overview
**goodWill** started with a simple goal—to make finding blood donors quick and hassle-free during emergencies. Our platform connects patients in urgent need of blood with registered donors, nearby blood banks, and hospitals through a real-time, location-based search system. Patients can enter their blood type and details to find matching resources quickly. Donors register their information, view a list of patients, and choose to donate. Upon donation, they receive confirmation and earn 15 reward points. Once they accumulate 100 points, they unlock perks like free health check-ups, encouraging regular participation. The solution creates an efficient, secure, and incentivized ecosystem that bridges the gap between donors and those in need, ensuring faster and more reliable access to life-saving blood.

## 🚀 Features

- View a list of hospitals and their current blood stock by blood type
- Donate blood and update hospital records
- Sort hospitals by blood type availability
- Seed and populate hospital data for testing and development
- Fast and responsive UI 

## 🛠️ Tech Stack

**Frontend**
- React (with Vite)
- TypeScript
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose

## 📁 Project Structure

```
GOODWILLFINAL12-main/
│
├── src/                  # Frontend React source files
├── init/                 # Express backend with models, routes, and seeders
├── public/               # Static assets
├── components.json       # UI components definition
├── index.html            # Entry HTML
├── tailwind.config.ts    # Tailwind configuration
├── vite.config.ts        # Vite config for frontend
└── README.md             # This file
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/goodWill.git
cd GOODWILLFINAL12-main
```

---

### 2. Backend Setup (Express + MongoDB)

```bash
cd init
npm install
```

> Make sure MongoDB is running locally on `mongodb://localhost:27017`

To seed hospital data:
```bash
node seed-hospital.js
```

To start the server:
```bash
node server.js
```

---

### 3. Frontend Setup (React + Vite)

```bash
cd ..
npm install
npm run dev
```

Visit the app in your browser at: `http://localhost:5173`

---

## 📦 API Overview

- `GET /hospital/available`: Fetches hospitals sorted by blood type availability
- `POST /hospital/update`: Updates hospital blood inventory upon donation

---

## 🧪 Seed Data

You can prepopulate the database using:

```bash
cd init
node seed-hospital.js
```

This creates mock hospital records with varying blood inventories.

## Contribution
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push to branch (`git push origin feature-branch`)
5. Open a pull request


