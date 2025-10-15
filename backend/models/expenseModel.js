import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  description: String,
  amount: Number,
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  splitAmong: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Expense", expenseSchema);
