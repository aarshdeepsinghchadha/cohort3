const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Course = require('../models/Course');
const jwt = require('jsonwebtoken');
const { authenticateAdmin } = require('../middleware/auth');
const { z } = require('zod');

// Define validation schemas using Zod
const adminSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

const courseSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" })
});

// Admin Signup
router.post('/signup', async (req, res) => {
    try {
        const validatedAdmin = adminSchema.parse(req.body); // Validate request body
        
        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ username: validatedAdmin.username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const newAdmin = new Admin(validatedAdmin);
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: err.errors[0].message }); // Handle validation error
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin Login
router.post('/login', async (req, res) => {
    try {
        const validatedAdmin = adminSchema.parse(req.body); // Validate request body
        const admin = await Admin.findOne({ username: validatedAdmin.username, password: validatedAdmin.password });
        if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: err.errors[0].message });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Protecting routes below with authentication middleware
router.use(authenticateAdmin);

// View All Courses (Admin)
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find(); // Fetch all courses
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a Course
router.post('/course', async (req, res) => {
    try {
        const validatedCourse = courseSchema.parse(req.body); // Validate course data

        // Check if a course with the same title already exists
        const existingCourse = await Course.findOne({ title: validatedCourse.title });
        if (existingCourse) {
            return res.status(400).json({ message: 'Course with this title already exists' });
        }

        // Create and save the new course with adminId
        const newCourse = new Course({
            ...validatedCourse,
            adminId: req.user.id // Use the authenticated admin's ID from the token
        });
        await newCourse.save();

        res.status(201).json({ message: 'Course created successfully' });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: err.errors[0].message }); // Handle validation error
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Edit a Course
router.put('/course/:id', async (req, res) => {
    try {
        const validatedCourse = courseSchema.parse(req.body); // Validate course data
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the authenticated admin is the one who created the course
        if (course.adminId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to edit this course' });
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            validatedCourse,
            { new: true } // Return the updated document
        );

        res.json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: err.errors[0].message });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a Course
router.delete('/course/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if the authenticated admin is the one who created the course
        if (course.adminId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to delete this course' });
        }

        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
