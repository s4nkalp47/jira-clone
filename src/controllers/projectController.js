import Membership from "../models/Membership.js";
import Project from "../models/Project.js";
import Workspace from "../models/Workspace.js";

export const createProject = async(req,res,next) => {
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
        next(error);
    }
}


export const getProjectsByWorkspace = async(req, res, next) => {
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
        next(error);
    }
};

export const addProjectMember = async(req, res, next) => {
    try{
        const { projectId} = req.params;
        const { userId, role } = req.body;

        const project = await Project.findById(projectId);
        
        if(!project){
            return res.status(404).json({ message: "Project not found "});
        }

        const currentUserMembership = await Membership.findOne({
            user: req.user._id,
            workspace: project.workspace
        });

        if(!currentUserMembership || currentUserMembership.role !== "admin"){
            return res.status(403).json({ message: "Admin only "});
        }

        const targetUserMembership = await Membership.findOne({
            user: userId,
            workspace: project.workspace
        });

        if(!targetUserMembership){
            return res.status(400).json({ message: "User not in workspace" });
        }

        const alreadyMember = project.members.some(
            (m) => m.user.toString() === userId
        );

        if(alreadyMember){
            return res.statud(400).json({ message: "Already a member "});
        }

        project.members.push({
            user: userId,
            role: role || "member"
        });

        await project.save();

        res.status(200).json(project);
    }  catch(error){
        next(error);
    }
};