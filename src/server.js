import dotenv from "dotenv";
import express from "express";
import {connectDB} from "./config/db.js"

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import workspaceRoutes from "./routes/workspacesRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());

//Routes

app.use("/api/v1/users",userRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/workspaces",workspaceRoutes);
app.use("/api/v1/workspaces",projectRoutes);
app.use("/api/v1",taskRoutes);
app.use(errorHandler);


app.get("/health", (req,res) => {
    res.json({status : "ok"});
});

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});