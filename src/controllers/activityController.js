import Activity from "../models/Activity.js";
import Task from "../models/Task.js";

export const getActivities = async (req,res,next) => {
    try{
        const {taskId} = req.params;

        const task = await Task.findById(taskId);

        if(!task){
            return res.status(404).json({ message: "Task not found."})
        }

        const activities = await Activity.find({
            task: taskId
        })

        res.status(200).json(activities);
    }
    catch(error){
        next(error);
    }
}