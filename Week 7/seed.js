const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Import User model
const Todo = require('./models/Todo'); // Import Todo model

// Seed function
const seedDatabase = async () => {
    // Check if there are already users in the database
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
        console.log('Database already seeded, skipping seed.');
        return; // Skip seeding if users already exist
    }

    await User.deleteMany({});
    await Todo.deleteMany({});

    const users = [
        { username: 'user1', password: await bcrypt.hash('password1', 5) },
        { username: 'user2', password: await bcrypt.hash('password2', 5) },
    ];

    const createdUsers = await User.insertMany(users);

    const tasks = [];
    const sampleTasks = ['Buy groceries', 'Walk the dog', 'Finish homework', 'Read a book', 'Clean the house'];

    createdUsers.forEach(user => {
        sampleTasks.forEach(task => {
            tasks.push({ task, userId: user._id });
        });
    });

    await Todo.insertMany(tasks);
    console.log('Database seeded with initial data');
};

module.exports = seedDatabase;
