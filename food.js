const mongoose = require('mongoose');

const { Schema } = mongoose;

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

FoodSchema.methods.getName = function() {
  return this.name;
};

// statics you actually call the method from food
// calls off of the model
FoodSchema.statics.getAllFoods = function(cb) {
  Food.find({}, (err, food) => {
    if (err) return cb(err);
    cb(food);
  });
};

const Food = mongoose.model('Food', FoodSchema);

module.exports = Food;