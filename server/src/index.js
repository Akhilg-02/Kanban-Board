require("dotenv").config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var cors = require('cors')
const connectDB = require('./config/db');




// Import routes 
const userRoutes = require("./routes/userRoutes");
const boardRoutes = require("./routes/boardRoutes");
const listRoutes =  require("./routes/listRoutes");
const taskRoutes = require("./routes/taskRoutes");
const homeRoutes = require("./routes/homeRoutes");




const app = express();
const PORT = process.env.PORT || 6000;


app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.json());




//Connect to DB before starting the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Routes
app.use("/", homeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/tasks", taskRoutes);

