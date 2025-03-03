import { useEffect, useState } from "react";
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
  IconButton,
  Box
} from "@mui/material";
import { useApi } from "../../Context/ApiContext";
import { Edit, Delete, Add } from "@mui/icons-material";
import Task from "../Task/Task";
import "./List.css"
//import { useDragDrop } from "../Context/DndContext";


const List = ({ boardId }) => {
  const { lists, createList, getLists, updateList, deleteList } = useApi();
  const [openDialog, setOpenDialog] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [editingList, setEditingList] = useState(null);

  useEffect(() => {
    if (boardId) {
      getLists(boardId);
    }
  }, [boardId]);

  const handleCreateOrUpdateList = async () => {
    if (!listTitle.trim()) return;

    if (editingList) {
      await updateList(editingList._id, listTitle);
      setEditingList(null);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      await createList(boardId, listTitle);
    }

    setListTitle("");
    setOpenDialog(false);
  };

  const handleEditClick = (list) => {
    setEditingList(list);
    setListTitle(list.title);
    setOpenDialog(true);
  };

  const handleDeleteClick = (listId) => {
    deleteList(listId, boardId);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <Typography variant="h6">Lists</Typography>
        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          disabled={lists.length >= 5}
          startIcon={<Add />}
          sx={{
            backgroundColor: "#FFCE56",
            color: "#333",
            "&:hover": {
              backgroundColor: "#FFB74D",
            },
          }}
        >
          Create List
        </Button>
      </div>

      {lists[boardId]?.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 2,
          }}
        >
          {lists[boardId].map((list) => (
            <Card key={list._id} className="list-card">
              <Box className="list-card-header">
                <Typography variant="subtitle1" className="list-title">
                  {list.title}
                </Typography>
                <div className="list-actions">
                  <IconButton
                    onClick={() => handleEditClick(list)}
                    size="small"
                    sx={{ color: "#555" }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(list._id)}
                    size="small"
                    sx={{ color: "#555" }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              </Box>
              <CardContent>
                <Task listId={list._id} />
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box className="list-empty">
          <Typography
            variant="body1"
            sx={{ mb: 2, color: "text.secondary", textAlign: "center" }}
          >
            No lists available. Create your first list to organize your tasks.
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            startIcon={<Add />}
            sx={{
              backgroundColor: "#FFCE56",
              color: "#333",
              "&:hover": {
                backgroundColor: "#FFB74D",
              },
            }}
          >
            Create Your First List
          </Button>
        </Box>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>
          {editingList ? "Edit List" : "Create a List"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="List Title"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
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
            onClick={handleCreateOrUpdateList}
            disabled={!listTitle.trim()}
            sx={{
              backgroundColor: "#FFCE56",
              color: "#333",
              "&:hover": {
                backgroundColor: "#FFB74D",
              },
            }}
          >
            {editingList ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};



export default List;
