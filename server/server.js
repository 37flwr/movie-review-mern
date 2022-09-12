require("dotenv").config();
require("express-async-errors");
const express = require("express");
const { errorHandler } = require("./middlewares/error");
require("./db");
const userRouter = require("./routes/user");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
