const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

let requestCount = 0;

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    requestCount++;
    next();
});

app.use((req, res, next) => {
    console.log(`Total requests received so far: ${requestCount}`);
    next();
});

app.use(express.json());

app.post("/sum", (req, res) => {
    const { a, b } = req.body;
    const result = parseFloat(a) + parseFloat(b);
    res.json({ ans: result });
});

app.post("/multiply", (req, res) => {
    const { a, b } = req.body;
    const result = parseFloat(a) * parseFloat(b);
    res.json({ ans: result });
});

app.post("/divide", (req, res) => {
    const { a, b } = req.body;
    const result = parseFloat(a) / parseFloat(b);
    res.json({ ans: result });
});

app.post("/subtract", (req, res) => {
    const { a, b } = req.body;
    const result = parseFloat(a) - parseFloat(b);
    res.json({ ans: result });
});

app.get("/request-count", (req, res) => {
    res.json({ requestCount });
});

app.listen(3000, () => {
    console.log("Server is running and listening on http://localhost:3000");
});
