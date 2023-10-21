// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');

// Handle form submission
router.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input (you can add more validation as needed)

    // Create a new contact instance
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save the contact instance to the database
    await newContact.save();

    res.json({ success: true, message: 'Contact form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Fetch all messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
