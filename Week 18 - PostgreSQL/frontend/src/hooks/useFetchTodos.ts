import axios from "axios";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  done: boolean;
  created_date: string;
  user_id: number;
}

const useFetchTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    const token = sessionStorage.getItem("authToken");

    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true); // Show loading state during fetch
      const response = await axios.get("http://localhost:3000/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
      setLoading(false); // Hide loading state
      setError(null); // Clear previous errors
    } catch (err) {
      setError("Failed to fetch todos.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(); // Initial fetch on mount
  }, []);

  return { todos, loading, error, fetchTodos }; // Expose fetchTodos
};

export default useFetchTodos;
