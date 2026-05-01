/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                    FUR FETCH - PET ADOPTION API                        ║
 * ║              Operation: Full Stack Success (WIL Project)              ║
 * ║                    CPL-5559-FSDS | Lambton College                    ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 */

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../frontend")));

// ═══════════════════════════════════════════════════════════════════════
// IN-MEMORY DATA STORE (JSON-based as per Week 12 requirements)
// ═══════════════════════════════════════════════════════════════════════

let pets = [
  {
    id: "pet-001",
    name: "Bond",
    species: "Dog",
    breed: "Great Pyrenees",
    age: 3,
    size: "Large",
    gender: "Male",
    color: "White",
    location: "Berlint Shelter",
    description: "A gentle giant who loves peanut butter and long walks. Very protective and loyal.",
    urgent: true,
    status: "Available",
    medicalNotes: "Vaccinated, neutered, healthy",
    personality: ["Gentle", "Protective", "Loyal", "Calm"],
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
    dateAdded: "2026-04-15",
    shelterId: "shelter-001"
  },
  {
    id: "pet-002",
    name: "Anya",
    species: "Cat",
    breed: "Scottish Fold",
    age: 1,
    size: "Small",
    gender: "Female",
    color: "Gray",
    location: "Ostania Rescue Center",
    description: "Playful and curious kitten who loves to explore. Gets along well with other cats.",
    urgent: false,
    status: "Available",
    medicalNotes: "Vaccinated, spayed, microchipped",
    personality: ["Playful", "Curious", "Friendly", "Energetic"],
    imageUrl: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400",
    dateAdded: "2026-04-20",
    shelterId: "shelter-002"
  },
  {
    id: "pet-003",
    name: "Damian",
    species: "Dog",
    breed: "Shiba Inu",
    age: 2,
    size: "Medium",
    gender: "Male",
    color: "Tan & White",
    location: "Berlint Shelter",
    description: "Confident and independent. Needs an experienced owner who understands the breed.",
    urgent: false,
    status: "Available",
    medicalNotes: "Vaccinated, neutered",
    personality: ["Confident", "Independent", "Intelligent", "Alert"],
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400",
    dateAdded: "2026-04-22",
    shelterId: "shelter-001"
  },
  {
    id: "pet-004",
    name: "Becky",
    species: "Rabbit",
    breed: "Holland Lop",
    age: 1,
    size: "Small",
    gender: "Female",
    color: "White & Brown",
    location: "Ostania Rescue Center",
    description: "Sweet bunny who loves being held and petted. Loves carrots and leafy greens.",
    urgent: true,
    status: "Available",
    medicalNotes: "Healthy, spayed",
    personality: ["Sweet", "Gentle", "Social", "Calm"],
    imageUrl: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400",
    dateAdded: "2026-04-25",
    shelterId: "shelter-002"
  },
  {
    id: "pet-005",
    name: "Yor",
    species: "Cat",
    breed: "Maine Coon",
    age: 4,
    size: "Large",
    gender: "Female",
    color: "Black",
    location: "Westalis Animal Haven",
    description: "Majestic and elegant. Very affectionate once she trusts you. Indoor cat preferred.",
    urgent: false,
    status: "Available",
    medicalNotes: "Vaccinated, spayed, declawed (previous owner)",
    personality: ["Elegant", "Affectionate", "Independent", "Loyal"],
    imageUrl: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400",
    dateAdded: "2026-04-18",
    shelterId: "shelter-003"
  },
  {
    id: "pet-006",
    name: "Loid",
    species: "Dog",
    breed: "Border Collie",
    age: 5,
    size: "Medium",
    gender: "Male",
    color: "Black & White",
    location: "Berlint Shelter",
    description: "Highly intelligent and trainable. Needs mental stimulation and regular exercise.",
    urgent: false,
    status: "Pending",
    medicalNotes: "Vaccinated, neutered, hip dysplasia monitored",
    personality: ["Intelligent", "Energetic", "Loyal", "Trainable"],
    imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=400",
    dateAdded: "2026-04-10",
    shelterId: "shelter-001"
  }
];

let applications = [
  {
    id: "app-001",
    petId: "pet-006",
    applicantName: "Twilight",
    applicantEmail: "twilight@wis.org",
    applicantPhone: "+1-555-0199",
    address: "128 Park Avenue, Berlint",
    experience: "Experienced - had dogs for 10+ years",
    householdType: "House with yard",
    hasOtherPets: false,
    workSchedule: "Full-time remote",
    reason: "Looking for an intelligent companion for my daughter",
    status: "Pending Review",
    submittedAt: "2026-04-28T10:30:00Z",
    notes: "Strong application, good references"
  }
];

