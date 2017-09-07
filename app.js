const mongoose = require('mongoose');
const server = require('./server');

mongoose.connect('mongodb://localhost/food', {}, (err) => {
  if (err) return console.log(err);
  console.log('connected to food DB');
});

server.listen(8080, (err) => {
  console.log(err); 
  console.log('server listening on port 8080');
});
