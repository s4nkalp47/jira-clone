import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        action: {
            type: String,
            required: true
        },

        task : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Activity",activitySchema);