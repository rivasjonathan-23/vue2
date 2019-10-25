var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    address: String,
    email: String,
    age: Number,
    birthdate: {month: String, day: Number, year: Number},
    gender: String,
    occupation: String,
    year: Number,
  });

  module.exports = mongoose.model('regUser', userSchema);