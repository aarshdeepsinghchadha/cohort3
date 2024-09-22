const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { z } = require('zod');

// Zod validation schema for searching by title
const searchSchema = z.object({
    title: z.string().min(1, { message: "Title is required" })
});

// Debounce function (waits for 300ms between calls)
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// View All Courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// See a Specific Course
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Search for a course by title with debounce
router.get('/search/title', debounce(async (req, res) => {
    try {
        const { title } = searchSchema.parse(req.query); // Validate the title query parameter
        const courses = await Course.find({ title: new RegExp(title, 'i') }); // Case-insensitive search
        if (courses.length === 0) {
            return res.status(404).json({ message: 'No courses found' });
        }
        res.json(courses);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.errors[0].message });
        }
        res.status(500).json({ message: 'Server error' });
    }
}, 300)); // 300ms debounce time

module.exports = router;