let meetGreets = [
  {
    id: "mg-001",
    petId: "pet-006",
    applicantName: "Twilight",
    applicantEmail: "twilight@wis.org",
    scheduledDate: "2026-05-02",
    scheduledTime: "14:00",
    location: "Berlint Shelter - Meeting Room A",
    status: "Scheduled",
    notes: "Bring family members"
  }
];

let shelters = [
  {
    id: "shelter-001",
    name: "Berlint Shelter",
    address: "45 Oak Street, Berlint",
    phone: "+1-555-0100",
    email: "contact@berlintshelter.org",
    capacity: 50,
    currentPets: 23
  },
  {
    id: "shelter-002",
    name: "Ostania Rescue Center",
    address: "78 Maple Drive, Ostania",
    phone: "+1-555-0200",
    email: "info@ostaniarescue.org",
    capacity: 40,
    currentPets: 18
  },
  {
    id: "shelter-003",
    name: "Westalis Animal Haven",
    address: "22 Pine Road, Westalis",
    phone: "+1-555-0300",
    email: "help@westalishaven.org",
    capacity: 35,
    currentPets: 15
  }
];

// ═══════════════════════════════════════════════════════════════════════
// MIDDLEWARE - Validation & Error Handling
// ═══════════════════════════════════════════════════════════════════════

const validatePet = (req, res, next) => {
  const { name, species, breed, age, size, gender } = req.body;
  if (!name || !species || !breed || age === undefined || !size || !gender) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: name, species, breed, age, size, gender"
    });
  }
  if (typeof age !== 'number' || age < 0) {
    return res.status(400).json({
      success: false,
      error: "Age must be a positive number"
    });
  }
  next();
};

const validateApplication = (req, res, next) => {
  const { petId, applicantName, applicantEmail, applicantPhone } = req.body;
  if (!petId || !applicantName || !applicantEmail || !applicantPhone) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: petId, applicantName, applicantEmail, applicantPhone"
    });
  }
  const pet = pets.find(p => p.id === petId);
  if (!pet) {
    return res.status(404).json({
      success: false,
      error: "Pet not found"
    });
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
    timestamp: new Date().toISOString()
  });
};

// ═══════════════════════════════════════════════════════════════════════
// ROUTES - PET PROFILES (Week 12 CRUD Operations)
// ═══════════════════════════════════════════════════════════════════════

/**
 * @route   GET /api/pets
 * @desc    Get all pets with optional filtering
 * @access  Public
 */
