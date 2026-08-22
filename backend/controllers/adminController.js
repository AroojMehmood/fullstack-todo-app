const User = require("../models/user");
const Project = require("../models/Project");
const Task = require("../models/Task");

// GET /api/admin/overview — sirf admin ke liye, application-level data
const getOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalTasks = await Task.countDocuments();
    const users = await User.find().select("name email role createdAt").sort({ createdAt: -1 });

    res.status(200).json({ totalUsers, totalProjects, totalTasks, users });
  } catch (error) {
    res.status(500).json({ message: "Failed to load admin overview." });
  }
};

module.exports = { getOverview };