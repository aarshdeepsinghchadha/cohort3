import { useState } from "react";
import axios from "axios";

const useTodo = () => {
  const [todo, setTodo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const token = sessionStorage.getItem("authToken");

  if (!token) {
    throw new Error("Token not found. User is not authenticated.");
  }

  const fetchTodoById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodo(response.data); // This updates `todo` asynchronously
    } catch (err) {
      setError("Failed to fetch todo details");
    } finally {
      setLoading(false);
    }
  };

  const deleteTodoById = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodo(null);
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  const createTodo = async (newTodo: { title: string; description: string; done: boolean }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:3000/todos", newTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data; // Return the created todo to handle it outside
    } catch (err) {
      setError("Failed to create todo");
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id: number, updatedTodo: { title: string; description: string; done: boolean }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`http://localhost:3000/todos/${id}`, updatedTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTodo(response.data); // Update the local state with the updated todo
      return response.data;
    } catch (err) {
      setError("Failed to update todo");
    } finally {
      setLoading(false);
    }
  };

  return {
    todo,
    loading,
    error,
    fetchTodoById,
    deleteTodoById,
    createTodo,
    updateTodo,
  };
};

export default useTodo;
