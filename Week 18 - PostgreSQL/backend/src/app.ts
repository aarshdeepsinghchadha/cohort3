import express from "express";
import cors from "cors"; 
import authRoutes from "./routes/auth.routes";
import todosRoutes from "./routes/todos.routes";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", 
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", todosRoutes);

export default app;
