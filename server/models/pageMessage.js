import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  type: String,
  category: String,
  amount: Number,
  name: String,
  creator: String,
  date: {
    type: Date,
    default: new Date(),
  },
});

const BudgetTracker = mongoose.model("BudgetTracker", postSchema);

export default BudgetTracker;
