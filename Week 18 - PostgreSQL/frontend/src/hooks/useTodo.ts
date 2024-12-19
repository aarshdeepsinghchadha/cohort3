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
      setTodo(response.data);
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

  return {
    todo,
    loading,
    error,
    fetchTodoById,
    deleteTodoById,
  };
};

export default useTodo;
