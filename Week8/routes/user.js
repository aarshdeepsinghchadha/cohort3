const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const Purchase = require('../models/Purchase'); 
const jwt = require('jsonwebtoken');
const { authenticateUser } = require('../middleware/auth');
const { z } = require('zod');

// Define validation schemas using Zod
const userSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

// User Sign up
router.post('/signup', async (req, res) => {
    try {
        const validatedUser = userSchema.parse(req.body); // Validate request body
        
        // Check if the user already exists
        const existingUser = await User.findOne({ username: validatedUser.username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User(validatedUser);
        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: err.errors[0].message }); // Handle validation error
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// User Sign in
router.post('/login', async (req, res) => {
    try {
        const validatedUser = userSchema.parse(req.body); // Validate request body
        const user = await User.findOne({ username: validatedUser.username, password: validatedUser.password });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: err.errors[0].message });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Purchase a Course
router.post('/purchase', authenticateUser, async (req, res) => { // Use authenticateUser here
    try {
        const course = await Course.findById(req.body.courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the user has already purchased the course
        const existingPurchase = await Purchase.findOne({ userId: req.user.id, courseId: course._id });
        if (existingPurchase) {
            return res.status(400).json({ message: 'You have already purchased this course' });
        }

        const newPurchase = new Purchase({ userId: req.user.id, courseId: course._id });
        await newPurchase.save();
        res.status(201).json({ message: 'Course purchased successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating purchase' });
    }
});


// View Purchased Courses
router.get('/purchases', authenticateUser, async (req, res) => {
    try {
        // Fetch all purchases made by the authenticated user
        const purchases = await Purchase.find({ userId: req.user.id }).populate('courseId');
        
        if (!purchases || purchases.length === 0) {
            return res.status(404).json({ message: 'No purchases found for this user' });
        }

        res.json(purchases); // Return the list of purchases
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
