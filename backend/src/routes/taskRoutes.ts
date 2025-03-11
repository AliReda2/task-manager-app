import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router: Router = Router();

// Get all tasks
router.get("/", getTasks);

// Create a new task
router.post("/", createTask);

// Update an existing task by ID
router.put("/:id", updateTask);

// Delete a task by ID
router.delete("/:id", deleteTask);

export default router;
