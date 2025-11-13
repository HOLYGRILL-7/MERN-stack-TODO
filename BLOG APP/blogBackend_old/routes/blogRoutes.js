const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

//Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find(); //Fetch all blogs
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//create a new blog using Post
router.post('/', async (req, res) => {
  const { title, content, author } = req.body;
  const blog = new Blog({
    title,
    content,
    author,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update blog post
router.put('/:id', async (req, res) => {
  try {
    //Extract data from request body
    const { title, content, author } = req.body;

    //find the blog by id and update
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true, runValidators: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete blog post
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.messsage });
  }
});

module.exports = router;
