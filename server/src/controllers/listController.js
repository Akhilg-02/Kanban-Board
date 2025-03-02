const List = require("../models/ListModel");
const Board = require("../models/BoardModel");

const createList = async (req, res) => {
    try {
        const { title, boardId } = req.body;
    
        if (!req.user || !req.user.id) {
          return res.status(401).json({ error: "Unauthorized, user not found" });
        }
    
        // Check if board exists and belongs to the user
        const board = await Board.findOne({ _id: boardId, user: req.user.id });
    
        if (!board) {
          return res.status(404).json({ error: "Board not found or unauthorized" });
        }
    
        const list = new List({ title, board: boardId });
    
        await list.save();
        res.status(201).json(list);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
};

const getLists = async (req, res) => {
  try {
    const lists = await List.find({ board: req.params.boardId });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Update List
const updateList = async (req, res) => {
  try {
    const { title } = req.body;
    const list = await List.findByIdAndUpdate(req.params.id, { title }, { new: true });

    if (!list) return res.status(404).json({ error: "List not found" });

    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete List (and its tasks)
const deleteList = async (req, res) => {
  try {
    const list = await List.findByIdAndDelete(req.params.id);

    if (!list) return res.status(404).json({ error: "List not found" });

    await Task.deleteMany({ list: list._id });

    res.json({ message: "List deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {createList, getLists, updateList, deleteList  };
