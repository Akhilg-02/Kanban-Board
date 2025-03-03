import { useState, useEffect } from "react";
import { useApi } from "../../Context/ApiContext";
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
    MenuItem,
    Box
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import "./Task.css"
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
    <div className="task-container">
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpenDialog()}
        size="small"
        sx={{
          backgroundColor: "#FFCE56",
          color: "#333",
          "&:hover": {
            backgroundColor: "#FFB74D",
          },
        }}
      >
        Add Task
      </Button>

      {/* Task Dialog Box */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: "8px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>{editingTask ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            label="Description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="outlined"
            multiline
            rows={3}
          />
          <TextField
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Due Date"
          />
          <TextField
            select
            label="Priority"
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            fullWidth
            margin="dense"
            variant="outlined"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          <Button onClick={handleCloseDialog} sx={{ color: "text.secondary" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveTask}
            sx={{
              backgroundColor: "#FFCE56",
              color: "#333",
              "&:hover": {
                backgroundColor: "#FFB74D",
              },
            }}
          >
            {editingTask ? "Update Task" : "Add Task"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Task List */}
      {tasks[listId]?.length > 0 ? (
        <div style={{ marginTop: "16px" }}>
          {tasks[listId].map((task) => (
            <Card key={task._id} className="task-card">
              <CardContent className="task-content">
                <Typography variant="subtitle1" className="task-title">
                  {task.title}
                </Typography>
                <Typography variant="body2" className="task-description">
                  {task.description}
                </Typography>

                <div className="task-meta">
                  <div>
                    <Typography variant="caption" className="task-due-date">
                      Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="span"
                      className={`task-priority priority-${task.priority}`}
                      sx={{ ml: 1 }}
                    >
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </Typography>
                  </div>
                  <div className="task-actions">
                    <IconButton color="primary" onClick={() => handleOpenDialog(task)} size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteTask(task._id, listId)} size="small">
                      <Delete fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Box className="task-empty">
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
            No tasks available
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            size="small"
            sx={{
              borderColor: "#FFCE56",
              color: "#333",
              "&:hover": {
                borderColor: "#FFB74D",
                backgroundColor: "rgba(255, 206, 86, 0.1)",
              },
            }}
          >
            Add Your First Task
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Task;



