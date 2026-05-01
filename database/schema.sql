-- ╔═══════════════════════════════════════════════════════════════════════╗
-- ║              FUR FETCH DATABASE SCHEMA                                ║
-- ║         CPL-5559-FSDS | WIL Project | Lambton College               ║
-- ╚═══════════════════════════════════════════════════════════════════════╝

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS meet_greets;
DROP TABLE IF EXISTS adoption_applications;
DROP TABLE IF EXISTS pet_personality_tags;
DROP TABLE IF EXISTS pets;
DROP TABLE IF EXISTS shelters;
DROP TABLE IF EXISTS users;

-- ═══════════════════════════════════════════════════════════════════════
-- TABLE: users
-- Stores registered users (potential adopters and shelter staff)
-- ═══════════════════════════════════════════════════════════════════════
CREATE TABLE users (
    user_id         VARCHAR(36) PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    full_name       VARCHAR(100) NOT NULL,
    phone           VARCHAR(20),
    address         TEXT,
    user_type       VARCHAR(20) DEFAULT 'adopter' CHECK (user_type IN ('adopter', 'staff', 'admin')),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════════════════════
-- TABLE: shelters
-- Stores shelter/rescue organization information
-- ═══════════════════════════════════════════════════════════════════════
CREATE TABLE shelters (
    shelter_id      VARCHAR(36) PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    address         TEXT NOT NULL,
    city            VARCHAR(100),
    phone           VARCHAR(20),
    email           VARCHAR(255),
    capacity        INT CHECK (capacity > 0),
    current_count   INT DEFAULT 0 CHECK (current_count >= 0),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════════════════════
-- TABLE: pets
-- Stores pet profiles available for adoption
-- ═══════════════════════════════════════════════════════════════════════
CREATE TABLE pets (
    pet_id          VARCHAR(36) PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    species         VARCHAR(50) NOT NULL,
    breed           VARCHAR(100) NOT NULL,
    age_years       DECIMAL(3,1) CHECK (age_years >= 0),
    size            VARCHAR(20) CHECK (size IN ('Small', 'Medium', 'Large')),
    gender          VARCHAR(10) CHECK (gender IN ('Male', 'Female')),
    color           VARCHAR(50),
    description     TEXT,
    medical_notes   TEXT,
    image_url       VARCHAR(500),
    status          VARCHAR(20) DEFAULT 'Available' CHECK (status IN ('Available', 'Pending', 'Adopted')),
    is_urgent       BOOLEAN DEFAULT FALSE,
    shelter_id      VARCHAR(36) NOT NULL,
    date_added      DATE DEFAULT CURRENT_DATE,

    CONSTRAINT fk_pet_shelter 
        FOREIGN KEY (shelter_id) REFERENCES shelters(shelter_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- ═══════════════════════════════════════════════════════════════════════
-- TABLE: pet_personality_tags
-- Many-to-Many junction table for pet personality traits
-- ═══════════════════════════════════════════════════════════════════════
CREATE TABLE pet_personality_tags (
    pet_id          VARCHAR(36) NOT NULL,
    tag_name        VARCHAR(50) NOT NULL,

    PRIMARY KEY (pet_id, tag_name),
    CONSTRAINT fk_tag_pet 
        FOREIGN KEY (pet_id) REFERENCES pets(pet_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ═══════════════════════════════════════════════════════════════════════
-- TABLE: adoption_applications
-- Stores adoption applications submitted by users
-- ═══════════════════════════════════════════════════════════════════════
CREATE TABLE adoption_applications (
    application_id  VARCHAR(36) PRIMARY KEY,
    pet_id          VARCHAR(36) NOT NULL,
    applicant_name  VARCHAR(100) NOT NULL,
    applicant_email VARCHAR(255) NOT NULL,
    applicant_phone VARCHAR(20) NOT NULL,
    address         TEXT,
    experience      VARCHAR(100),
    household_type  VARCHAR(50),
    has_other_pets  BOOLEAN DEFAULT FALSE,
    work_schedule   VARCHAR(50),
    reason          TEXT,
    status          VARCHAR(30) DEFAULT 'Pending Review' 
                        CHECK (status IN ('Pending Review', 'Under Review', 'Approved', 'Rejected', 'Withdrawn')),
    submitted_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes           TEXT,

    CONSTRAINT fk_app_pet 
        FOREIGN KEY (pet_id) REFERENCES pets(pet_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- ═══════════════════════════════════════════════════════════════════════
-- TABLE: meet_greets
-- Stores scheduled meet-and-greet appointments
-- ═══════════════════════════════════════════════════════════════════════
CREATE TABLE meet_greets (
    meet_greet_id   VARCHAR(36) PRIMARY KEY,
    pet_id          VARCHAR(36) NOT NULL,
    applicant_name  VARCHAR(100) NOT NULL,
    applicant_email VARCHAR(255),
    scheduled_date  DATE NOT NULL,
    scheduled_time  TIME NOT NULL,
    location        VARCHAR(255) NOT NULL,
    status          VARCHAR(20) DEFAULT 'Scheduled' 
                        CHECK (status IN ('Scheduled', 'Completed', 'Cancelled', 'No-Show')),
    notes           TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_mg_pet 
        FOREIGN KEY (pet_id) REFERENCES pets(pet_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- ═══════════════════════════════════════════════════════════════════════
-- INDEXES for performance optimization
-- ═══════════════════════════════════════════════════════════════════════
CREATE INDEX idx_pets_species ON pets(species);
CREATE INDEX idx_pets_status ON pets(status);
CREATE INDEX idx_pets_urgent ON pets(is_urgent);
CREATE INDEX idx_pets_shelter ON pets(shelter_id);
CREATE INDEX idx_applications_pet ON adoption_applications(pet_id);
CREATE INDEX idx_applications_status ON adoption_applications(status);
CREATE INDEX idx_meetgreets_pet ON meet_greets(pet_id);
CREATE INDEX idx_meetgreets_date ON meet_greets(scheduled_date);

-- ═══════════════════════════════════════════════════════════════════════
-- VIEWS for common queries
-- ═══════════════════════════════════════════════════════════════════════

-- View: Available pets with shelter info
CREATE VIEW available_pets AS
SELECT 
    p.pet_id, p.name, p.species, p.breed, p.age_years, p.size, 
    p.gender, p.color, p.description, p.status, p.is_urgent,
    s.name AS shelter_name, s.city
FROM pets p
JOIN shelters s ON p.shelter_id = s.shelter_id
WHERE p.status = 'Available';

-- View: Pending applications with pet details
CREATE VIEW pending_applications AS
SELECT 
    a.application_id, a.applicant_name, a.applicant_email,
    a.status AS app_status, a.submitted_at,
    p.name AS pet_name, p.species, p.breed
FROM adoption_applications a
JOIN pets p ON a.pet_id = p.pet_id
WHERE a.status = 'Pending Review';

-- ═══════════════════════════════════════════════════════════════════════
-- SAMPLE DATA INSERTION
-- ═══════════════════════════════════════════════════════════════════════

-- Insert Shelters
INSERT INTO shelters (shelter_id, name, address, city, phone, email, capacity, current_count) VALUES
('shelter-001', 'Berlint Shelter', '45 Oak Street', 'Berlint', '+1-555-0100', 'contact@berlintshelter.org', 50, 23),
('shelter-002', 'Ostania Rescue Center', '78 Maple Drive', 'Ostania', '+1-555-0200', 'info@ostaniarescue.org', 40, 18),
('shelter-003', 'Westalis Animal Haven', '22 Pine Road', 'Westalis', '+1-555-0300', 'help@westalishaven.org', 35, 15);

-- Insert Pets (Week 6 CRUD - CREATE)
INSERT INTO pets (pet_id, name, species, breed, age_years, size, gender, color, description, medical_notes, image_url, status, is_urgent, shelter_id) VALUES
('pet-001', 'Bond', 'Dog', 'Great Pyrenees', 3.0, 'Large', 'Male', 'White', 
 'A gentle giant who loves peanut butter and long walks. Very protective and loyal.',
 'Vaccinated, neutered, healthy', 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
 'Available', TRUE, 'shelter-001'),
('pet-002', 'Anya', 'Cat', 'Scottish Fold', 1.0, 'Small', 'Female', 'Gray',
 'Playful and curious kitten who loves to explore. Gets along well with other cats.',
 'Vaccinated, spayed, microchipped', 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400',
 'Available', FALSE, 'shelter-002'),
('pet-003', 'Damian', 'Dog', 'Shiba Inu', 2.0, 'Medium', 'Male', 'Tan & White',
 'Confident and independent. Needs an experienced owner who understands the breed.',
 'Vaccinated, neutered', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
 'Available', FALSE, 'shelter-001'),
('pet-004', 'Becky', 'Rabbit', 'Holland Lop', 1.0, 'Small', 'Female', 'White & Brown',
 'Sweet bunny who loves being held and petted. Loves carrots and leafy greens.',
 'Healthy, spayed', 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400',
 'Available', TRUE, 'shelter-002'),
('pet-005', 'Yor', 'Cat', 'Maine Coon', 4.0, 'Large', 'Female', 'Black',
 'Majestic and elegant. Very affectionate once she trusts you. Indoor cat preferred.',
 'Vaccinated, spayed', 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400',
 'Available', FALSE, 'shelter-003'),
('pet-006', 'Loid', 'Dog', 'Border Collie', 5.0, 'Medium', 'Male', 'Black & White',
 'Highly intelligent and trainable. Needs mental stimulation and regular exercise.',
 'Vaccinated, neutered, hip dysplasia monitored', 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=400',
 'Pending', FALSE, 'shelter-001');

-- Insert Personality Tags
INSERT INTO pet_personality_tags (pet_id, tag_name) VALUES
('pet-001', 'Gentle'), ('pet-001', 'Protective'), ('pet-001', 'Loyal'), ('pet-001', 'Calm'),
('pet-002', 'Playful'), ('pet-002', 'Curious'), ('pet-002', 'Friendly'), ('pet-002', 'Energetic'),
('pet-003', 'Confident'), ('pet-003', 'Independent'), ('pet-003', 'Intelligent'), ('pet-003', 'Alert'),
('pet-004', 'Sweet'), ('pet-004', 'Gentle'), ('pet-004', 'Social'), ('pet-004', 'Calm'),
('pet-005', 'Elegant'), ('pet-005', 'Affectionate'), ('pet-005', 'Independent'), ('pet-005', 'Loyal'),
('pet-006', 'Intelligent'), ('pet-006', 'Energetic'), ('pet-006', 'Loyal'), ('pet-006', 'Trainable');

-- Insert Sample Application
INSERT INTO adoption_applications (application_id, pet_id, applicant_name, applicant_email, applicant_phone, address, experience, household_type, has_other_pets, work_schedule, reason, status, notes) VALUES
('app-001', 'pet-006', 'Twilight', 'twilight@wis.org', '+1-555-0199', '128 Park Avenue, Berlint',
 'Experienced - had dogs for 10+ years', 'House with yard', FALSE, 'Full-time remote',
 'Looking for an intelligent companion for my daughter', 'Pending Review', 'Strong application, good references');

-- Insert Sample Meet & Greet
INSERT INTO meet_greets (meet_greet_id, pet_id, applicant_name, applicant_email, scheduled_date, scheduled_time, location, status, notes) VALUES
('mg-001', 'pet-006', 'Twilight', 'twilight@wis.org', '2026-05-02', '14:00:00', 'Berlint Shelter - Meeting Room A', 'Scheduled', 'Bring family members');


-- ═══════════════════════════════════════════════════════════════════════
-- WEEK 6 CRUD QUERIES (Create, Read, Update)
-- ═══════════════════════════════════════════════════════════════════════

-- CREATE: Add a new pet profile
INSERT INTO pets (pet_id, name, species, breed, age_years, size, gender, color, description, medical_notes, shelter_id)
VALUES ('pet-007', 'Franky', 'Dog', 'Golden Retriever', 2.5, 'Large', 'Male', 'Golden',
        'Friendly and outgoing. Great with kids and other dogs. Loves swimming.',
        'Vaccinated, neutered, microchipped', 'shelter-003');

-- READ: Retrieve pet profiles matching specific criteria (Week 6)
SELECT pet_id, name, species, breed, age_years, size, status, is_urgent, shelter_id
FROM pets
WHERE species = 'Dog' 
  AND status = 'Available' 
  AND age_years <= 3
ORDER BY age_years ASC;

-- READ with JOIN: Get pets with their shelter info
SELECT p.name AS pet_name, p.breed, p.age_years, p.status,
       s.name AS shelter_name, s.city
FROM pets p
JOIN shelters s ON p.shelter_id = s.shelter_id
WHERE p.is_urgent = TRUE;

-- UPDATE: Update the status of a pet (Week 6)
UPDATE pets 
SET status = 'Adopted', 
    updated_at = CURRENT_TIMESTAMP
WHERE pet_id = 'pet-006';

-- UPDATE with validation: Only update if pet is available
UPDATE pets 
SET status = 'Pending'
WHERE pet_id = 'pet-001' AND status = 'Available';

-- PARAMETERIZED QUERY EXAMPLE (Prevents SQL Injection)
-- In application code, use parameterized queries like:
-- const query = 'SELECT * FROM pets WHERE species = ? AND status = ?';
-- db.query(query, [species, status]);


-- ═══════════════════════════════════════════════════════════════════════
-- ADDITIONAL USEFUL QUERIES
-- ═══════════════════════════════════════════════════════════════════════

-- Count pets by species
SELECT species, COUNT(*) as count, 
       SUM(CASE WHEN status = 'Available' THEN 1 ELSE 0 END) as available
FROM pets
GROUP BY species;

-- Get shelter capacity utilization
SELECT name, capacity, current_count,
       ROUND((current_count * 100.0 / capacity), 1) as utilization_pct
FROM shelters;

-- Find pets waiting longest for adoption
SELECT name, species, breed, date_added,
       CURRENT_DATE - date_added as days_waiting
FROM pets
WHERE status = 'Available'
ORDER BY date_added ASC
LIMIT 5;
