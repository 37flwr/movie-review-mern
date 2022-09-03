const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/review_app")
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log("Database connection failed: " + err);
  });
