import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://kanban-board-539t.onrender.com/api/" // http://localhost:5000/api/ (for runnig locally)

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [boards, setBoards] = useState([]);
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const authToken = user?.token;
    if (authToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"]; 
    }
  }, [user]);

  const registerUser = async (userData) => {
    try {
      const { data } = await axios.post(`${API_URL}users/register`, userData);

      return data;
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  // Login User
  const loginUser = async (credentials) => {
    try {
      const { data } = await axios.post(`${API_URL}users/login`, credentials);
      sessionStorage.setItem("user", JSON.stringify(data));
      sessionStorage;
      setUser(data);
    } catch {
      throw new Error("Login failed. Check your credentials.");
    }
  };

  // Fetch boards
  const fetchBoards = async () => {
    try {
      const { data } = await axios.get(`${API_URL}boards`);
      setBoards(data);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  const createBoard = async (title) => {
    if (boards.length > 0) {
      console.warn("Only one board is allowed.");
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}boards`, { title });
      setBoards([data]); // Only one board allowed
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  // Fetch lists for a board
  const getLists = async (boardId) => {
    try {
      const { data } = await axios.get(`${API_URL}lists/${boardId}`);
      setLists((prev) => ({ ...prev, [boardId]: data })); // Store lists for this board
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  // List Api's -------------------------------------------------------------------------

  // Create lists for a board
  const createList = async (boardId, title) => {
    if (lists[boardId]?.length >= 5) {
      console.warn("You can create a maximum of 5 lists.");
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}lists`, { boardId, title });
      setLists((prev) => ({
        ...prev,
        [boardId]: [...(prev[boardId] || []), data],
      }));
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const updateList = async (listId, updatedTitle) => {
    try {
      const { data } = await axios.put(`${API_URL}lists/${listId}`, {
        title: updatedTitle,
      });
  
      setLists((prev) => ({
        ...prev,
        [data.boardId]: prev[data.boardId].map((list) =>
          list._id === listId ? data : list
        ),
      }));
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };

  const deleteList = async (listId, boardId) => {
    try {
      await axios.delete(`${API_URL}lists/${listId}`);
  
      setLists((prev) => {
        const updatedLists = prev[boardId].filter((list) => list._id !== listId);
        return { ...prev, [boardId]: updatedLists };
      });
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };


  // Task Api's -------------------------------------------------------------------------
  const createTask = async (listId, title, description, dueDate, priority) => {
    try {
      const { data } = await axios.post(`${API_URL}tasks`, {
        listId,
        title,
        description,
        dueDate,
        priority,
      });

      setTasks((prev) => ({
        ...prev,
        [listId]: [...(prev[listId] || []), data], // Append new task to the list
      }));

      
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const getTasks = async (listId) => {
    try {
      const { data } = await axios.get(`${API_URL}tasks/${listId}`);

      setTasks((prev) => ({
        ...prev,
        [listId]: data, // Set tasks for the given list
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      const { data } = await axios.put(
        `${API_URL}tasks/${taskId}`,
        updatedData
      );

      setTasks((prev) => {
        const updatedTasks = prev[data.listId].map((task) =>
          task._id === taskId ? data : task
        );
        return { ...prev, [data.listId]: updatedTasks };
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId, listId) => {
    try {
      await axios.delete(`${API_URL}tasks/${taskId}`);

      setTasks((prev) => ({
        ...prev,
        [listId]: prev[listId].filter((task) => task._id !== taskId),
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Logout User
  const logoutUser = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <ApiContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
        logoutUser,
        boards,
        createBoard,
        fetchBoards,
        lists,
        createList,
        getLists,
        updateList,
        deleteList,
        tasks,
        createTask,
        getTasks,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
