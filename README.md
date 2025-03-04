# 📜  Kanban board

This project is a **Kanban board** with a **ReactJS frontend** and a **Node.js + Express + MongoDB backend**. Below are the setup instructions for each part.

---

## 📌 Table of Contents
1. [Backend Setup](#-backend-setup-nodejs--express--mongodb)
2. [Frontend Setup](#-frontend-setup-reactjs--materialui)

---

## 🛠️ Project Structure

```
/Kanban-Board-Application
│
├── /client                         # Frontend (React)
│   ├── /public
│   ├── /src
│   │   ├── /components             # Reusable components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Board.jsx
│   │   │   ├── List.jsx
│   │   │   ├── Task.jsx
│   │   │   ├── Registration.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Validation.jsx
│   │   ├── /context                # Context API for global state management
│   │   │   ├── ApiContext.js
│   │   ├── /Routes                  # Routes
│   │   │   ├── AppRoutes.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── package.json
│
├── /server                         # Backend (Node.js + Express)
│   ├── /src
|   ├── dotenv.js
│   │   ├── /database               # Database connection
│   │   │   ├── db.js
│   │   ├── /models                 # Mongoose models
│   │   │   ├── BoardModel.js
│   │   │   ├── ListModel.js
│   │   │   ├── TaskModel.js
│   │   │   ├── UserModel.js
│   │   ├── /controllers            # Mongoose controllers
│   │   │   ├── BoardController.js
│   │   │   ├── ListController.js
│   │   │   ├── TaskController.js
│   │   │   ├── UserController.js
│   │   ├── /routes                 # API routes
│   │   ├── homeRoutes.js
│   │   ├── boardRoutes.js
│   │   ├── listRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── userRoutes.js
│   │   ├── index.js                # Main server entry
│   ├── package.json
│
└── README.md                       # Project documentation

```

## 📋 API Endpoints

### Board APIs

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/api/boards`    | Create a new board     |
| GET    | `/api/boards`    | Get boards             |

### List APIs

| Method | Endpoint                 | Description                  |
| ------ | ------------------------ | ----------------------       |
| POST   | `/api/lists`             | Create a list inside a board |
| GET    | `/api/lists/:boardId`    | Get all lists of a board     |
| PUT    | `/api/lists/:id`         | Update list title            |
| DELETE | `/api/lists/:id`         | Delete list (and its tasks)  |


### Task APIs

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| POST   | `/api/tasks`          | Create a task inside a list|
| GET    | `/api/tasks/:listId`  | Get all tasks of a list    |
| PUT    | `/api/tasks/:id`      | Update task details        |
| DELETE | `/api/tasks/:id`      | Delete a task              |

---

## 🚀 Backend Setup (Node.js + Express + MongoDB)

### **1️⃣ Install Dependencies**
Navigate to the `server` directory and install required dependencies:

```
cd server
npm install
```

### **2️⃣ Setup Environment Variables**
Create a .env file inside the server directory and add the following:
```
PORT=any_port_number
MONGO_URI=your_mongodb_connection_url
SECRET_KEY=your_secret_key 
```

### **3️⃣ Start the Backend Server**
```
npm start
```

## 🎨 Frontend Setup (ReactJS)

### **1️⃣ Install Dependencies**
Navigate to the `client` directory and install dependencies:
```
cd client
npm install
```

### **2️⃣ Setup Environment Variables**
Create a .env file inside the client directory and add the following:
```
VITE_SERVER_URL=backend_server_url
```

### **3️⃣ Start the Frontend**
```
npm run dev
```
