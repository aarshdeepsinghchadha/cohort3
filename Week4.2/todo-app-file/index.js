const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const filePath = './todos.json';

function readTodosFromFile() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }
    return [];
}

function writeTodosToFile(todos) {
    fs.writeFileSync(filePath, JSON.stringify(todos, null , 2));
}

app.get('/todos', (req, res) => {
    const todos = readTodosFromFile();
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const {title} = req.body;
    if(!title) {
        return res.status(400).JSON({error: 'Title is required' });
    }

    const todos = readTodosFromFile();
    const newTodo = {id:todos.length + 1, title, completed : false};
    todos.push(newTodo);
    writeTodosToFile(todos);
    res.status(201).json(newTodo);
});

app.put('/todos/:id', (req,res) => {
    const {id} = req.params;
    //console.log('the id when put is ', id);
    const {title, completed} = req.body;

    let todos = readTodosFromFile();
    //console.log('the list of todos in put', todos);
    const todo = todos.find(x=>x.id == id );
    //console.log('the list of todo in put', todo);
    if(!todo) {
        return res.status(404).json({error: 'Todo not found'});
    }

    if(title !== undefined) todo.title = title;
    if(completed !== undefined) todo.completed = completed;

    writeTodosToFile(todos);
    res.json(todo);
});

app.delete('/todos/:id', (req,res) => {
    const {id} = req.params;

    let todos = readTodosFromFile();
    todos = todos.filter(x=>x.id != id);
    writeTodosToFile(todos);
    res.status(200).json({message : 'Todo is deleted!'});
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
