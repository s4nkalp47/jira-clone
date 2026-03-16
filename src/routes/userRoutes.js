import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getCurrentUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register",registerUser);
router.get("/me",protect,getCurrentUser);

export default router;