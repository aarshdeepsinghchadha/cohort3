const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const { z, ZodError } = require('zod');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Import uuid for unique IDs
const app = express();

app.use(express.json());
app.use(cors());

const usersFilePath = path.join(__dirname, 'users.json');
const todosFilePath = path.join(__dirname, 'todos.json');
const secretKey = 'i_am_your_key';

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

        req.user = decoded;
        next();
    });
}

fs.ensureFileSync(usersFilePath);
fs.ensureFileSync(todosFilePath);

async function loadUsers() {
    try {
        const data = await fs.readFile(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

async function saveUsers(users) {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

async function loadTodos() {
    try {
        const data = await fs.readFile(todosFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
}

async function saveTodos(todos) {
    console.log("Saving todos:", todos); // Log for debugging
    await fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2));
}

// Define Zod schemas for request validation
const signupSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

const signinSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

app.post("/signup", async (req, res) => {
    try {
        const parsedData = signupSchema.parse(req.body);
        const { username, password } = parsedData;

        const users = await loadUsers();

        if (users.find(user => user.username === username)) {
            return res.status(400).send({ message: "User already exists" });
        }

        users.push({ username, password });
        await saveUsers(users);

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

        const users = await loadUsers();

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // Generate JWT token
            const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
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
    const { username } = req.user;

    const users = await loadUsers();
    const user = users.find(user => user.username === username);

    if (user) {
        res.send({ username: user.username });
    } else {
        res.status(401).send({ message: "Unauthorized" });
    }
});

// To-Do routes
app.get("/todos", auth, async (req, res) => {
    const { username } = req.user;

    const todos = await loadTodos();
    res.set('Cache-Control', 'no-store'); // Disable caching
    res.send(todos[username] || []);
});

app.post("/todos", auth, async (req, res) => {
    const { username } = req.user;
    const { task } = req.body;

    if (!task) {
        return res.status(400).send({ message: "Task is required" });
    }

    const todos = await loadTodos();
    if (!todos[username]) {
        todos[username] = [];
    }

    todos[username].push({ id: uuidv4(), task, done: false }); // Add unique ID
    await saveTodos(todos);

    res.send({ message: "Task added" });
});

app.put("/todos/:id", auth, async (req, res) => {
    const { username } = req.user;
    const { id } = req.params;
    const { task, done } = req.body;

    const todos = await loadTodos();
    const userTodos = todos[username] || [];

    const todoIndex = userTodos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
        return res.status(400).send({ message: "Invalid task ID" });
    }

    if (task !== undefined) {
        userTodos[todoIndex].task = task;
    }
    if (done !== undefined) {
        userTodos[todoIndex].done = done;
    }

    todos[username] = userTodos;
    await saveTodos(todos);

    res.send({ message: "Task updated" });
});

app.delete("/todos/:id", auth, async (req, res) => {
    const { username } = req.user;
    const { id } = req.params;

    const todos = await loadTodos();
    const userTodos = todos[username] || [];

    const todoIndex = userTodos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
        return res.status(400).send({ message: "Invalid task ID" });
    }

    userTodos.splice(todoIndex, 1);
    todos[username] = userTodos;
    await saveTodos(todos);

    res.send({ message: "Task deleted" });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
