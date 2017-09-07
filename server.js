const express = require('express');
const bodyParser = require('body-parser');
const Food = require('./food');

const server = express();
server.use(bodyParser.json());

// model.find always returns an array which returns back
// from our test script
server.get('/food', (req, res) => {
  Food.find({}, (err, food) => {
    if (err) return res.send(err);
    res.send(food);
  });
});

// res.body always returns an object from test script
server.post('/food', (req, res) => {
  const food = new Food(req.body);
  food.save((err, newFood) => {
    if (err) return res.send(err);
    res.send(newFood);
  });
});

module.exports = server;