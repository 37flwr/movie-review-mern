const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log("Database connection failed: " + err);
  });
