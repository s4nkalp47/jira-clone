import Workspace from "../models/Workspace.js";
import Membership from "../models/Membership.js";

export const createWorkspace = async(req, res) => {
    try{
        const { name } = req.body;

        const workspace = await Workspace.create({
            name,
            owner: req.user._id,
        });

        await Membership.create({
            user: req.user._id,
            workspace: workspace._id,
            role: "admin"
        });

        res.status(201).json(workspace);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const getWorkSpace = async(req,res) => {
    try{
        const memberships = await Membership.find({
           user: req.user._id
        }).populate("workspace");
        console.log("Memberships:", memberships);
        const workspaces = memberships.map(m => m.workspace);
        res.json(workspaces);
    } catch(error){
        res.status(500).json({ message: error.message });
    }
};

export const addMember = async (req, res) => {
  try {
    const { email, role } = req.body;
    const { workspaceId } = req.params;

    // 1. Check workspace exists
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // 2. Check if current user is admin
    const currentUserMembership = await Membership.findOne({
      user: req.user._id,
      workspace: workspaceId
    });

    if (!currentUserMembership || currentUserMembership.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 3. Find user to add
    const userToAdd = await User.findOne({ email });
    if (!userToAdd) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4. Check if already a member
    const existing = await Membership.findOne({
      user: userToAdd._id,
      workspace: workspaceId
    });

    if (existing) {
      return res.status(400).json({ message: "User already a member" });
    }

    // 5. Create membership
    const membership = await Membership.create({
      user: userToAdd._id,
      workspace: workspaceId,
      role: role || "member"
    });

    res.status(201).json(membership);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};