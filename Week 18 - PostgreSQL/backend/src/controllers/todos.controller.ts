import { Request, Response } from "express";
import { findUserByEmail, findUserEmailByUserId, findUserIdByUserEmail } from "../models/user.model";
import {
  createTodo,
  findTodoById,
  deleteTodoById,
  findAllTodosByUserId,
  updateTodoById
} from "../models/todo.model";

// Create Todo
export const createTodoHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, done } = req.body;
  const userEmail = (req as any).user?.email;

  if (!title || !description) {
    res.status(400).json({ error: "Title and description are required" });
    return;
  }

  try {
    const user = await findUserByEmail(userEmail);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const newTodo = await createTodo(
      title,
      description,
      done || false,
      user.id
    );
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

// Get Todo by ID
export const getTodoByIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userEmail = (req as any).user.email;

  try {
    const todo = await findTodoById(Number(id));
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    const userId = (await findUserIdByUserEmail(userEmail))[0].id;

    if (userId !== todo.user_id) {
      res.status(403).json({ error: "Unauthorized to get this todo" });
      return;
    }

    res.status(200).json(todo);
  } catch (err) {
    console.error("Error fetching todo:", err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
};

// Get All Todos
export const getAllTodosHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userEmail = (req as any).user.email; 

  try {
    const userDetails = await findUserByEmail(userEmail);
    const todos = await findAllTodosByUserId(userDetails.id);
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// Delete Todo
export const deleteTodoHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userEmail = (req as any).user.email;

  try {
    const todo = await findTodoById(Number(id));
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    const userId = (await findUserIdByUserEmail(userEmail))[0].id;

    if (userId !== todo.user_id) {
      res.status(403).json({ error: "Unauthorized to delete this todo" });
      return;
    }

    await deleteTodoById(Number(id));
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};


// Edit Todo
export const editTodoHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, description, done } = req.body;
  const userEmail = (req as any).user.email;

  try {
    const todo = await findTodoById(Number(id));
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    const userId = (await findUserIdByUserEmail(userEmail))[0].id;

    if (userId !== todo.user_id) {
      res.status(403).json({ error: "Unauthorized to edit this todo" });
      return;
    }

    const updatedTodo = await updateTodoById(Number(id), {
      title,
      description,
      done,
    });

    res.status(200).json(updatedTodo);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ error: "Failed to update todo" });
  }
};
