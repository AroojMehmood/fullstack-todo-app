const Task = require("../models/Task");
const Project = require("../models/Project");

// GET /api/tasks — logged-in user ke saare tasks (optionally ek project ke liye)
const getTasks = async (req, res) => {
  try {
    const { project } = req.query;
    const query = { owner: req.user._id };

    if (project) {
      query.project = project;
    }

    const tasks = await Task.find(query).populate("project", "title").sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid project id." });
    }
    res.status(500).json({ message: "Failed to fetch tasks." });
  }
};

// POST /api/tasks — naya task banana (project se linked)
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, project } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "Task title is required." });
    }
    if (title.trim().length < 2 || title.trim().length > 150) {
      return res.status(400).json({ message: "Title must be between 2 and 150 characters." });
    }
    if (!project) {
      return res.status(400).json({ message: "A project is required for this task." });
    }

    // IMPORTANT: confirm ke ye project isi user ka hai
    const parentProject = await Project.findOne({ _id: project, owner: req.user._id });
    if (!parentProject) {
      return res.status(404).json({ message: "Project not found or access denied." });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      status: status || "todo",
      priority: priority || "medium",
      dueDate: dueDate || null,
      project,
      owner: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid project id." });
    }
    res.status(500).json({ message: "Failed to create task." });
  }
};

// PUT /api/tasks/:id — apna task update karna
const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, project } = req.body;
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "" || title.trim().length < 2 || title.trim().length > 150) {
        return res.status(400).json({ message: "Title must be between 2 and 150 characters." });
      }
      task.title = title.trim();
    }
    if (description !== undefined) {
      task.description = description.trim();
    }
    if (status !== undefined) {
      if (!["todo", "in-progress", "completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid task status." });
      }
      task.status = status;
    }
    if (priority !== undefined) {
      if (!["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({ message: "Invalid task priority." });
      }
      task.priority = priority;
    }
    if (dueDate !== undefined) {
      task.dueDate = dueDate || null;
    }
    if (project !== undefined) {
      // IMPORTANT: agar project change ho raha hai, confirm karein wo isi user ka hai
      const parentProject = await Project.findOne({ _id: project, owner: req.user._id });
      if (!parentProject) {
        return res.status(404).json({ message: "Project not found or access denied." });
      }
      task.project = project;
    }

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(500).json({ message: "Failed to update task." });
  }
};

// DELETE /api/tasks/:id — apna task delete karna
const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json(deleted);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Task not found." });
    }
    res.status(500).json({ message: "Failed to delete task." });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };