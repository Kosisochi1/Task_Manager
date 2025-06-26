const TaskModel = require("../models/task");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Enter task field" });
    }

    userId = req.user._id;

    const newTask = await TaskModel.create({ title, description, userId });
    return res.status(201).json({ message: "task created", data: newTask });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      data: null,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Tasknot found" });
    }

    return res.status(200).json({ message: "task updated", data: task });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      data: null,
    });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByIdAndDelete({ _id: id });
    if (!task) {
      return res.status(404).json({ message: `task with id ${id} not found` });
    }

    return res.status(200).json({ message: "task deleted" });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      data: null,
    });
  }
};
const allTask = async (req, res) => {
  try {
    const { status } = req.query;
    let searchQuery = { userId: req.user._id };

    if (status === "all") {
      searchQuery;
    }
    if (status === "pending") {
      searchQuery = { status: "pending", userId: req.user._id };
    }
    if (status === "Inprogress") {
      searchQuery = { status: "Inprogress", userId: req.user._id };
    }
    if (status === "completed") {
      searchQuery = { status: "completed", userId: req.user._id };
    }

    const result = await TaskModel.find(searchQuery);

    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      data: null,
    });
  }
};
const singleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findOne({ _id: id });
    if (!task) {
      return res.status(200).json({ message: `No tesk with ${id} found` });
    }

    return res.status(200).json({ data: task });
  } catch (error) {}
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  allTask,
  singleTask,
};
