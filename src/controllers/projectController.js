import Project from "../models/Project.js";
import Workspace from "../models/Workspace.js";

export const createProject = async(req,res) => {
    try{
        const {name,description,workspaceId} = req.body;

        const workspace = await Workspace.findById(workspaceId);

        if(!workspace){
            return res.status(404).json({message: "Workspace not found"});
        }

        const isMember = workspace.members.some((m) => m.user.toString() === req.user._id.toString());

        if(!isMember){
            return res.status(403).json({ message: "Not Authorized"});
        }

        const project = await Project.create({
            name,
            description,
            workspace: workspaceId,
            createdBy: req.user._id,
            members: [
                {
                    user: req.user._id,
                    role: "admin",
                },
            ],
        });
        res.status(201).json(project);
    } catch(error){
        res.status(500).json({ message: error.message});
    }
}