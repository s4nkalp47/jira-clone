import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import {z} from "zod";

import { createTask, getTasks, deleteTask, updateTask } from "../controllers/taskController.js";

const router = express.Router();

const taskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
    assignee: z.string().optional()
})

router.post("/projects/:projectId/tasks",protect,validate(taskSchema),createTask);

router.get("/projects/:projectId/tasks",protect,getTasks);

router.patch("/tasks/:taskId",protect,updateTask);

router.delete("/tasks/:taskId",protect,deleteTask);

export default router;
