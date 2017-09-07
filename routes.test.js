const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Food = require('./food');
const server = require('./server');

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

// beforeEach: we'll be clearing our the food collection in our db
// done: needs to be invoked or it wont move on in the code
describe('/food', () => {
  beforeEach((done) => {
    Food.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });

  describe('[GET] /food', () => {
    it('should get all of the food', (done) => {
      chai.request(server)
        .get('/food')
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(0);
          done();
        });
    });
  });

  // .send sends the food object, so we create that object here too
  describe('[POST] /food', () => {
    it('should add a new food', (done) => {
      const food = {
        name: 'Hot Dog'
      };

      chai.request(server)
        .post('/food')
        .send(food)
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Hot Dog');
          done();
        });
    });
  });
});