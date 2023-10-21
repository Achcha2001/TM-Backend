// models/memberModel.js

const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  membershipnumber: {
    type: String,
    required: true,
    unique: true,
  },
  userDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails',
  },
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
