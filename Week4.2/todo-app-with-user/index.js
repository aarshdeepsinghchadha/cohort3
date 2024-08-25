const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const usersFilePath = './data/users.json';
const todosFilePath = './data/todos.json';

app.use(bodyParser.json());

const readJson = (filepath) => {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
};

const writeJson = (filepath, data) => {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
};

// user routes for register

app.post('/user/register', (req,res) => {
    const {username} = req.body;

    if(!username) {
        return res.status(400).json({message : 'username cannot be null'});
    }

    const users = readJson(usersFilePath);

    if(users[username]) {
        return res.status(409).json({message : 'user already exist with the same username'});
    }

    users[username] = {todos : []};
    writeJson(usersFilePath, users);

    res.status(201).json({message : 'User registered successfully!'});
});


//Todo routes

app.post('/todos/create', (req, res) => {
    const {username, task} = req.body;

    if(!username || !task) {
        return res.status(400).json({message: 'username or task cannot be null'});
    }

    const users = readJson(usersFilePath);
    const todos = readJson(todosFilePath);

    if (!users[username]) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    const todo = {
        id: Date.now(),
        task,
        completed: false
    };

    todos.push({...todo, username});
    users[username].todos.push(todo.id);

    writeJson(todosFilePath, todos);
    writeJson(usersFilePath, users);

    res.status(201).json({ message: 'To-do created successfully', todo });
});


app.get('/todos/:username', (req,res) => {
    const { username } = req.params;

    const users = readJson(usersFilePath);
    const todos = readJson(todosFilePath);

    if (!users[username]) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    const userTodo = todos.filter(x=>x.username == username);

    res.status(200).json(userTodo);
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;

    const todos = readJson(todosFilePath);

    const todo = todos.find(todo => todo.id === parseInt(id));

    if (!todo) {
        return res.status(404).json({ message: 'To-do not found' });
    }

    if (task !== undefined) todo.task = task;
    if (completed !== undefined) todo.completed = completed;

    writeJson(todosFilePath, todos);

    res.status(200).json({ message: 'To-do updated successfully', todo });
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;

    let todos = readJson(todosFilePath);

    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'To-do not found' });
    }

    const [deletedTodo] = todos.splice(todoIndex, 1);
    const users = readJson(usersFilePath);
    users[deletedTodo.username].todos = users[deletedTodo.username].todos.filter(todoId => todoId !== parseInt(id));

    writeJson(todosFilePath, todos);
    writeJson(usersFilePath, users);

    res.status(200).json({ message: 'To-do deleted successfully' });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});