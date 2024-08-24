const fs = require("fs-extra");
const path = require("path");
const { Command } = require("commander");
const program = new Command();

const todosFilePath = path.join(__dirname, "todos.json");

// Helper function to read todos from file
const readTodos = () => {
  if (fs.existsSync(todosFilePath)) {
    return fs.readJSONSync(todosFilePath);
  }
  return [];
};

// Helper function to write todos to file
const writeTodos = (todos) => {
  fs.writeJSONSync(todosFilePath, todos, { spaces: 2 });
};

// Add a new todo
program
  .command("add <task>")
  .description("Add a new todo")
  .action((task) => {
    const todos = readTodos();
    const newTodo = {
      id: Date.now(),
      task,
      done: false,
    };
    todos.push(newTodo);
    writeTodos(todos);
    console.log(`Added todo: "${task}"`);
  });

// Delete a todo by ID
program
  .command("delete <id>")
  .description("Delete a todo by ID")
  .action((id) => {
    const todos = readTodos();
    const updatedTodos = todos.filter((todo) => todo.id !== parseInt(id, 10));
    writeTodos(updatedTodos);
    console.log(`Deleted todo with ID: ${id}`);
  });

// Mark a todo as done
program
  .command("done <id>")
  .description("Mark a todo as done by ID")
  .action((id) => {
    const todos = readTodos();
    const todo = todos.find((todo) => todo.id === parseInt(id, 10));
    if (todo) {
      todo.done = true;
      writeTodos(todos);
      console.log(`Marked todo with ID: ${id} as done`);
    } else {
      console.log(`Todo with ID: ${id} not found`);
    }
  });

// Display all todos
program
  .command("list")
  .description("List all todos")
  .action(() => {
    const todos = readTodos();
    if (todos.length === 0) {
      console.log("No todos found");
    } else {
      todos.forEach((todo) => {
        console.log(`[${todo.done ? "x" : " "}] ${todo.id}: ${todo.task}`);
      });
    }
  });

program.on('help', () => {
    console.log('\nExamples:');
    console.log('  $ node index.js add "Buy groceries"');
    console.log('  $ node index.js delete 1638398123456');
    console.log('  $ node index.js done 1638398123456');
    console.log('  $ node index.js list');
  });
  
program.parse();