app.get('/api/pets', (req, res) => {
  try {
    let result = [...pets];
    const { species, breed, size, location, urgent, status, search, minAge, maxAge } = req.query;

    if (species) result = result.filter(p => p.species.toLowerCase() === species.toLowerCase());
    if (breed) result = result.filter(p => p.breed.toLowerCase().includes(breed.toLowerCase()));
    if (size) result = result.filter(p => p.size.toLowerCase() === size.toLowerCase());
    if (location) result = result.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
    if (urgent) result = result.filter(p => p.urgent === (urgent === 'true'));
    if (status) result = result.filter(p => p.status.toLowerCase() === status.toLowerCase());
    if (minAge) result = result.filter(p => p.age >= parseInt(minAge));
    if (maxAge) result = result.filter(p => p.age <= parseInt(maxAge));
    if (search) {
      const term = search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.breed.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    res.status(200).json({
      success: true,
      count: result.length,
      data: result,
      filters: req.query
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/pets/:id
 * @desc    Get single pet by ID
 * @access  Public
 */
app.get('/api/pets/:id', (req, res, next) => {
  try {
    const pet = pets.find(p => p.id === req.params.id);
    if (!pet) {
      return res.status(404).json({ success: false, error: "Pet not found" });
    }
    res.status(200).json({ success: true, data: pet });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/pets
 * @desc    Create a new pet profile
 * @access  Public
 */
app.post('/api/pets', validatePet, (req, res, next) => {
  try {
    const newPet = {
      id: `pet-${uuidv4().slice(0, 8)}`,
      ...req.body,
      status: req.body.status || "Available",
      urgent: req.body.urgent || false,
      dateAdded: new Date().toISOString().split('T')[0],
      personality: req.body.personality || []
    };
    pets.push(newPet);
    res.status(201).json({
      success: true,
      message: "Pet profile created successfully",
      data: newPet
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/pets/:id
 * @desc    Update a pet profile
 * @access  Public
 */
app.put('/api/pets/:id', (req, res, next) => {
  try {
    const index = pets.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: "Pet not found" });
    }
    pets[index] = { ...pets[index], ...req.body, id: pets[index].id };
    res.status(200).json({
      success: true,
      message: "Pet profile updated successfully",
      data: pets[index]
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/pets/:id
 * @desc    Delete a pet profile
 * @access  Public
 */
app.delete('/api/pets/:id', (req, res, next) => {
  try {
    const index = pets.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, error: "Pet not found" });
    }
    const deleted = pets.splice(index, 1)[0];
    res.status(200).json({
      success: true,
      message: "Pet profile deleted successfully",
      data: deleted
    });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════════════════════
// ROUTES - ADOPTION APPLICATIONS (Week 3 MVC + Week 12 CRUD)
// ═══════════════════════════════════════════════════════════════════════

/**
 * @route   GET /api/applications
 * @desc    Get all adoption applications
 * @access  Public
 */
app.get('/api/applications', (req, res, next) => {
  try {
    let result = [...applications];
    const { status, petId } = req.query;
    if (status) result = result.filter(a => a.status.toLowerCase() === status.toLowerCase());
    if (petId) result = result.filter(a => a.petId === petId);

    // Enrich with pet data
    result = result.map(app => ({
      ...app,
      pet: pets.find(p => p.id === app.petId) || null
    }));

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/applications/:id
 * @desc    Get single application
 * @access  Public
 */
app.get('/api/applications/:id', (req, res, next) => {
  try {
    const app = applications.find(a => a.id === req.params.id);
    if (!app) return res.status(404).json({ success: false, error: "Application not found" });
    res.status(200).json({
      success: true,
      data: { ...app, pet: pets.find(p => p.id === app.petId) || null }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/applications
 * @desc    Submit new adoption application
 * @access  Public
 */
app.post('/api/applications', validateApplication, (req, res, next) => {
  try {
    const newApp = {
      id: `app-${uuidv4().slice(0, 8)}`,
      ...req.body,
      status: "Pending Review",
      submittedAt: new Date().toISOString(),
      notes: req.body.notes || ""
    };
    applications.push(newApp);
    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: newApp
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/applications/:id
 * @desc    Update application status
 * @access  Public
 */
app.put('/api/applications/:id', (req, res, next) => {
  try {
    const index = applications.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: "Application not found" });
    applications[index] = { ...applications[index], ...req.body, id: applications[index].id };
    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: applications[index]
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/applications/:id
 * @desc    Delete an application
 * @access  Public
 */
app.delete('/api/applications/:id', (req, res, next) => {
  try {
    const index = applications.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: "Application not found" });
    const deleted = applications.splice(index, 1)[0];
    res.status(200).json({ success: true, message: "Application deleted", data: deleted });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════════════════════
// ROUTES - MEET & GREET SCHEDULER (Week 12 Feature)
// ═══════════════════════════════════════════════════════════════════════

/**
 * @route   GET /api/meet-greets
 * @desc    Get all scheduled meet and greets
 * @access  Public
 */
app.get('/api/meet-greets', (req, res, next) => {
  try {
    let result = [...meetGreets];
    const { status, petId } = req.query;
    if (status) result = result.filter(mg => mg.status.toLowerCase() === status.toLowerCase());
    if (petId) result = result.filter(mg => mg.petId === petId);

    result = result.map(mg => ({
      ...mg,
      pet: pets.find(p => p.id === mg.petId) || null
    }));

    res.status(200).json({ success: true, count: result.length, data: result });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/meet-greets
 * @desc    Schedule a new meet and greet
 * @access  Public
 */
app.post('/api/meet-greets', (req, res, next) => {
  try {
    const { petId, applicantName, applicantEmail, scheduledDate, scheduledTime, location } = req.body;
    if (!petId || !applicantName || !scheduledDate || !scheduledTime) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: petId, applicantName, scheduledDate, scheduledTime"
      });
    }
    const pet = pets.find(p => p.id === petId);
    if (!pet) return res.status(404).json({ success: false, error: "Pet not found" });

    const newMG = {
      id: `mg-${uuidv4().slice(0, 8)}`,
      petId,
      applicantName,
      applicantEmail: applicantEmail || "",
      scheduledDate,
      scheduledTime,
      location: location || `${pet.location} - Main Office`,
      status: "Scheduled",
      notes: req.body.notes || ""
    };
    meetGreets.push(newMG);
    res.status(201).json({
      success: true,
      message: "Meet and greet scheduled successfully",
      data: newMG
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/meet-greets/:id
 * @desc    Update meet and greet (reschedule/cancel)
 * @access  Public
 */
app.put('/api/meet-greets/:id', (req, res, next) => {
  try {
    const index = meetGreets.findIndex(mg => mg.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: "Meet and greet not found" });
    meetGreets[index] = { ...meetGreets[index], ...req.body, id: meetGreets[index].id };
    res.status(200).json({
      success: true,
      message: "Meet and greet updated",
      data: meetGreets[index]
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/meet-greets/:id
 * @desc    Cancel a meet and greet
 * @access  Public
 */
app.delete('/api/meet-greets/:id', (req, res, next) => {
  try {
    const index = meetGreets.findIndex(mg => mg.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: "Meet and greet not found" });
    const deleted = meetGreets.splice(index, 1)[0];
    res.status(200).json({ success: true, message: "Meet and greet cancelled", data: deleted });
  } catch (error) {
    next(error);
  }
});

// ═══════════════════════════════════════════════════════════════════════
// ROUTES - SHELTERS
// ═══════════════════════════════════════════════════════════════════════

app.get('/api/shelters', (req, res) => {
  res.status(200).json({ success: true, count: shelters.length, data: shelters });
});

app.get('/api/shelters/:id', (req, res) => {
  const shelter = shelters.find(s => s.id === req.params.id);
  if (!shelter) return res.status(404).json({ success: false, error: "Shelter not found" });
  const shelterPets = pets.filter(p => p.shelterId === req.params.id);
  res.status(200).json({ success: true, data: { ...shelter, pets: shelterPets } });
});

// ═══════════════════════════════════════════════════════════════════════
// ROUTES - STATS & DASHBOARD
// ═══════════════════════════════════════════════════════════════════════

app.get('/api/stats', (req, res) => {
  const stats = {
    totalPets: pets.length,
    availablePets: pets.filter(p => p.status === "Available").length,
    pendingPets: pets.filter(p => p.status === "Pending").length,
    adoptedPets: pets.filter(p => p.status === "Adopted").length,
    urgentPets: pets.filter(p => p.urgent).length,
    totalApplications: applications.length,
    pendingApplications: applications.filter(a => a.status === "Pending Review").length,
    totalMeetGreets: meetGreets.length,
    upcomingMeetGreets: meetGreets.filter(mg => mg.status === "Scheduled").length,
    speciesBreakdown: {},
    shelterBreakdown: {}
  };

  pets.forEach(p => {
    stats.speciesBreakdown[p.species] = (stats.speciesBreakdown[p.species] || 0) + 1;
  });

  shelters.forEach(s => {
    stats.shelterBreakdown[s.name] = pets.filter(p => p.shelterId === s.id).length;
  });

  res.status(200).json({ success: true, data: stats });
});

// ═══════════════════════════════════════════════════════════════════════
// ROOT & HEALTH CHECK
// ═══════════════════════════════════════════════════════════════════════

app.get('/', (req, res) => {
  res.json({
    message: "🐾 Welcome to Fur Fetch API",
    version: "1.0.0",
    status: "Operational",
    endpoints: {
      pets: "/api/pets",
      applications: "/api/applications",
      meetGreets: "/api/meet-greets",
      shelters: "/api/shelters",
      stats: "/api/stats"
    },
    documentation: "/api/docs"
  });
});

app.get('/api/docs', (req, res) => {
  res.json({
    title: "Fur Fetch API Documentation",
    baseUrl: `http://localhost:${PORT}`,
    endpoints: [
      { method: "GET", path: "/api/pets", description: "List all pets (with query filters)" },
      { method: "GET", path: "/api/pets/:id", description: "Get pet by ID" },
      { method: "POST", path: "/api/pets", description: "Create new pet profile" },
      { method: "PUT", path: "/api/pets/:id", description: "Update pet profile" },
      { method: "DELETE", path: "/api/pets/:id", description: "Delete pet profile" },
      { method: "GET", path: "/api/applications", description: "List all applications" },
      { method: "POST", path: "/api/applications", description: "Submit adoption application" },
      { method: "PUT", path: "/api/applications/:id", description: "Update application status" },
      { method: "DELETE", path: "/api/applications/:id", description: "Delete application" },
      { method: "GET", path: "/api/meet-greets", description: "List scheduled meet & greets" },
      { method: "POST", path: "/api/meet-greets", description: "Schedule meet & greet" },
      { method: "PUT", path: "/api/meet-greets/:id", description: "Update meet & greet" },
      { method: "DELETE", path: "/api/meet-greets/:id", description: "Cancel meet & greet" },
      { method: "GET", path: "/api/stats", description: "Platform statistics" }
    ]
  });
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Error Handler
app.use(errorHandler);

// 404 Handler
// app.use((req, res) => {
//   res.status(404).json({ success: false, error: "Route not found" });
// });

// ═══════════════════════════════════════════════════════════════════════
// SERVER START
// ═══════════════════════════════════════════════════════════════════════

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║     🐾  FUR FETCH API SERVER RUNNING                          ║
║                                                               ║
║     Port: ${PORT}                                            ║
║     Environment: ${process.env.NODE_ENV || 'development'}                     ║
║                                                               ║
║     Endpoints:                                                ║
║     • GET  /api/pets         - Pet Profiles                   ║
║     • GET  /api/applications - Adoption Applications          ║
║     • GET  /api/meet-greets  - Meet & Greet Scheduler         ║
║     • GET  /api/shelters     - Shelter Directory              ║
║     • GET  /api/stats        - Dashboard Statistics           ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
