import { createContext, useContext, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DragDropContext = createContext();

export const DragDropProvider = ({ children }) => {
  const [DragTasks, setDragTasks] = useState({});

  const moveTask = (listId, fromIndex, toIndex) => {
    setDragTasks((prevTasks) => {
      if (!prevTasks[listId]) return prevTasks;

      //console.log("Before move:", prevTasks[listId]);

      const updatedTasks = { ...prevTasks };
      const taskList = [...updatedTasks[listId]];

      if (fromIndex === toIndex) return prevTasks;
      if (
        fromIndex < 0 ||
        fromIndex >= taskList.length ||
        toIndex < 0 ||
        toIndex >= taskList.length
      ) {
        return prevTasks;
      }

      const [movedTask] = taskList.splice(fromIndex, 1);
      taskList.splice(toIndex, 0, movedTask);

      updatedTasks[listId] = taskList;

      //console.log("After move:", updatedTasks[listId]);
      return updatedTasks;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <DragDropContext.Provider value={{ DragTasks, moveTask }}>
        {children}
      </DragDropContext.Provider>
    </DndProvider>
  );
};

export const useDragDrop = () => useContext(DragDropContext);
