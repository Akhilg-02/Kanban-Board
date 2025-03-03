const express = require("express");
const { createBoard, getBoards} = require("../controllers/boardController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createBoard);
router.get("/", authMiddleware, getBoards);

module.exports = router;
