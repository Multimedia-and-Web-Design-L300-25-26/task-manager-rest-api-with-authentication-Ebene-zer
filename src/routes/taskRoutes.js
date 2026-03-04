import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware
router.use(authMiddleware);

// POST /api/tasks
router.post("/", async (req, res) => {
  // - Create task
  const task = await Task.create({
    ...req.body,
    user: req.user._id
  });
  // - Return created task
  res.status(201).json(task);
});

// GET /api/tasks
router.get("/", async (req, res) => {
  // - Return only tasks belonging to req.user
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

// DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  // - Check ownership
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  if (task.user.toString() !== req.user._id) {
    return res.status(403).json({ message: "Can't delete this task. You are not the owner" });
  }
  // - Delete task
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted successfully" });
});

export default router;