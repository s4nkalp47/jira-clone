import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { z } from "zod";
import { addComment, deleteComment, editComment, getComments } from "../controllers/commentController.js";

const router = express.Router();

const commentSchema = z.object({
    content: z.string()
})

router.get("/tasks/:taskId/comments",protect,getComments);
router.post("/tasks/:taskId/comments",protect,validate(commentSchema),addComment);
router.patch("/comments/:commentId",protect,editComment);
router.delete("/comments/:commentId",protect,deleteComment);

export default router;