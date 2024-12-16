import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  createTodoHandler,
  getTodoByIdHandler,
  getAllTodosHandler,
  deleteTodoHandler,
  editTodoHandler
} from "../controllers/todos.controller";

const router = express.Router();

router.post("/", authenticate, createTodoHandler);
router.put("/:id", authenticate, editTodoHandler); 
router.get("/:id", authenticate, getTodoByIdHandler); 
router.get("/", authenticate, getAllTodosHandler);
router.delete("/:id", authenticate, deleteTodoHandler); 

export default router;
