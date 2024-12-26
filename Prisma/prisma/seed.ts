import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function createDummyUsers() {
    const dummyUsers = [
        {
            username: "john_doe",
            password: "password123",
            age: 30,
            city: "New York",
            todos: [
                {
                    title: "Buy groceries",
                    description: "Milk, Bread, Cheese",
                    done: false,
                },
                {
                    title: "Attend meeting",
                    description: "Zoom call with the team at 3 PM",
                    done: false,
                },
            ],
        },
        {
            username: "jane_smith",
            password: "securepass",
            age: 25,
            city: "Los Angeles",
            todos: [
                {
                    title: "Gym workout",
                    description: "Leg day exercises",
                    done: true,
                },
                {
                    title: "Read book",
                    description: "Finish reading 'Atomic Habits'",
                    done: false,
                },
            ],
        },
    ];

    for (const user of dummyUsers) {
        // Check if the user already exists in the database
        const existingUser = await client.user.findUnique({
            where: { username: user.username },
        });

        if (!existingUser) {
            // Create the user with associated todos
            await client.user.create({
                data: {
                    username: user.username,
                    password: user.password,
                    age: user.age,
                    city: user.city,
                    todos: {
                        create: user.todos,
                    },
                },
            });
            console.log(`User ${user.username} created with todos.`);
        } else {
            console.log(`User ${user.username} already exists. Skipping.`);
        }
    }
}

createDummyUsers()
    .then(() => {
        console.log("Seeding completed.");
        return client.$disconnect();
    })
    .catch((error) => {
        console.error("Error seeding data:", error);
        return client.$disconnect();
    });
