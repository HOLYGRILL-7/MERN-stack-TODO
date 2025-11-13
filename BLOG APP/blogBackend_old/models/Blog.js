const mongoose = require('mongoose')
//mongoose is a library(tool) by which the js talks to my backend

// the schema, more like a blueprint
const blogSchema = new mongoose.Schema({ //this creates a new instance of the Schema which is a class of mongoose
    //it takes an object btw
    title: String,
    content: String,
    author: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
}); 
