const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()

//middleware
app.use(cors()); //allows the frontend to communicate with the backend
app.use(express.json()); //converts JSON requests to JS objects

//connect to mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blogDB")
.then(() => console.log("Connected to MongoDB") )
.catch(err => console.log("MongoDB connection error: ", err))

//route
app.get('/', (req, res) => {
    res.send('Blog API is running...')
});

const PORT = 8000;
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})