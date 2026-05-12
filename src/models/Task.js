import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type : String,
            required: true
        },

        description: {
            type : String
        },

        status: {
            type: String,
            enum: ["todo","in-progess","done"],
            default: "todo"
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "low"
        },

        assignee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        reporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true}
);

export default mongoose.model("Task",TaskSchema);