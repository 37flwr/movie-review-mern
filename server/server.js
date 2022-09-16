require("dotenv").config();
require("express-async-errors");
const express = require("express");
const { errorHandler } = require("./middlewares/error");
const cors = require("cors");
require("./db");
const userRouter = require("./routes/user");
const { handleNotFound } = require("./utils/helper");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use(errorHandler);

app.use("/*", handleNotFound);

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
