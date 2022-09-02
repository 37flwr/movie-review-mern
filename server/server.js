const express = require("express");
const userRouter = require("./routes/user");
const PORT = 8080;

const app = express();
app.use(userRouter);

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
