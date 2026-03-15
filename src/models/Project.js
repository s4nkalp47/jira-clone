import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required: true
        },

        workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true}
);

export default mongoose.model("Project",projectSchema);