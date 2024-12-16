import express, { Request, Response } from "express";
import { Client } from "pg";

const pgClient = new Client({
  connectionString: "",
});

const app = express();
app.use(express.json());

pgClient.connect();

const userInsertQuery = `
INSERT INTO users (username, email, password)
VALUES ($1, $2, $3)
RETURNING *;
`;

app.post("/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const values = [username, email, password];
    const result = await pgClient.query(userInsertQuery, values);

    res.status(201).json({
      message: "User signed up successfully",
    });
  } catch (ex) {
    console.error("Error inserting user:", ex);
    res.status(500).json({ error: "Failed to sign up user" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
