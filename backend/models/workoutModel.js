const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("workout", workoutSchema);
