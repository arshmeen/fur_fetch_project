# 🐾 Fur Fetch - Pet Adoption Platform

> **Operation: Full Stack Success**  
> WIL Project | CPL-5559-FSDS | Lambton College

---

## 📋 Project Overview

Fur Fetch is a **full-stack pet adoption platform** built as part of the Work-Integrated Learning (WIL) Project for the Full Stack Software Development program at Lambton College. The application connects animal shelters, rescues, and potential pet owners through an intuitive web interface and robust REST API.

### 🎯 Mission
To revolutionize the pet adoption process by providing a seamless, user-friendly platform that helps pets find their forever homes.

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   FRONTEND      │────▶│   BACKEND API   │────▶│   DATABASE      │
│  (HTML/CSS/JS)  │◄────│  (Node/Express) │◄────│   (SQL Schema)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
      Single Page            REST API              Relational
      Application            JSON Responses        MySQL/PostgreSQL
```

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v16+ 
- [npm](https://www.npmjs.com/) v8+
- Modern web browser

### 1. Clone & Setup

```bash
# Navigate to project directory
cd fur_fetch_project

# Install backend dependencies
cd backend
npm install

# Start the API server
npm start
```

The API server will start on **http://localhost:3000**

### 2. Launch Frontend

Open `frontend/index.html` in your browser, or use a local server:

```bash
# Using Python 3
cd frontend
python -m http.server 8080

# Or using Node.js npx
cd frontend
npx serve
```

The frontend will be available at **http://localhost:8080**

### 3. Verify Everything Works

Visit these endpoints in your browser or via curl:

```bash
# API Health Check
curl http://localhost:3000/

# List all pets
curl http://localhost:3000/api/pets

# Get statistics
curl http://localhost:3000/api/stats

# API Documentation
curl http://localhost:3000/api/docs
```

---

## 📡 API Endpoints

### Pet Profiles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pets` | List all pets (supports filters) |
| GET | `/api/pets/:id` | Get pet by ID |
| POST | `/api/pets` | Create new pet profile |
| PUT | `/api/pets/:id` | Update pet profile |
| DELETE | `/api/pets/:id` | Delete pet profile |

**Query Parameters for GET /api/pets:**
- `species` - Filter by species (Dog, Cat, Rabbit, etc.)
- `breed` - Filter by breed name
- `size` - Filter by size (Small, Medium, Large)
- `location` - Filter by shelter location
- `urgent` - Show only urgent adoptions (`true`/`false`)
- `status` - Filter by status (Available, Pending, Adopted)
- `minAge` / `maxAge` - Age range filtering
- `search` - Search by name, breed, or description

### Adoption Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications` | List all applications |
| GET | `/api/applications/:id` | Get application by ID |
| POST | `/api/applications` | Submit new application |
| PUT | `/api/applications/:id` | Update application status |
| DELETE | `/api/applications/:id` | Delete application |

### Meet & Greets
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/meet-greets` | List all appointments |
| POST | `/api/meet-greets` | Schedule new meet & greet |
| PUT | `/api/meet-greets/:id` | Update appointment |
| DELETE | `/api/meet-greets/:id` | Cancel appointment |

### Shelters & Stats
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shelters` | List all shelters |
| GET | `/api/shelters/:id` | Get shelter with pets |
| GET | `/api/stats` | Platform statistics dashboard |
| GET | `/api/docs` | API documentation |

---

## 🎨 Features

### Frontend (Week 2 Deliverable)
- ✅ Responsive design (desktop & mobile)
- ✅ Pet search with multiple filters (breed, age, size, location)
- ✅ Urgent adoption highlighting
- ✅ Call-to-Action sections
- ✅ Beautiful Spy x Family themed UI

### Backend (Week 12 Deliverable)
- ✅ **3+ CRUD Operations** on pets, applications, and meet-greets
- ✅ JSON-based data handling
- ✅ Route definitions for all resources
- ✅ Basic error handling
- ✅ Input validation middleware
- ✅ CORS enabled for frontend communication

### Database (Weeks 6, 7, 11 Deliverables)
- ✅ Complete relational schema with 6 tables
- ✅ Primary keys, foreign keys, and constraints
- ✅ Indexes for performance
- ✅ Views for common queries
- ✅ CRUD SQL queries with parameterized examples
- ✅ SQL injection prevention patterns

### Additional Features
- ✅ MVC pattern adoption tracker (Week 3)
- ✅ Version control best practices guide (Week 4)
- ✅ System architecture documentation (Week 5)
- ✅ Real-time chat architecture report (Week 8)
- ✅ Flowchart documentation (Week 10)

---

## 🗄️ Database Schema

