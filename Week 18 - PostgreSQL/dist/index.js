"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const pgClient = new pg_1.Client({
    connectionString: "postgresql://users_owner:EVpYhn2mBtS3@ep-wandering-field-a5jjhlwh.us-east-2.aws.neon.tech/neondb?sslmode=require",
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
pgClient.connect();
const userInsertQuery = `
INSERT INTO users (username, email, password)
VALUES ($1, $2, $3)
RETURNING *;
`;
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const values = [username, email, password];
        const result = yield pgClient.query(userInsertQuery, values);
        res.status(201).json({
            message: "User signed up successfully",
        });
    }
    catch (ex) {
        console.error("Error inserting user:", ex);
        res.status(500).json({ error: "Failed to sign up user" });
    }
}));
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
