-- ============================================
-- CBC SENIOR SCHOOL STUDENT PERFORMANCE DATABASE
-- Kenya Competency-Based Curriculum (Grades 10–12)
-- ============================================

-- DROP TABLES if they exist (for re-creation)
DROP TABLE IF EXISTS assessments;
DROP TABLE IF EXISTS competencies;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS pathways;

-- ============================================
-- 1️⃣ PATHWAYS TABLE
-- ============================================
CREATE TABLE pathways (
  pathway_id INT AUTO_INCREMENT PRIMARY KEY,
  pathway_name VARCHAR(100) NOT NULL,
  description TEXT
);

-- Insert CBC Pathways
INSERT INTO pathways (pathway_name, description) VALUES
('STEM', 'Science, Technology, Engineering, and Mathematics Pathway'),
('Social Sciences', 'Humanities, Business, and Languages Pathway'),
('Arts & Sports', 'Creative Arts and Sports Pathway');

-- ============================================
-- 2️⃣ STUDENTS TABLE
-- ============================================
CREATE TABLE students (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  admission_no VARCHAR(50) UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  gender ENUM('Male','Female','Other'),
  date_of_birth DATE,
  grade_level INT,
  class VARCHAR(10),
  pathway_id INT,
  parent_contact VARCHAR(50),
  FOREIGN KEY (pathway_id) REFERENCES pathways(pathway_id)
);

-- ============================================
-- 3️⃣ SUBJECTS TABLE
-- ============================================
CREATE TABLE subjects (
  subject_id INT AUTO_INCREMENT PRIMARY KEY,
  subject_name VARCHAR(100) NOT NULL,
  pathway_id INT,
  learning_area VARCHAR(100),
  FOREIGN KEY (pathway_id) REFERENCES pathways(pathway_id)
);

-- Insert CBC Subjects by Pathway

-- STEM Pathway
INSERT INTO subjects (subject_name, pathway_id, learning_area) VALUES
('Mathematics', 1, 'Sciences'),
('Physics', 1, 'Sciences'),
('Chemistry', 1, 'Sciences'),
('Biology', 1, 'Sciences'),
('Computer Science', 1, 'Technology'),
('Engineering Science', 1, 'Technology'),
('Aviation Technology', 1, 'Applied Science'),
('Agricultural Science', 1, 'Applied Science');

-- Social Sciences Pathway
INSERT INTO subjects (subject_name, pathway_id, learning_area) VALUES
('History and Government', 2, 'Humanities'),
('Geography', 2, 'Humanities'),
('Business Studies', 2, 'Business'),
('Religious Education', 2, 'Humanities'),
('Kiswahili', 2, 'Languages'),
('English', 2, 'Languages'),
('Life Skills Education', 2, 'Social Studies');

-- Arts & Sports Pathway
INSERT INTO subjects (subject_name, pathway_id, learning_area) VALUES
('Visual Arts', 3, 'Creative Arts'),
('Performing Arts', 3, 'Creative Arts'),
('Sports Science', 3, 'Physical Education'),
('Dance', 3, 'Performing Arts'),
('Theatre Arts', 3, 'Performing Arts'),
('Fine Art', 3, 'Visual Arts');

-- ============================================
-- 4️⃣ COMPETENCIES TABLE
-- ============================================
CREATE TABLE competencies (
  competency_id INT AUTO_INCREMENT PRIMARY KEY,
  competency_name VARCHAR(100),
  category VARCHAR(50),
  description TEXT
);

-- Insert CBC Core Competencies
INSERT INTO competencies (competency_name, category, description) VALUES
('Communication and Collaboration', 'Core', 'Learners express ideas clearly and work well with others.'),
('Critical Thinking and Problem Solving', 'Core', 'Learners analyze situations and devise practical solutions.'),
('Creativity and Imagination', 'Core', 'Learners demonstrate innovation and original thinking.'),
('Citizenship', 'Core', 'Learners show respect, responsibility, and patriotism.'),
('Digital Literacy', 'Core', 'Learners use digital tools effectively and ethically.'),
('Learning to Learn', 'Core', 'Learners take initiative in their own learning.'),
('Self-Efficacy', 'Core', 'Learners believe in their abilities and persevere through challenges.');

-- ============================================
-- 5️⃣ ASSESSMENTS TABLE
-- ============================================
CREATE TABLE assessments (
  assessment_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  subject_id INT,
  competency_id INT,
  term ENUM('Term 1','Term 2','Term 3'),
  year YEAR,
  assessment_type ENUM('CAT','Practical','Project','Exam'),
  score DECIMAL(5,2),
  max_score DECIMAL(5,2),
  descriptor ENUM('Exceeding Expectation','Meeting Expectation','Approaching Expectation','Below Expectation'),
  remarks VARCHAR(255),
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
  FOREIGN KEY (competency_id) REFERENCES competencies(competency_id)
);

-- ============================================
-- ✅ SAMPLE QUERIES
-- ============================================

-- List all subjects under STEM Pathway
-- SELECT subject_name, learning_area FROM subjects WHERE pathway_id = 1;

-- View all competencies
-- SELECT * FROM competencies;

-- Example: Insert a sample student
-- INSERT INTO students (admission_no, first_name, last_name, gender, date_of_birth, grade_level, class, pathway_id, parent_contact)
-- VALUES ('ADM001', 'Jane', 'Mwangi', 'Female', '2009-03-12', 10, '10A', 1, '0722123456');

-- Record a sample assessment
-- INSERT INTO assessments (student_id, subject_id, competency_id, term, year, assessment_type, score, max_score, descriptor, remarks)
-- VALUES (1, 1, 2, 'Term 1', 2025, 'CAT', 78.00, 100.00, 'Meeting Expectation', 'Good understanding of key concepts.');

-- View full performance report for a student
-- SELECT s.first_name, s.last_name, sub.subject_name, a.term, a.year, a.score, a.max_score, a.descriptor
-- FROM assessments a
-- JOIN students s ON a.student_id = s.student_id
-- JOIN subjects sub ON a.subject_id = sub.subject_id
-- WHERE s.student_id = 1;
