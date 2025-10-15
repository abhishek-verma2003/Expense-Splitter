import express from "express";
import { createUser, getUsers } from "../controllers/userController.js";
const router = express.Router();
// import { isAuthenticated } from "../middlewares/authMiddleware.js";

router.post("/",  createUser);
router.get("/", getUsers);

export default router;
