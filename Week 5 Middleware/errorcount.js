const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();
let errorCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint



app.get('/user', function(req, res, next) {
  // Pass the error to the error handling middleware
  next(new Error("User not found"));
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function(req, res) {
  res.status(200).json({ errorCount });
});

// Error-handling middleware
app.use(function(err, req, res, next) {
  errorCount++; // Increment the error count
  console.error(err.stack); // Log the error stack for debugging
  res.status(404).json({ message: err.message }); // Respond with a 404 status and error message
});


app.listen(3000, () => {
  console.log(`Server running on port https://localhost:3000`);
});
module.exports = app;