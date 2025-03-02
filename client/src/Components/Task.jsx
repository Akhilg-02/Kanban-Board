import { useState, useEffect } from "react";
import { useApi } from "../Context/ApiContext";
import {
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid2 as Grid,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
//import { useDragDrop } from "../Context/DndContext";


const Task = ({ listId}) => {
  const { tasks, createTask, getTasks, updateTask, deleteTask } = useApi();

  // Single state to handle task fields
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const [editingTask, setEditingTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (listId) {
      getTasks(listId);
    }
  }, [listId]);


const handleOpenDialog = (task = null) => {
    setEditingTask(task);
    setTaskData(
      task
        ? { title: task.title, description: task.description, dueDate: task.dueDate, priority: task.priority }
        : { title: "", description: "", dueDate: "", priority: "medium" }
    );

    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    window.location.reload();
  };



const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSaveTask = async () => {
    if (editingTask) {
      await updateTask(editingTask._id, taskData);
    } else {
      await createTask(listId, taskData.title, taskData.description, taskData.dueDate, taskData.priority);
    }
    handleCloseDialog();
    getTasks(listId);
  };

  const handleDeleteTask = async (taskId, listId) => {
    await deleteTask(taskId, listId);
    getTasks(listId);
  };

  return (
    <div>
    <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
      Add Task
    </Button>

    {/* Task Dialog Box */}
    <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
      <DialogTitle>{editingTask ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent>
        <TextField label="Title" name="title" value={taskData.title} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="Description" name="description" value={taskData.description} onChange={handleChange} fullWidth margin="dense" />
        <TextField type="date" name="dueDate" value={taskData.dueDate} onChange={handleChange} fullWidth margin="dense" />
        <TextField label="Priority" name="priority" value={taskData.priority} onChange={handleChange} fullWidth margin="dense" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button variant="contained" onClick={handleSaveTask}>
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
      </DialogActions>
    </Dialog>

    {/* Task List with Grid Layout */}
    {tasks[listId]?.length > 0 ? (
      <Grid container spacing={2} marginTop={2}>
        {tasks[listId].map((task) => (
          <Grid item xs={12} key={task._id}>
            <Card>
              <CardContent style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography>{task.description}</Typography>
                  <Typography>Due: {task.dueDate}</Typography>
                  <Typography>Priority: {task.priority}</Typography>
                </div>
                <div>
                  <IconButton color="primary" onClick={() => handleOpenDialog(task)}>
                    <Edit />
                  </IconButton>
                   <IconButton color="error" onClick={() => handleDeleteTask(task._id, listId)}>
                    <Delete />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        No tasks available
      </Typography>
    )}
  </div>
  );
};

export default Task;


