import { Card, CardContent, Typography } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import { useDragDrop } from "../Context/DndContext";

const ItemType = "TASK";


const DndTask = ({ task, listId, index }) => {
    const { moveTask } = useDragDrop();
    console.log(task, listId)
    // Drag Logic
    const [{ isDragging }, dragRef] = useDrag({
      type: ItemType,
      item: { id: task._id, listId, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    // Drop Logic
    const [, dropRef] = useDrop({
      accept: ItemType,
      hover: (draggedItem) => {
        if (draggedItem.id !== task._id) {
          moveTask(draggedItem.id, draggedItem.listId, listId, index);
          draggedItem.listId = listId;
          draggedItem.index = index;
        }
      },
    });
  
    return (
      <Card
        ref={(node) => dragRef(dropRef(node))}
        style={{
          opacity: isDragging ? 0.5 : 1,
          marginBottom: "10px",
          cursor: "grab",
        }}
      >
        <CardContent>
          <Typography variant="h6">{task.title}</Typography>
        </CardContent>
      </Card>
    );
  };
  
  export default DndTask;