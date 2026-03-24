import Workspace from "../models/Workspace"

export const checkWorkspaceAccess = async( req, res, next) => {
    const workspace = await Workspace.findById(req.params.id);

    if(!workspace){
        return res.status(404).json({ message: "Workspace not found"});
    }

    const isMember = workspace.members.some(
        m => m.user.toString() === req.user._id.toString()
    );

    if(!isMember){
        return res.status(403).json({ message: "Access Denied"});
    }

    req.workspace = workspace;
    next();
}