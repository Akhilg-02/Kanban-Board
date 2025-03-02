const express = require("express");
const { createList, getLists, updateList, deleteList } = require("../controllers/listController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createList);
router.get("/:boardId", authMiddleware, getLists);
router.put("/:id", authMiddleware, updateList);
router.delete("/:id", authMiddleware, deleteList);

module.exports = router;
