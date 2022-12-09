const express = require("express");
const router = express.Router();
const {
  getWorkout,
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

// Get all workouts
router.get("/", getWorkouts);

// Get a particular workout
router.get("/:id", getWorkout);

// Update a workout
router.patch("/:id", updateWorkout);

// Delete a workout
router.delete("/:id", deleteWorkout);

// Create a workout
router.post("/", createWorkout);

module.exports = router;
