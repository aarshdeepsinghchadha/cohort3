const express = require('express');
const app = express();

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 requests per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 429 status code.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second.

let numberOfRequestsForUser = {};

// Reset the tracking object every second
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000);

// Middleware to check the rate limit
app.use(function(req, res, next) {
    const userId = req.headers["user-id"];
    
    // Check if 'user-id' exists
    if (!userId) {
        return res.status(400).send("User ID is required.");
    }
    
    // Track number of requests per user
    if (numberOfRequestsForUser[userId]) {
        numberOfRequestsForUser[userId] = numberOfRequestsForUser[userId] + 1;
        
        // If the number of requests exceeds 5 in a second, block the user
        if (numberOfRequestsForUser[userId] > 5) {
            return res.status(429).send("Too many requests. Try again later.");
        } else {
            next();
        }
    } else {
        // First request in the current second
        numberOfRequestsForUser[userId] = 1;
        next();
    }
});

// Example GET endpoint
app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
});

// Example POST endpoint
app.post('/user', function(req, res) {
    res.status(200).json({ msg: 'created dummy user' });
});


app.listen(3000, () => {
  console.log(`Server running on port https://localhost:3000`);
}); 
module.exports = app;
