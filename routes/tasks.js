const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Temporary test route
router.get('/test', (req, res) => {
  res.send('Tasks route is working');
});

// Get tasks for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create a new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = new Task({ title, description, status, user: req.user });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ msg: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!deletedTask) return res.status(404).json({ msg: 'Task not found' });
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
