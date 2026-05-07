import express from "express";
import Transaction from "../models/Transaction.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get user transactions
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.userId,
    });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

// Add transaction
router.post("/", auth, async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      userId: req.userId,
    });

    res.json(transaction);
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

// Delete transaction
router.delete("/:id", auth, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
    });
  }
});

export default router;
