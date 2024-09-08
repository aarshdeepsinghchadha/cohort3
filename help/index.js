const fs = require('fs');
const readline = require('readline');
const { Command } = require('commander');

const todo_file = 'todo.json';

async function getChalk() {
    const chalk = (await import('chalk')).default;
    return chalk;
}

function loaddata() {
    if (!fs.existsSync(todo_file)) {
        return [];
    }
    const data = fs.readFileSync(todo_file, 'utf-8');
    return JSON.parse(data);
}

function savetodo(todo) {
    fs.writeFileSync(todo_file, JSON.stringify(todo, null, 2), 'utf-8');
}

async function addtodo(task) {
    const chalk = await getChalk();
    const todo = loaddata();
    todo.push({ task, done: false });
    savetodo(todo);
    console.log(chalk.green('Saved the todo'));
}

async function deleteTodo(index) {
    const chalk = await getChalk();
    const todos = loaddata();
    const numIndex = Number(index);
    if (numIndex > 0 && numIndex <= todos.length) {
        const removed = todos.splice(numIndex - 1, 1);
        savetodo(todos);
        console.log(chalk.yellow(`Deleted: ${removed[0].task}`));
    } else {
        console.log(chalk.red('Invalid todo number!'));
    }
}

async function markToDoDone(index) {
    const chalk = await getChalk();
    const todos = loaddata();
    const numIndex = Number(index);
    if (numIndex > 0 && numIndex <= todos.length) {
        todos[numIndex - 1].done = true;
        savetodo(todos);
        console.log(chalk.green(`Marked todo as done: ${todos[numIndex - 1].task}`));
    } else {
        console.log(chalk.red('Invalid todo number!'));
    }
}

async function displayTodos() {
    const chalk = await getChalk();
    const todos = loaddata();
    if (todos.length === 0) {
        console.log(chalk.blue('No todos yet!'));
    } else {
        todos.forEach((todo, index) => {
            const status = todo.done ? chalk.green('✔') : chalk.red('✘');
            console.log(`${index + 1}. [${status}] ${todo.task}`);
        });
    }
}

const program = new Command();

program.command('list')
    .description('List all todos')
    .action(async () => {
        await displayTodos();
    });

program.command('add <task>')
    .description('Add a todo')
    .action(async (task) => {
        await addtodo(task);
    });

program.command('delete <index>')
    .description('Delete a todo by index')
    .action(async (index) => {
        await deleteTodo(index);
    });

program.command('done <index>')
    .description('Mark a todo as done by index')
    .action(async (index) => {
        await markToDoDone(index);
    });

program.parse(process.argv);
