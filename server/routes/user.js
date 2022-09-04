const express = require("express");
const { userValidator, validate } = require("../middlewares/validator");
const { create, verifyEmail } = require("../controllers/user");

const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/verify-email", verifyEmail);

module.exports = router;
