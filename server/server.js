require("dotenv").config();
const express = require("express");
require("./db");
const userRouter = require("./routes/user");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
