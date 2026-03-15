import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js"

import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

//Routes

app.use("/api/users",userRoutes);


app.get("/health", (req,res) => {
    res.json({status : "ok"});
});

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});