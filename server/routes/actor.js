const express = require("express");
const {
  createActor,
  updateActor,
  removeActor,
  findActor,
  getLatestActors,
  getSingleActor,
} = require("../controllers/actor");
const { isAdmin, isAuth } = require("../middlewares/auth");
const { uploadImage } = require("../middlewares/multer");
const { validate, actorInfoValidator } = require("../middlewares/validator");
const router = express.Router();

router.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  createActor
);
router.post(
  "/update/:id",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  updateActor
);

router.delete("/:id", isAuth, isAdmin, removeActor);
router.get("/search", findActor);
router.get("/latest-uploads", getLatestActors);
router.get("/single/:id", getSingleActor);

module.exports = router;
