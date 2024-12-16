import { Request, Response } from "express";
import { pgClient } from "../utils/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const query = `
        INSERT INTO users (username, email, password)
        VALUES ($1,$2,$3)
        RETURNING id, username, email;
     `;

    const result = await pgClient.query(query, [username, email, password]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Signup Failed" });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  try {
    const query = `SELECT id, email FROM users WHERE email = $1 AND password = $2`;
    const result = await pgClient.query(query, [email, password]);

    if (result.rows.length === 0) {
      res.status(401).json({ error: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "SignIn Failed!" });
  }
};
