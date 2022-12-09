require("dotenv").config();
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutRoutes");

const express = require("express");

// express app
const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/workouts", workoutRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to DB and listening to server on PORT ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
