const mongoose = require('mongoose');
const Food = require('./food');

const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

mongoose.connect('mongodb://localhost/test', { useMongoClient: true }, (err) => {
  if (err) return console.log(err);
});

mongoose.Promise = global.Promise;

// stubbing find, gets the data without access the server
describe('Food', () => {
  beforeEach(() => {
    sinon.stub(Food, 'find');
  });
  // restores to the original state afterEach
  afterEach(() => {
    Food.find.restore();
  });
  
  describe('#getName()', () => {
    it('should return the name of the food', () => {
      const food = new Food({
        name: 'Rib Steak'
      });
      expect(food.getName()).to.equal('Rib Steak');
    });
    it('should return a string', () => {
      const food = new Food({
        name: 'Rib Steak'
      });
      expect(typeof food.getName()).to.equal('string');
    });
  });

  // getAllFoods is a method on the Class Food (not the instance of Food)
  describe('#getAllFoods()', () => {
    it('should return all the foods', () => {
      Food.find.yields(null, [{ name: 'pumpkin pie' }]);
      Food.getAllFoods((foods) => {
        expect(foods.length).to.equal(1);
        expect(foods[0].name).to.equal('pumpkin pie');
      });
    });
  });
});