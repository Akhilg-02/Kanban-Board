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


module.exports = { createBoard, getBoards};
