import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
  balances: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      amount: { type: Number, default: 0 },
    },
  ],
});

export default mongoose.model("Group", groupSchema);
