// models/UserDetailsModel.js
const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
  pathway: {
    type: String,
    
  },
  level: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  birthday: Date,
  joinedDate: Date,
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;
