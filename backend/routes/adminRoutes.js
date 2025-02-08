import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// Create a project
router.post("/", async (req, res) => {
  const { name, description, link, image } = req.body;
  try {
    const newProject = new Project({ name, description, link, image });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Delete a project
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
