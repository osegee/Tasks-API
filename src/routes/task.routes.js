import { Router } from "express";
import {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = Router();

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getOneTask);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
