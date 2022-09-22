const { isValidObjectId } = require("mongoose");
const {
  sendError,
  uploadImageToCloud,
  formatActor,
} = require("../utils/helper");
const Actor = require("../models/actor");
const cloudinary = require("../cloud");

exports.createActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;

  const newActor = new Actor({ name, about, gender });

  if (file) {
    newActor.avatar = await uploadImageToCloud(file.path);
  }

  await newActor.save();
  res.status(201).json({ actor: formatActor(newActor) });
};

exports.updateActor = async (req, res) => {
  const { name, about, gender } = req.body;
  const { file } = req;
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid request");
  const actor = await Actor.findById(id);

  if (!actor) return sendError(res, "Invalid request, record not found");

  const old_public_id = actor.avatar?.public_id;

  if (old_public_id && file) {
    const { result } = await cloudinary.uploader.destroy(old_public_id);

    if (result !== "ok") {
      return sendError(
        res,
        "Something went wrong. Could not remove image from cloud"
      );
    }

    actor.avatar = await uploadImageToCloud(file.path);
  }

  actor.name = name;
  actor.about = about;
  actor.gender = gender;

  await actor.save();
  res.status(201).json(formatActor(actor));
};

exports.removeActor = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) return sendError(res, "Invalid request");
  const actor = await Actor.findById(id);

  if (!actor) return sendError(res, "Invalid request, record not found");

  const public_id = actor.avatar?.public_id;

  if (public_id) {
    const { result } = await cloudinary.uploader.destroy(public_id);

    if (result !== "ok") {
      return sendError(
        res,
        "Something went wrong. Could not remove image from cloud"
      );
    }
  }

  await Actor.findByIdAndDelete(id);
  res.json({ message: "Record removed successfully" });
};

exports.findActor = async (req, res) => {
  const { query } = req;

  const result = await Actor.find({ $text: { $search: `"${query.name}"` } });
  const actors = result.map((actor) => formatActor(actor));

  res.json(actors);
};

exports.getLatestActors = async (req, res) => {
  const result = await Actor.find().sort({ createdAt: -1 }).limit(12);
  const actors = result.map((actor) => formatActor(actor));

  res.json(actors);
};

exports.getSingleActor = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return sendError(res, "Invalid request");

  const actor = await Actor.findById(id);
  if (!actor) return sendError(res, "Actor not found", 404);

  res.json(formatActor(actor));
};
