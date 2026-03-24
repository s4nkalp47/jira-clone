import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import { createWorkspace, getWorkSpace, addMember } from "../controllers/workspaceController.js";

const router = express.Router();

router.post("/", protect, createWorkspace);
router.get("/",protect,getWorkSpace);
router.post("/:id/invite",protect,addMember);

export default router;