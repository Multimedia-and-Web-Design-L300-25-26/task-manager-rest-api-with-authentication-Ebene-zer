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



