const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 8000;

const app = express();

//Middleware
app.use(cors()); //enables frontend to safely talk to the backend
app.use(express.json()); //helps to read json from requests

//connect to MongoDB,  //mongodb lives on port 27017 by default
mongoose
  .connect("mongodb+srv://bismarkjonesoduro_db_user:qx6vl41yWPp8npAu@todo-list.7bb5wra.mongodb.net/?appName=Todo-list", {
    useNewUrlParser: true, //tells mongoose to use modern protocols
    useUnifiedTopology: true, //tells mongoose to use modern protocols
  })
  .then(() => console.log("MongoDB Connection succeeded"))
  .catch((err) => console.log("MongoDB connection error occured: ", err));

//routes
app.get("/", (req, res) => {
  res.send("Todo API is running...");
});

const todoRoutes = require("./routes/todoRoutes");
app.use("/todos", todoRoutes);

app.listen(8000, () => {
  console.log(`Server is running on port ${PORT}`);
});
