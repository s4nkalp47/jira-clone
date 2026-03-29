import Membership from "../models/Membership.js";

export const requireWorkspaceRole = (roles = []) => {
    return async (req, res, next) => {
        try{
            const {workspaceId} = req.params;

            const membership = await Membership.findOne({
                user: req.user._id,
                workspace: workspaceId
            });

            if(!membership){
                return res.status(403).json({ message: "Not authorized "});
            }

            if(roles.length && !roles.includes(membership.role)){
                return res.status(403).json({ message: "Insufficient role"});
            }

            req.membership = membership;
            next();
        } catch(error){
            res.status(500).json({ message: error.message });
        }
    }
}