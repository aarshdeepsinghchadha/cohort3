require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const courseRoutes = require('./routes/course'); // Import course routes
const { authenticateAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware for routes
app.use('/user', userRoutes); // All user-related routes, including /purchases
app.use('/admin', adminRoutes); // No authentication required for signup and login
app.use('/admin', authenticateAdmin, adminRoutes); // Protect admin routes after signup/login
app.use('/courses', courseRoutes); // Use course routes

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));
