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
} from "@mui/material";
import { useApi } from "../Context/ApiContext";
import { Edit, Delete } from "@mui/icons-material";
import Task from "./Task";
//import { useDragDrop } from "../Context/DndContext";


const List = ({ boardId}) => {
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
    <div>
      <Button
        variant="contained"
        onClick={() => setOpenDialog(true)}
        disabled={lists.length >= 5}
      >
        Create List
      </Button>
      {lists[boardId]?.length > 0 ? (
        lists[boardId].map((list) => (
          <Card key={list._id} style={{ margin: "10px", padding: "10px" }}>
            <CardContent
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{list.title}</Typography>
              <div>
                <IconButton onClick={() => handleEditClick(list)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(list._id)}>
                  <Delete />
                </IconButton>
              </div>
            </CardContent>
            <Task listId={list._id} />
          </Card>
        ))
      ) : (
        <Typography variant="h5">No lists available</Typography>
      )}
      {/* Dialog for Creating Lists  & Updating Lists */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingList ? "Edit List" : "Create a List"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="List Title"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateOrUpdateList}
            disabled={!listTitle.trim()}
          >
            {editingList ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default List;
