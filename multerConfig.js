const multer = require('multer');

// Define storage for the uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid duplicates
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
