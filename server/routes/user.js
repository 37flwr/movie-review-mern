const express = require("express");
const { userValidator, validate } = require("../middlewares/validator");
const { create } = require("../controllers/user");

const router = express.Router();

router.post("/create", userValidator, validate, create);

module.exports = router;
