const express = require('express');
const cors = require('cors')

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

app.get("/api/task/:name", (req, res) => {
    const taskName = req.params.name
    res.json({name: taskName, details: "Just Mock details", status: "in progress"})
})

app.post("/api/task", (req, res) => {
    const task = req.body
    if (!task.name){
        res.status(400).json({message: "name property required"})
    }
    console.log(`Endpoint hit ${task.name}`)
    res.json({success: true, message: `Task ${task.name} has been added to db`})
})





app.listen(3000, () => {
    console.log("The server is running")
}
)
