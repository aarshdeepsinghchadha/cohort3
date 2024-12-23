import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const client = new PrismaClient();
const app = express();

async function createUser() {
  await client.user.create({
    data: {
      username: "aarshdeep",
      password: "password",
      age: 23,
      city: "ABD",
    },
  });
}

async function createTodo() {
    await client.todos.create({
        data: {
            title: "Learn Prisma",
            description: "Learn Prisma",
            userId: 1,
            done: false
        }
    });
}


async function getUser() {
    const user = await client.user.findFirst({
        where:{
            id: 1
        },
        include: {
            todos: true
        }
    })
    console.log(user);
}


app.get("/users", async (req: Request, res: Response) => {
    const users = await client.user.findMany();
    res.json({users});
})

app.get("/todos/:id", async(req: Request, res:Response) => {
    const id = req.params.id as unknown as number;
    const users = await client.user.findFirst({
        where:{
            id: Number(id),
        },
        select:{
            todos: true
        }
    });

    res.json({users});
})

app.listen(3000);

// getUser();
