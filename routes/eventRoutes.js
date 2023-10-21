const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel');

// Route to add a new event
router.post('/add', async (req, res) => {
  try {
    const { title, description, date } = req.body;

    // Create a new event instance
    const newEvent = new Event({
      title,
      description,
      date,
    });

    // Save the event to the database
    const savedEvent = await newEvent.save();

    res.json(savedEvent);
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get all events
router.get('/getall', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to delete an event by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const eventId = req.params.id;

    // Find and remove the event by ID
    const deletedEvent = await Event.findByIdAndRemove(eventId);

    if (!deletedEvent) {
      return res.status(404).send('Event not found');
    }

    res.json(deletedEvent);
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
