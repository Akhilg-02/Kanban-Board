const Board = require("../models/BoardModel");

const createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized, user not found" });
    }

    const userId = req.user.id;

    const board = new Board({
      title,
      user: userId,
    });

    await board.save();
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Boards for Logged-in User
const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Update Board
const updateBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title },
      { new: true }
    );

    if (!board) return res.status(404).json({ error: "Board not found" });
    
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Board (and all its lists and tasks)
const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!board) return res.status(404).json({ error: "Board not found" });

    // Delete all lists in this board
    await List.deleteMany({ board: board._id });
    // Delete all tasks in those lists
    await Task.deleteMany({ list: { $in: await List.find({ board: board._id }).select("_id") } });

    res.json({ message: "Board deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createBoard, getBoards, updateBoard, deleteBoard  };
