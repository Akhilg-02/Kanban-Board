import React, { useEffect, useState } from "react";
import { useApi } from "../../Context/ApiContext";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Box
} from "@mui/material";
import List from "../List/List";
import "./Board.css"

const Board = () => {
  const { boards, createBoard, fetchBoards } = useApi();
  const [openDialog, setOpenDialog] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBoards = async () => {
      await fetchBoards(); 
      setLoading(false); 
    };
    loadBoards();
  }, []);

  useEffect(() => {
    if (!loading) {
      const isFirstLogin = localStorage.getItem("firstLogin");
      if (boards.length === 0 && !isFirstLogin) {
        setOpenDialog(true);
        sessionStorage.setItem("firstLogin", "true");
        
      }
    }
  }, [boards, loading]);

  // Handle board creation
  const handleCreateBoard = async () => {
    if (boardTitle.trim()) {
      await createBoard(boardTitle);
      sessionStorage.setItem("hasCreatedBoard", "true");
      setOpenDialog(false);
      setBoardTitle("");
    }
  };

  return (
    <Box className="board-container">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress size={40} />
        </Box>
      ) : boards.length > 0 ? (
        <Box>
          <Box className="board-header">
            <Typography variant="h5" className="board-title">
              Your Boards
            </Typography>
            <Button
              variant="contained"
              onClick={() => setOpenDialog(true)}
              sx={{
                backgroundColor: "#FFCE56",
                color: "#333",
                "&:hover": {
                  backgroundColor: "#FFB74D",
                },
              }}
            >
              Create New Board
            </Button>
          </Box>
          {boards.map((board) => (
            <Card key={board._id} className="board-card">
              <Box className="board-card-header">
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {board.title}
                </Typography>
              </Box>
              <CardContent>
                <List boardId={board._id} />
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box className="board-empty">
          <Typography variant="h5" sx={{ mb: 3 }}>
            Welcome to Kanban Board
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary", textAlign: "center" }}>
            You don't have any boards yet. Create your first board to get started.
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            sx={{
              backgroundColor: "#FFCE56",
              color: "#333",
              "&:hover": {
                backgroundColor: "#FFB74D",
              },
            }}
          >
            Create Your First Board
          </Button>
        </Box>
      )}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Create a Board</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Board Title"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            margin="dense"
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: "text.secondary" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateBoard}
            disabled={!boardTitle.trim()}
            sx={{
              backgroundColor: "#FFCE56",
              color: "#333",
              "&:hover": {
                backgroundColor: "#FFB74D",
              },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Board;
