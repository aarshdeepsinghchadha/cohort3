import express from "express";
import authRoutes from "./routes/auth.routes";
import todosRoutes from "./routes/todos.routes";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todos", todosRoutes);

export default app;
