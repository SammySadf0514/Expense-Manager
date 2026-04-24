import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// Get user transactions
router.get("/:userId", async (req, res) => {
  const data = await Transaction.find({ userId: req.params.userId });
  res.json(data);
});

// Add transaction
router.post("/", async (req, res) => {
  const transaction = await Transaction.create(req.body);
  res.json(transaction);
});

router.delete("/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
