const Project = require("../models/Project");
const Task = require("../models/Task");
const Todo = require("../models/Todo");

// GET /api/dashboard — logged-in user ke apne real stats
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalProjects = await Project.countDocuments({ owner: userId });
    const totalTasks = await Task.countDocuments({ owner: userId });
    const completedTasks = await Task.countDocuments({ owner: userId, status: "completed" });
    const pendingTasks = await Task.countDocuments({ owner: userId, status: { $ne: "completed" } });
    const highPriorityTasks = await Task.countDocuments({
      owner: userId,
      priority: "high",
      status: { $ne: "completed" },
    });
    const totalTodos = await Todo.countDocuments({ user: userId });
    const completedTodos = await Todo.countDocuments({ user: userId, completed: true });

    const recentProjects = await Project.find({ owner: userId }).sort({ createdAt: -1 }).limit(5);
    const recentTasks = await Task.find({ owner: userId })
      .populate("project", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      highPriorityTasks,
      totalTodos,
      completedTodos,
      recentProjects,
      recentTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats." });
  }
};

module.exports = { getDashboardStats };