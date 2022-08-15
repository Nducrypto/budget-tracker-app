import express from "express";

import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../controllers/page.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/", getTransactions);
router.post("/", auth, createTransaction);
router.delete("/:id", auth, deleteTransaction);
router.patch("/:id", auth, updateTransaction);

export default router;
