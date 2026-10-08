const express = require("express");

const router = express.Router();

const {
  getInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship
} = require("../controllers/internshipController");

// GET all internships
router.get("/", getInternships);

// GET one internship
router.get("/:id", getInternshipById);

// POST create internship
router.post("/", createInternship);

// PUT update internship
router.put("/:id", updateInternship);

// DELETE internship
router.delete("/:id", deleteInternship);

module.exports = router;