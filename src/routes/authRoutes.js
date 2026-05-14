import express from "express";
import { register, login } from "../controllers/authController.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {z} from "zod";

const router = express.Router();

const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password : z.string().min(5)
})

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
})

router.post("/register",validate(registerSchema),register);
router.post("/login",validate(loginSchema),login);

export default router;