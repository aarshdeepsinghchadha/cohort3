import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import contentRoutes from "./routes/content";
import shareRoutes from "./routes/share";
import { connectDB } from "./config";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", contentRoutes);
app.use("", shareRoutes);

connectDB(process.env.MONGODB_URI || "mongodb://localhost:27017/brainly")
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error("Failed to start server:", err));
