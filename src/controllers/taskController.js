import Task from "../models/Task.js";

//1. Create Task controller
//Use res.user.id
//save task

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({
            title,
            description,
            user: req.user.id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//2. Get tasks for user
//Return only tasks for logged in user

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });   
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//3. Delete task
//Find task by id
//Check ownership
//Delete if owner
//Otherwise return 403

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Can't delete this task. You are not the owner" });
        }
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 

export { createTask, getTasks, deleteTask };



