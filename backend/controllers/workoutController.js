const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    if (workouts.length == 0) {
      res.status(404).send("There are no workouts");
    }
    if (!workouts) {
      res.status(404).send("No workouts");
    }
    res.status(200).json(workouts);
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
};

// get a single workout

exports.getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send("Invalid id");
    }

    const workout = await Workout.findById(id);
    if (!workout) {
      res.status(404).send("Workout not found");
    }
    res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
};

// create a workout
exports.createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyField = [];

  if (!title) emptyField.push("title");

  if (!load) emptyField.push("load");

  if (!reps) emptyField.push("reps");

  if (emptyField.length > 0) {
    res.status(400).json({ error: "Please fill all the fields", emptyField });
  }

  try {
    const newWorkout = await Workout.create({ title, load, reps });
    // if (!newWorkout) {
    //   res.status(400).send("Could not create a new workout");
    // }
    res.status(200).json(newWorkout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a workout
exports.updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send("Invalid id");
    }
    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!updatedWorkout) {
      res.status(404).res("Could not update the workout");
    }
    res.status(200).json(updatedWorkout);
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
};

// delete a workout
exports.deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send("Invalid id");
    }
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) {
      res.status(404).res("Could not delete the workout");
    }
    res.status(200).json(deletedWorkout);
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
};
