import Comment from "../models/Comment.js";
import Task from "../models/Task.js";

export const addComment = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const { content } = req.body;

        const task = await Task.findById(taskId);

        if(!task){
            return res.status(404).json({
                message : "Task not found"
            })
        }

        const comment = await Comment.create({
            task: taskId,
            user: req.user._id,
            content
        });

        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};

export const getComments = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId);

        if(!task){
            return res.status(404).json({
                message : "Task not found"
            })
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const comments = await Comment.find({
            task: taskId
        }).skip(skip).limit(limit);

        const total = await Comment.countDocuments({
            task: taskId
        });
        
        res.status(200).json({
            comments,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        });

    } catch (error) {
        next(error);
    }
};

export const editComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;

        const comment = await Comment.findById(commentId);

        // check if comment exists
        // check if req.user._id matches comment.user (only owner can edit)

        if(!comment){
            return res.status(404).json({
                message: "Comment not Found"
            })
        }

        if(comment.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "Only the comment owner can edit"
            })
        }

        comment.content = content;
        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        // find comment, check ownership, then delete
        const comment = await Comment.findById(commentId);

        if(!comment){
            return res.status(404).json({
                message: "Comment not Found"
            })
        }

        if(comment.user.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "Only the comment owner can edit"
            })
        }

        await Comment.findByIdAndDelete(commentId);
        
        res.status(200).json({ message: "Comment deleted successfully" });

    } catch (error) {
        next(error);
    }
};