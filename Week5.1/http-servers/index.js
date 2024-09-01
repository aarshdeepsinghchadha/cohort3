const express = require("express");
const app = express();

let requestCount= 0;
app.use(express.json());


const logRequestDetails = (req,res,next) => {
    const currentTime = new Date().toISOString();
    console.log(`[${currentTime}] ${req.method} request to ${req.url}`);
    next();
}

const countRequests = (req,res, next) => {
    requestCount++;
    next();
}

app.use(logRequestDetails);
app.use(countRequests);

app.get("/sum", function(req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    res.json({
        ans: a + b
    });
});

app.get("/multiply", function(req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    res.json({
        ans: a * b
    });
});

app.get("/divide", function(req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    res.json({
        ans: a / b
    });
});

app.get("/subtract", function(req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    res.json({
        ans: a - b
    });
});

app.get("/requestCount", function(req, res) {
    res.json({
        totalRequests: requestCount
    });
});

app.listen(3000, () => {
    console.log("Server is running and listening on http://localhost:3000");
});
