import React, { useState, useEffect } from "react";
import useFetchTodos from "../../hooks/useFetchTodos";
import useTodo from "../../hooks/useTodo";
import TodoModal from "../../components/TodoModal";
import { ThreeDots } from 'react-loader-spinner';
import {
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt,
} from "react-icons/fa";

const TodosHome: React.FC = () => {
  const { todos: initialTodos, loading, error, fetchTodos } = useFetchTodos(); // Add fetchTodos function from hook
  const [todos, setTodos] = useState(initialTodos || []);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { todo, fetchTodoById, deleteTodoById } = useTodo();

  useEffect(() => {
    if (initialTodos) {
      setTodos(initialTodos);
    }
  }, [initialTodos]);

  const handleTodoClick = async (id: number) => {
    await fetchTodoById(id); // Fetch todo details
    setIsModalOpen(true); // Open modal
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodoById(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleRefresh = async () => {
    try {
      await fetchTodos(); // Trigger a re-fetch of todos
    } catch (error) {
      console.error("Failed to refresh todos:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="flex flex-col items-center p-8 rounded shadow-md">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="white"
            ariaLabel="three-dots-loading"
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="p-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            {error}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen pt-16">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your's ToDo's</h2>
          <button
            className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleRefresh}
          >
            <FaSyncAlt className="mr-2"/>
            Refresh
          </button>
        </div>

        <ul className="space-y-4">
          {todos.length === 0 ? (
            <p className="text-center text-gray-600">No todos available</p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo.id}
                className="p-4 bg-gray-100 rounded shadow flex items-center justify-between cursor-pointer hover:bg-gray-200"
                onClick={() => handleTodoClick(todo.id)}
              >
                {/* Task Details */}
                <div>
                  <h3 className="text-2xl font-semibold text-black">
                    {todo.title}
                  </h3>
                  <p className="text-md text-gray-600 truncate">
                    {todo.description.length > 50
                      ? `${todo.description.substring(0, 50)}...`
                      : todo.description}
                  </p>

                  <p className="text-sm text-gray-400">
                    Created on:{" "}
                    {new Date(todo.created_date).toLocaleDateString()}
                  </p>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center space-x-4">
                  <span
                    className={`${
                      todo.done ? "text-green-500" : "text-red-500"
                    } flex items-center bg-zinc-900 p-1 w-40 text-xs font-semibold rounded hover:bg-indigo-200`}
                  >
                    {todo.done ? (
                      <FaCheckCircle className="mr-1" />
                    ) : (
                      <FaTimesCircle className="mr-1" />
                    )}
                    {todo.done ? "Completed" : "Not Completed"}
                  </span>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering onClick for the list item
                      handleDelete(todo.id);
                    }}
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && todo && (
        <TodoModal
          todo={todo}
          onClose={() => setIsModalOpen(false)}
          onDelete={() => handleDelete(todo.id)}
        />
      )}
    </div>
  );
};

export default TodosHome;
