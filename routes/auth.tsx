const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
// Temporary test route
router.get('/test', (req, res) => {
    res.send('Auth route is working');
});
// Register Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({ msg: 'User already exists' });
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Save user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ msg: 'User registered' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: 'Invalid credentials' });
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: 'Invalid credentials' });
        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
export {};
//# sourceMappingURL=auth.js.map