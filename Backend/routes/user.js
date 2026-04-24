import express from "express";
import User from "../models/User.js";

const router = express.Router();

// UPDATE USER NAME
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name required" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }, // return updated doc
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
