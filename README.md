# 🐾 Fur Fetch — Full-Stack Pet Adoption Platform

🚀 A full-stack pet adoption platform that enables shelters to manage pets, users to apply for adoption, and schedule meet-and-greets — all through a unified API-driven system.

---

## 📌 Overview

**Fur Fetch** is a full-stack web application designed to streamline the pet adoption process by connecting shelters and adopters through a clean UI and a robust REST API.

Built as part of a Work-Integrated Learning (WIL) project, this system demonstrates real-world full-stack development practices including API design, middleware handling, and deployment.

---

## 🌍 Live Demo

🔗 https://your-app-url.onrender.com *(add after deployment)*

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Architecture:** RESTful API + Single Page Application
* **Data Handling:** In-memory JSON (prototype stage)
* **Deployment:** Render (full-stack single service)

---

## 🏗️ Architecture

```
Frontend (SPA)
     ↓
Express Server (API + Static Hosting)
     ↓
In-Memory Data Store (Prototype)
```

👉 The frontend is served directly from the backend using Express static middleware, enabling a unified deployment.

---

## ✨ Features

### 🔹 Core Functionality

* Browse pets with advanced filters (species, breed, age, location)
* Create, update, and delete pet profiles (CRUD)
* Submit adoption applications
* Schedule meet-and-greet sessions
* View platform statistics dashboard

### 🔹 Backend Highlights

* RESTful API design
* Middleware-based validation
* Error handling system
* Query filtering & search functionality
* Modular route structure

### 🔹 Frontend Highlights

* Responsive UI
* Clean and intuitive UX
* Dynamic data rendering from API
* Highlighting urgent adoption cases

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd fur_fetch_project
```

---

### 2. Install dependencies

```bash
cd backend
npm install
```

---

### 3. Run the application

```bash
npm start
```

---

### 4. Open in browser

```
http://localhost:3000
```

👉 Both frontend and backend run from the same server.

---

## 📡 API Endpoints

### Pets

* `GET /api/pets` — Get all pets (with filters)
* `GET /api/pets/:id` — Get pet by ID
* `POST /api/pets` — Create pet
* `PUT /api/pets/:id` — Update pet
* `DELETE /api/pets/:id` — Delete pet

### Applications

* `GET /api/applications`
* `POST /api/applications`
* `PUT /api/applications/:id`
* `DELETE /api/applications/:id`

### Meet & Greets

* `GET /api/meet-greets`
* `POST /api/meet-greets`
* `PUT /api/meet-greets/:id`
* `DELETE /api/meet-greets/:id`

### Other

* `GET /api/shelters`
* `GET /api/stats`
* `GET /api/docs`

---

## 🧪 Testing

Test endpoints locally:

```bash
curl http://localhost:3000/api/pets
curl http://localhost:3000/api/stats
```

---

## 📁 Project Structure

```
fur_fetch_project/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   └── index.html
├── database/
│   └── schema.sql
└── README.md
```

---

## 🗄️ Data Handling

Currently uses **in-memory data structures** for rapid prototyping.

### 🔮 Future Improvements

* Integrate PostgreSQL / MongoDB
* Persistent data storage
* Authentication & authorization
* Cloud storage for images

---

## 🚀 Deployment

The application is deployed as a **single full-stack service on Render**:

* Express serves both API and frontend
* No separate frontend hosting required
* Simplified deployment architecture

---

## 💡 Key Learnings

* Full-stack architecture design
* REST API development with Express
* Middleware and request validation
* Deployment and environment configuration
* Debugging real-world issues (routing, ports, paths)

---

## 👨‍💻 Author

**Shikhil Saxena**
Full Stack Software Development
Lambton College

---

## 📜 License

MIT License — for educational use

---

## 🐾 Closing Note

> Every pet deserves a loving home — and every developer deserves a clean, working deployment.
