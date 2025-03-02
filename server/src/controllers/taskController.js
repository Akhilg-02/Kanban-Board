const Task = require("../models/TaskModel");
const Board = require("../models/BoardModel");
const List = require("../models/ListModel");

const createTask = async (req, res) => {
    try {

        const { title, description, dueDate, priority, listId } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized, user not found" });
    }

    // Find the list and ensure it belongs to the user
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    // Find the board associated with the list
    const board = await Board.findById(list.board);
    if (!board || board.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to add task to this list" });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      list: listId,
    });

    await task.save();
    res.status(201).json(task);
        
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get Tasks for a List
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ list: req.params.listId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {createTask, getTasks, updateTask, deleteTask };
