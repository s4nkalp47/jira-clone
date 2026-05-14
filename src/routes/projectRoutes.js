import express from "express";
import {protect} from "../middlewares/authMiddleware.js";
import { requireWorkspaceRole } from "../middlewares/rbaMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {z} from "zod";

import { addProjectMember, createProject,getProjectsByWorkspace } from "../controllers/projectController.js";

const router = express.Router();

const projectSchema = z.object({
    name: z.string(),
    description: z.string().optional()
})

router.post("/:workspaceId/projects",protect,requireWorkspaceRole(["admin"]),validate(projectSchema),createProject);
router.get("/:workspaceId/projects",protect,getProjectsByWorkspace);
router.post("/:projectId/members", protect, addProjectMember);

export default router;