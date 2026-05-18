import mongoose from "mongoose";
import Task from "./src/models/Task.js";
import dotenv from "dotenv";
dotenv.config();

const projectId = "69c58b3897ce776cd26787d8";
const userId = "69b83ee131123b6db21bbc46";

const tasks = [
  { title: "Set up CI/CD pipeline", priority: "high", status: "todo" },
  { title: "Write unit tests for auth", priority: "medium", status: "todo" },
  { title: "Fix password reset flow", priority: "high", status: "in-progress" },
  { title: "Add email notifications", priority: "medium", status: "todo" },
  { title: "Optimize database queries", priority: "low", status: "todo" },
  { title: "Implement rate limiting", priority: "high", status: "todo" },
  { title: "Add swagger documentation", priority: "medium", status: "todo" },
  { title: "Refactor error handling", priority: "low", status: "done" },
  { title: "Add pagination to comments", priority: "low", status: "todo" },
  { title: "Set up logging with winston", priority: "medium", status: "todo" },
  { title: "Fix CORS configuration", priority: "high", status: "in-progress" },
  { title: "Add request validation", priority: "medium", status: "done" },
  { title: "Implement JWT refresh tokens", priority: "high", status: "todo" },
  { title: "Write API documentation", priority: "medium", status: "in-progress" },
  { title: "Set up Docker compose", priority: "low", status: "done" },
].map(t => ({ ...t, project: projectId, reporter: userId }));

await mongoose.connect(process.env.MONGO_URI);
await Task.insertMany(tasks);
console.log("Seeded 15 tasks");
await mongoose.disconnect();