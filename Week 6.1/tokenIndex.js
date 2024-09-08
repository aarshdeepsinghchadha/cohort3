const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const { z, ZodError } = require("zod");
const app = express();

app.use(express.json());

const dataFilePath = path.join(__dirname, "users.json");

function generateToken() {
  const options =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += options.charAt(Math.floor(Math.random() * options.length));
  }
  return token;
}

fs.ensureFileSync(dataFilePath);

async function loadUsers() {
  try {
    const data = await fs.readFile(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

async function saveUsers(users) {
  await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2));
}

// Define Zod schemas for request validation
const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signinSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

app.post("/signup", async (req, res) => {
  try {
    const parsedData = signupSchema.parse(req.body);
    const { username, password } = parsedData;

    const users = await loadUsers();

    if (users.find((user) => user.username === username)) {
      return res.status(400).send({ message: "User already exists" });
    }

    users.push({ username, password });
    await saveUsers(users);

    res.send({ message: "You have signed up" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send({ errors: error.errors });
    }
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const parsedData = signinSchema.parse(req.body);
    const { username, password } = parsedData;

    const users = await loadUsers();

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      const token = generateToken();
      user.token = token;
      await saveUsers(users);
      res.send({ token });
      console.log(users);
    } else {
      res.status(403).send({ message: "Invalid username or password" });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send({ errors: error.errors });
    }
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/me", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const users = await loadUsers();
  const user = users.find((user) => user.token === token);

  if (user) {
    res.send({ username: user.username });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
