import Membership from "../models/Membership.js";
import Project from "../models/Project.js";
import Workspace from "../models/Workspace.js";

export const createProject = async(req,res) => {
    try{
        const {name,description,workspaceId} = req.body;

        const workspace = await Workspace.findById(workspaceId);

        if(!workspace){
            return res.status(404).json({message: "Workspace not found"});
        }

        const membership = await Membership.findOne({
            user: req.user._id,
            workspace: workspaceId
        });

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


export const getProjectsByWorkspace = async(req, res) => {
    try{
        const {workspaceId} = req.params;

        const membership = await Membership.findOne({
            user: req.user._id,
            workspace: workspaceId
        });

        if(!membership){
            return res.status(403).json({ message: "Not authorized "});
        }

        const projects = await Project.find({
            workspace: workspaceId
        });

        res.status(200).json(projects);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
};