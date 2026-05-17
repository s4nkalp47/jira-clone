import Project from "../models/Project.js";
import Task from "../models/Task.js";
import logActivity from "../utils/logActivity.js";

export const createTask = async(req,res,next) => {
    try{
        const {title,description,status,priority,assignee} = req.body;

        const {projectId} = req.params;

        const project = await Project.findById(projectId);

        if(!project){
            return res.status(404).json({
                message: "Project not Found"
            })
        }

        const isMember = project.members.some(
            (m) => m.user.toString() === req.user._id.toString()
        );

        if(!isMember){
            return res.status(403).json({
                message: "Not a project member"
            });
        }
        
        const task = await Task.create({
            title,
            description,
            project: projectId,
            status,
            priority,
            assignee,
            reporter: req.user._id
        })

        logActivity(req.user._id,task._id,"Created Task");

        res.status(201).json(task);

    }
    catch(error){
        next(error);
    }
}

export const getTasks = async(req,res,next) => {
    try{
        const {projectId} = req.params;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isMember = project.members.some(
            (m) => m.user.toString() === req.user._id.toString()
        );

        if(!isMember){
            return res.status(403).json({
                message: "Not a project member"
            });
        }

        const tasks = await Task.find({
            project: projectId
        })

        res.status(200).json(tasks);

    }
    catch(error){
        next(error);
    }
}

export const updateTask = async(req,res,next) => {
    try{
        const {taskId} = req.params;
        const {title,description,status,priority,assignee} = req.body;
        const updates = {};
        if(title) updates.title = title;
        if(description) updates.description = description;
        if(status) updates.status = status;
        if(priority) updates.priority = priority;
        if(assignee) updates.assignee = assignee;

        const task = await Task.findByIdAndUpdate(
            taskId,
            updates, {new: true}
        );

        logActivity(req.user._id,taskId,"Updated Task");

        res.status(200).json(task);

    }
    catch(error){
        next(error);
    }
}

export const deleteTask = async(req,res,next) => {
    try{
        const { taskId } = req.params;

        await Task.findByIdAndDelete(taskId)

        logActivity(req.user._id,taskId,"Deleted Task");

        res.status(200).json({ message:
            "Task Deleted Succesfully"
        });
        
    }
    catch(error){
        next(error);
    }
}