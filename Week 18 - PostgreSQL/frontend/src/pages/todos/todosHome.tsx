import React, { useState, useEffect } from "react";
import useFetchTodos from "../../hooks/useFetchTodos";
import useTodo from "../../hooks/useTodo";
import { ThreeDots } from "react-loader-spinner";
import {
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt,
  FaPlus,
} from "react-icons/fa";
import TodoModal from "../../components/todoModal";

const TodosHome: React.FC = () => {
  const { todos: initialTodos, loading, error, fetchTodos } = useFetchTodos();
  const [todos, setTodos] = useState(initialTodos || []);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentTodo, setCurrentTodo] = useState<any>(null);
  const { todo, fetchTodoById, deleteTodoById, createTodo, updateTodo } = useTodo();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (initialTodos) {
      setTodos(initialTodos);
    }
  }, [initialTodos]);

  const handleTodoClick = async (id: number) => {
    await fetchTodoById(id);
  };

  useEffect(() => {
    if (todo) {
      setModalMode("edit");
      setCurrentTodo(todo);
      setIsModalOpen(true);
    }
  }, [todo]);

  const handleCreateClick = () => {
    setModalMode("create");
    setCurrentTodo(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteTodoById(id);
      await fetchTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      if (modalMode === "create") {
        await createTodo(data);
      } else if (modalMode === "edit") {
        await updateTodo(currentTodo.id, data);
      }
      await fetchTodos();
      setIsModalOpen(false);
      setCurrentTodo(null);
    } catch (error) {
      console.error("Failed to save todo:", error);
    }
  };

  const handleRefresh = async () => {
    try {
      await fetchTodos();
    } catch (error) {
      console.error("Failed to refresh todos:", error);
    }
  };

  if (loading || isDeleting) {
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
    <div className="min-h-screen pt-16 pb-4 md:pb-6  ">
      <div className="mx-auto max-w-4xl p-4 md:p-6  rounded shadow-md">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-xl sm:text-lg font-bold text-white truncate">
            Plan your Day :
          </h2>

          <div className="flex space-x-4">
            <button
              className="flex items-center px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 
              md:px-2 md:py-1 md:text-sm sm:px-1 sm:py-1 sm:text-xs"
              onClick={handleCreateClick}
            >
              <FaPlus className="mr-2 sm:mr-1" />
              <span className="hidden sm:inline">Create</span>
            </button>
            <button
              className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 
              md:px-2 md:py-1 md:text-sm sm:px-1 sm:py-1 sm:text-xs"
              onClick={handleRefresh}
            >
              <FaSyncAlt className="mr-2 sm:mr-1" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="overflow-y-auto max-h-[calc(100vh-6rem)]">
          <ul className="space-y-4">
            {todos.length === 0 ? (
              <p className="text-center text-gray-600">No todos available</p>
            ) : (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className="p-4 bg-gray-100 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
                  onClick={() => handleTodoClick(todo.id)}
                >
                  <div>
                    <h3 className="text-2xl font-semibold text-black">{todo.title}</h3>
                    <p className="text-md text-gray-600 truncate">
                      {todo.description.length > 50
                        ? `${todo.description.substring(0, 50)}...`
                        : todo.description}
                    </p>
                    <p className="text-sm text-gray-400">
                      Created on: {new Date(todo.created_date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                    <span
                      className={`${todo.done ? "text-green-500" : "text-red-500"
                        } flex items-center bg-zinc-900 p-2 w-full md:w-40 text-xs font-semibold rounded hover:bg-indigo-200`}
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
                        e.stopPropagation();
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
      </div>

      {/* Modal */}
      {isModalOpen && (
        <TodoModal
          todo={currentTodo}
          mode={modalMode}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentTodo(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );

};

export default TodosHome;
