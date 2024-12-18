import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pgClient = new Client({
    connectionString :  process.env.PG_CONNECTION,
});

pgClient.connect()
.then(() => console.log("Connected to DB"))
.catch((error) => console.error("DB Connection Error: ", error));