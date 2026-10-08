const Internship = require("../models/internship");

// Get all internships
const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find();

    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch internships",
      error: error.message
    });
  }
};

// Get one internship
const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found"
      });
    }

    res.status(200).json(internship);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch internship",
      error: error.message
    });
  }
};

// Create internship
const createInternship = async (req, res) => {
  try {
    const internship = await Internship.create(req.body);

    res.status(201).json(internship);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create internship",
      error: error.message
    });
  }
};

// Update internship
const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found"
      });
    }

    res.status(200).json(internship);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update internship",
      error: error.message
    });
  }
};

// Delete internship
const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found"
      });
    }

    res.status(200).json({
      message: "Internship deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete internship",
      error: error.message
    });
  }
};

module.exports = {
  getInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship
};