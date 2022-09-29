import express from "express";
import mongoose from "mongoose";

import BudgetTracker from "../models/pageMessage.js";

const router = express.Router();

export const getTransactions = async (req, res) => {
  try {
    const transactions = await BudgetTracker.find().sort({ _id: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};
export const getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await BudgetTracker.findById(id);

    res.status(200).json(transaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const createTransaction = async (req, res) => {
  const transaction = req.body;

  const newTransaction = new BudgetTracker(transaction);

  try {
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No transaction with id: ${id}`);

  await BudgetTracker.findByIdAndRemove(id);

  res.json({ message: "transaction deleted successfully." });
};

export const updateTransaction = async (req, res) => {
  const { id: _id } = req.params;
  const transaction = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No transaction with id: ${id}`);

  const updatedTransaction = await BudgetTracker.findByIdAndUpdate(
    _id,
    transaction,
    {
      new: true,
    }
  );

  res.json(updatedTransaction);
};

export default router;
