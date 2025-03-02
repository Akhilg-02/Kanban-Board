import React, { useEffect, useState } from "react";
import { useApi } from "../Context/ApiContext";
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
import List from "./List";

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
    <Box sx={{ padding: 4 }}>
      {loading ? (
        <Typography variant="h6"><CircularProgress/></Typography>
      ) : boards.length > 0 ? (
        boards.map((board) => (
          <Card key={board._id} style={{ margin: "10px", padding: "10px" }}>
            <CardContent>
              <Typography variant="h6">{board.title}</Typography>
              <List boardId={board._id} />
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h5">No boards available</Typography>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create a Board</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Board Title"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateBoard}
            disabled={!boardTitle.trim()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Board;

