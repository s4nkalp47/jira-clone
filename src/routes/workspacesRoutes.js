import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {z} from "zod";

import { createWorkspace, getWorkSpace, addMember } from "../controllers/workspaceController.js";

const router = express.Router();

const workspaceSchema = z.object({
    name: z.string().min(1)
})

const userSchema = z.object({
    email: z.string().email(),
    role : z.string()
})

router.post("/", protect,validate(workspaceSchema),createWorkspace);
router.get("/",protect,getWorkSpace);
router.post("/:id/invite",protect,validate(userSchema),addMember);

export default router;