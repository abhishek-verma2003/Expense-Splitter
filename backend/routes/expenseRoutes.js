import express from "express";
import {
  addExpense,
  getExpenses,
  getSummary,
} from "../controllers/expenseController.js";
const router = express.Router({ mergeParams: true });

router.post("/", addExpense);
router.get("/", getExpenses);
router.get("/summary", getSummary);

export default router;
