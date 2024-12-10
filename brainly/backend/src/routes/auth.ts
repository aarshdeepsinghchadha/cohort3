import dotenv from "dotenv";
import express, { NextFunction } from "express";
import { Express, Request, Response } from "express";
import { signInSchema, signUpSchema } from "../utils/validate";
import { User } from "../models/User";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";

dotenv.config();
const app: Express = express();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

app.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password } = signUpSchema.parse(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : error });
  }
});

app.post("/signIn", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = signInSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword)
      return res.status(401).json({ error: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : error });
  }
});

export default app;
