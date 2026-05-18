import Activity from "../models/Activity.js";
import Task from "../models/Task.js";

export const getActivities = async (req,res,next) => {
    try{
        const {taskId} = req.params;

        const task = await Task.findById(taskId);

        if(!task){
            return res.status(404).json({ message: "Task not found."})
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const activities = await Activity.find({
            task: taskId
        }).skip(skip).limit(limit);

        const total = await Activity.countDocuments({
            task: taskId
        })

        res.status(200).json({
            activities,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        });
    }
    catch(error){
        next(error);
    }
}