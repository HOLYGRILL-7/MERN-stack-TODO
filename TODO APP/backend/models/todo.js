const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, //todo must have a title
    trim: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Todo = mongoose.model('Todo', todoSchema); //the first argument of mongoose.mode('', schema) should be a string

module.exports = Todo;
