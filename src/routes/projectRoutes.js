import express from "express";
import {protect} from "../middlewares/authMiddleware.js";
import { createProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/",protect,createProject);

export default router;