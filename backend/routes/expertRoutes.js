const express = require("express");

const Expert = require("../models/Expert");

const router = express.Router();

router.get("/", async (req, res) => {
  const experts = await Expert.find();
  res.json(experts);
});

router.post("/", async (req, res) => {
  const expert = await Expert.create(req.body);
  res.json(expert);
});

router.delete("/:id", async (req, res) => {
  await Expert.findByIdAndDelete(req.params.id);

  res.json({
    message: "Expert Deleted"
  });
});

module.exports = router;