const mongoose = require('mongoose');
const server = require('./server');

mongoose.connect('mongod://localhost/food', {}, () => {
  console.log('connecte to food DB');
});

server.listen(8080, () => {
  console.log('server listening on port 8080');
});
