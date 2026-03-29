import express from "express";
import {protect} from "../middlewares/authMiddleware.js";
import { requireWorkspaceRole } from "../middlewares/rbaMiddleware.js";

import { addProjectMember, createProject,getProjectsByWorkspace } from "../controllers/projectController.js";

const router = express.Router();

router.post("/",protect,requireWorkspaceRole(["admin"]),createProject);
router.get("/:workspaceId",protect,getProjectsByWorkspace);
router.post("/:projectId/members", protect, addProjectMember);

export default router;