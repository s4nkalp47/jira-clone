import express from "express";
import {protect} from "../middlewares/authMiddleware.js";
import { createProject,getProjectsByWorkspace } from "../controllers/projectController.js";

const router = express.Router();

router.post("/",protect,createProject);
router.get("/:workspaceId",protect,getProjectsByWorkspace);

export default router;