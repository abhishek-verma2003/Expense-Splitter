import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import authenticateRoute from "./routes/authenticateRoute.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors({
  origin: ["*","https://expense-splitter-k3rd.vercel.app/"] , // your frontend URL
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authenticateRoute);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/groups/:groupId/expenses", expenseRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
