const express = require('express');
const router = express.Router();
const News = require('../models/news');

// Route to add news
router.post('/add', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Assuming you store images on the server and provide a public URL
    // const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newNews = new News({
      title,
      content,
      
    });

    await newNews.save();

    res.json({ success: true, message: 'News added successfully!' });
  } catch (error) {
    console.error('Error adding news:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
