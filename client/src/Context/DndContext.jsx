import { createContext, useContext, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DragDropContext = createContext();

export const DragDropProvider = ({ children }) => {
  const [tasks, setTasks] = useState({});

  const moveTask = (taskId, sourceListId, targetListId, targetIndex) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
  
      if (!updatedTasks[sourceListId]) return prevTasks;
  
      // Find and remove task
      const taskIndex = updatedTasks[sourceListId].findIndex((t) => t._id === taskId);
      if (taskIndex === -1) return prevTasks;
  
      const [movedTask] = updatedTasks[sourceListId].splice(taskIndex, 1);
  
      // Ensure target list exists
      if (!updatedTasks[targetListId]) updatedTasks[targetListId] = [];
  
      // Insert task at the new position
      updatedTasks[targetListId].splice(targetIndex, 0, movedTask);
  
      return { ...updatedTasks }; // Return new state
    });
  };

  return (
    <DragDropContext.Provider value={{ tasks, setTasks, moveTask }}>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </DragDropContext.Provider>
  );
};

export const useDragDrop = () => useContext(DragDropContext);
