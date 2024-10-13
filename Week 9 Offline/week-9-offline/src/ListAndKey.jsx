import { useState } from "react";

function App() {
    const initialTodos = [
        {
            title: "Go to gym",
            done: false
        },
        {
            title: "Eat food",
            done: true
        }
    ];

    const [todos, setTodo] = useState(initialTodos);
    const [loading, setLoading] = useState(false);

    function addTodo() {
        setLoading(true);
        const randomId = Math.floor(Math.random() * 5) + 1;

        console.log(randomId);

        fetch(`https://jsonplaceholder.typicode.com/todos/${randomId}`)
            .then(response => response.json())
            .then(data => {
                const newTodo = {
                    title: data.title,
                    done: data.completed
                };
                setTodo((prevTodos) => [...prevTodos, newTodo]);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching todo:", error);
                setLoading(false);
            });
    }

    const todosComponents = todos.map((todo, index) => (
        <Todo key={index} title={todo.title} done={todo.done} />
    ));

    return (
        <div>
            {todosComponents}
            <button onClick={addTodo}>Add A Demo Todo</button>
        </div>
    );
}

function Todo({ title, done, loading }) {
    return (
        <div>
            {loading ? "Loading.." : `${title} - ${done ? "Done!" : "Not Done!"}`}
        </div>
    );
}

export default App;