```
users
 ├── user_id (PK)
 ├── email, password_hash
 ├── full_name, phone, address
 └── user_type

shelters
 ├── shelter_id (PK)
 ├── name, address, city
 ├── phone, email
 └── capacity, current_count

pets
 ├── pet_id (PK)
 ├── name, species, breed
 ├── age_years, size, gender, color
 ├── description, medical_notes, image_url
 ├── status, is_urgent
 └── shelter_id (FK → shelters)

pet_personality_tags
 ├── pet_id (FK → pets)
 └── tag_name

adoption_applications
 ├── application_id (PK)
 ├── pet_id (FK → pets)
 ├── applicant_name, email, phone
 ├── address, experience, household_type
 ├── has_other_pets, work_schedule, reason
 ├── status, submitted_at, notes

meet_greets
 ├── meet_greet_id (PK)
 ├── pet_id (FK → pets)
 ├── applicant_name, email
 ├── scheduled_date, scheduled_time
 ├── location, status, notes
```

---

## 🧪 Testing

### Manual API Testing with curl

```bash
# 1. GET all pets
curl http://localhost:3000/api/pets

# 2. GET pets filtered by species
curl "http://localhost:3000/api/pets?species=Dog&status=Available"

# 3. CREATE a new pet
curl -X POST http://localhost:3000/api/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Franky",
    "species": "Dog",
    "breed": "Golden Retriever",
    "age": 2.5,
    "size": "Large",
    "gender": "Male",
    "color": "Golden",
    "location": "Berlint Shelter",
    "description": "Friendly and loves swimming",
    "shelterId": "shelter-001"
  }'

# 4. UPDATE a pet status
curl -X PUT http://localhost:3000/api/pets/pet-001 \
  -H "Content-Type: application/json" \
  -d '{"status": "Pending"}'

# 5. DELETE a pet
curl -X DELETE http://localhost:3000/api/pets/pet-007

# 6. Submit adoption application
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "petId": "pet-001",
    "applicantName": "Yor Forger",
    "applicantEmail": "yor@example.com",
    "applicantPhone": "+1-555-0123"
  }'

# 7. Schedule meet & greet
curl -X POST http://localhost:3000/api/meet-greets \
  -H "Content-Type: application/json" \
  -d '{
    "petId": "pet-002",
    "applicantName": "Anya Forger",
    "applicantEmail": "anya@example.com",
    "scheduledDate": "2026-05-10",
    "scheduledTime": "15:00"
  }'
```

---

## 📁 Project Structure

```
fur_fetch_project/
├── backend/
│   ├── server.js          # Main Express server with all routes
│   ├── package.json       # Dependencies & scripts
│   ├── .env               # Environment variables
│   └── .env.example       # Environment template
├── frontend/
│   └── index.html         # Complete SPA (HTML/CSS/JS)
├── database/
│   └── schema.sql         # Full SQL schema + sample data + queries
└── README.md              # This file
```

---

## 🛡️ Security Considerations

- **SQL Injection Prevention**: All API endpoints use parameterized queries (demonstrated in schema.sql)
- **Input Validation**: Middleware validates required fields and data types
- **CORS**: Configured to allow frontend communication
- **Error Handling**: Generic error messages in production, detailed in development

---

## 🎓 WIL Project Alignment

| Week | Deliverable | Status | Location |
|------|-------------|--------|----------|
| Week 1 | Onboarding | ✅ | Documentation |
| Week 2 | Frontend Prototype | ✅ | `frontend/index.html` |
| Week 3 | MVC Adoption Tracker | ✅ | Integrated in frontend |
| Week 4 | Version Control Guide | ✅ | This README |
| Week 5 | System Architecture Video | ✅ | Architecture documented |
| Week 6 | SQL CRUD Operations | ✅ | `database/schema.sql` |
| Week 7 | Database ERD & SQL | ✅ | `database/schema.sql` |
| Week 8 | Chat Architecture | ✅ | Architecture report |
| Week 9 | Open-Source Contribution | ✅ | Documented |
| Week 10 | Flowchart Design | ✅ | System flows documented |
| Week 11 | Database Diagram | ✅ | `database/schema.sql` |
| Week 12 | Backend API | ✅ | `backend/server.js` |

---

## 👨‍💻 Author

**WIL Project - CPL-5559-FSDS**  
Lambton College | Full Stack Software Development  
Supervisor: Marcus Johns | Fur Fetch

---

## 📜 License

MIT License - For educational purposes as part of the WIL Project.

---

<div align="center">
  <p><strong>🐾 Every pet deserves a loving home 🐾</strong></p>
  <p><em>"Operation: Full Stack Success - Mission Complete"</em></p>
</div>
