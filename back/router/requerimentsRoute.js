const express = require("express");
const Requeriment = require("../models/Requeriments");

const routerRequeriment = express.Router();

routerRequeriment.get("/", async (req, res) => {
  const requeriments = await Requeriment.find().sort({ order: 1 });

  res.json(requeriments);
});

routerRequeriment.put("/:id", async (req, res) => {
  try {
    const { order } = req.body;
    const { id } = req.params;
    const requeriment = await Requeriment.findByIdAndUpdate(
      id,
      { order: order },
      { new: true }
    );

    if (!requeriment) {
      return res.status(404).json({ message: "Requeriment not found" });
    }

    res.status(200).json(requeriment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = routerRequeriment;
