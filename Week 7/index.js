const express = require('express');
const { z, ZodError } = require('zod');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import User model
const Todo = require('./models/Todo'); // Import Todo model
const seedDatabase = require('./seed');

const app = express();

app.use(express.json());
app.use(cors());

const secretKey = 'i_am_your_key';

const mongoUri = 'mongodb://localhost:27017/todoApp';

// Middleware to verify JWT token
function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        req.user = decoded; // decoded will now include userId
        next();
    });
}

// Define Zod schemas for request validation
const signupSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signinSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

app.post("/signup", async (req, res) => {
    try {
        const parsedData = signupSchema.parse(req.body);
        const { username, password } = parsedData;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }

        const user = new User({ username, password });
        await user.save();

        res.send({ message: "You have signed up" });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).send({ errors: error.errors });
        }
        res.status(500).send({ message: "Internal server error" });
    }
});

app.post("/signin", async (req, res) => {
    try {
        const parsedData = signinSchema.parse(req.body);
        const { username, password } = parsedData;

        const user = await User.findOne({ username, password });

        if (user) {
            // Include the user's _id in the JWT payload
            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
            res.send({ token });
        } else {
            res.status(403).send({ message: "Invalid username or password" });
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).send({ errors: error.errors });
        }
        res.status(500).send({ message: "Internal server error" });
    }
});

app.get("/me", auth, async (req, res) => {
    const { userId } = req.user;

    const user = await User.findById(userId);

    if (user) {
        res.send({ username: user.username });
    } else {
        res.status(401).send({ message: "Unauthorized" });
    }
});

// To-Do routes
app.get("/todos", auth, async (req, res) => {
    const { userId } = req.user;

    const todos = await Todo.find({ userId });
    res.set('Cache-Control', 'no-store'); // Disable caching
    res.send(todos);
});

app.post("/todos", auth, async (req, res) => {
    const { userId } = req.user;
    const { task } = req.body;

    if (!task) {
        return res.status(400).send({ message: "Task is required" });
    }

    const todo = new Todo({
        userId,
        task,
        done: false,
    });

    await todo.save();

    res.send({ message: "Task added" });
});

app.put("/todos/:id", auth, async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;
    const { task, done } = req.body;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
        return res.status(400).send({ message: "Invalid task ID" });
    }

    if (task !== undefined) todo.task = task;
    if (done !== undefined) todo.done = done;

    await todo.save();

    res.send({ message: "Task updated" });
});

app.delete("/todos/:id", auth, async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
        return res.status(400).send({ message: "Invalid task ID" });
    }

    await Todo.deleteOne({ _id: id, userId });

    res.send({ message: "Task deleted" });
});

// Initialize MongoDB connection using Mongoose
async function connectToMongo() {
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

// Start MongoDB connection and server
const startServer = async () => {
    await connectToMongo();
    await seedDatabase(); // Call the seedDatabase function
    app.listen(3000, () => {
        console.log(`Server is running on port : 3000`);
    });
};

startServer().catch(err => {
    console.error("Error starting the server:", err);
});