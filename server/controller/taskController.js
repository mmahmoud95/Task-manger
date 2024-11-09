const Task = require("../models/task");

const createTask = async (req, res) => {
  console.log(req.body)
  try {
    const { title, description, dueDate } = req.body;
    const newTask = new Task({
      title,
      description,
      dueDate,
      createdBy: req.userId
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    // Create an update object with only the provided fields
    const updateData = {};
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.dueDate !== undefined) updateData.dueDate = req.body.dueDate;
    if (req.body.complete !== undefined) updateData.complete = req.body.complete;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update task" });
  }

}

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
}

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.userId });
    if (tasks.length === 0) {
      return res.status(404).json({ error: "No tasks found" });
    }
    res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
}

module.exports = { createTask, updateTask, deleteTask, getTasks };