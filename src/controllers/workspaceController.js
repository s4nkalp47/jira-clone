import Workspace from "../models/Workspace.js";

export const createWorkspace = async(req, res) => {
    try{
        const { name } = req.body;

        const workspace = await Workspace.create({
            name,
            owner: req.user._id,
            members: [
                {
                    user: req.user._id,
                    role: "admin"
                }
            ]
        });
        res.status(201).json(workspace);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const getWorkSpace = async(req,res) => {
    try{
        const workspaces = await Workspace.find({
            $or: [
                { owner: req.user._id },
                { "members.user": req.user._id}
            ]
        });
        res.json(workspaces);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
};

export const addMember = async(req,res) => {
    try{
        const { userId } = req.body;

        const workspace = await Workspace.findById(req.params.id);

        if(!workspace){
            return res.status(400).json({ message : "Workspace not found"});
        }

        const isAdmin = workspace.members.find(
            m => m.user.toString() === req.user._id.toString() && m.role === "admin"
        );

        if(!isAdmin){
            return res.status(403).json({ message : "Not Authorized"});
        }

        workspace.members.push({
            user: userId,
            role: "member"
        });

        await workspace.save();

        res.json(workspace);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}