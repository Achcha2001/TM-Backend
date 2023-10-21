// routes/userDetailsRoutes.js

const express = require('express');
const router = express.Router();
const UserDetails = require('../models/UserDetailsModel');

// Route to get user details
router.get('/getall', async (req, res) => {
  try {
    const memberId = req.params.id;
    const userDetails = await UserDetails.findOne({ member: memberId });

    if (!userDetails) {
      return res.status(404).json({ message: 'User details not found' });
    }

    res.json(userDetails);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to update user details
router.put('/:id', async (req, res) => {
  try {
    const memberId = req.params.id;
    const { pathway, level, birthday, joinedDate } = req.body;

    const updatedDetails = await UserDetails.findOneAndUpdate(
      { member: memberId },
      {
        $set: {
          pathway,
          level,
          birthday,
          joinedDate,
        },
      },
      { new: true, upsert: true }
    );

    res.json(updatedDetails);
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to add new user details
router.post('/add', async (req, res) => {
  try {
    const {  pathway, level, birthday, joinedDate } = req.body;

    const newDetails = new UserDetails({
      
      pathway,
      level,
      birthday,
      joinedDate,
    });

    const savedDetails = await newDetails.save();

    res.json(savedDetails);
  } catch (error) {
    console.error('Error adding user details:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
