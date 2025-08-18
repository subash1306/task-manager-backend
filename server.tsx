// 1. Import packages
const express = require('express'); // Framework to build web APIs
const mongoose = require('mongoose'); // Library to interact with MongoDB
const cors = require('cors'); // Lets frontend and backend talk
require('dotenv').config(); // Loads .env variables into process.env
// 2. Create the express app
const app = express(); // Create an instance of the Express app
// 3. Middleware setup
app.use(cors()); // Allow cross-origin requests (from React)
app.use(express.json()); // Convert incoming JSON to JS objects
// 4. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// 5. Routes go here (to be added later)
app.get('/', (req, res) => {
    res.send('🚀 Backend is running!');
});
app.use('/api/auth', require('./routes/auth')); // Placeholder for auth routes
app.use('/api/tasks', require('./routes/tasks')); // Placeholder for task routes
// 6. Start the server
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});
export {};
//# sourceMappingURL=server.js.map