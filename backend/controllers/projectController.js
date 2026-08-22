const Project = require("../models/Project");

// GET /api/projects — logged-in user ke apne saare projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects." });
  }
};

// POST /api/projects — naya project banana
const createProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "Project title is required." });
    }
    if (title.trim().length < 2 || title.trim().length > 100) {
      return res.status(400).json({ message: "Title must be between 2 and 100 characters." });
    }

    const project = await Project.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      status: status || "active",
      owner: req.user._id,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project." });
  }
};


// PUT /api/projects/:id — apna project update karna
const updateProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const project = await Project.findOne({ _id: req.params.id, owner: req.user._id });

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "" || title.trim().length < 2 || title.trim().length > 100) {
        return res.status(400).json({ message: "Title must be between 2 and 100 characters." });
      }
      project.title = title.trim();
    }
    if (description !== undefined) {
      project.description = description.trim();
    }
    if (status !== undefined) {
      if (!["active", "on-hold", "completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid project status." });
      }
      project.status = status;
    }

    await project.save();
    res.status(200).json(project);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(500).json({ message: "Failed to update project." });
  }
};

// DELETE /api/projects/:id — apna project delete karna
const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!deleted) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json(deleted);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(500).json({ message: "Failed to delete project." });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };