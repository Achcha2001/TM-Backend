const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// const multer = require('multer');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

// Define storage for the uploaded images
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Destination folder for uploaded images
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid duplicates
//   }
// });

// // Initialize multer with the storage configuration
// const upload = multer({ storage: storage });

// memberrouter
const MemberRouter = require("./routes/member.js");
// contactrouter
const contactRoutes = require('./routes/contactRoutes.js');

// newsrouter
const newsRoutes = require('./routes/newsRoutes');

const eventRoutes = require('./routes/eventRoutes');

const userDetailsRoutes = require('./routes/UserDetailsRoutes.js');

connection.once("open", () => {
  console.log("Mongodb Connection success!");
});

// Handle image uploads
// app.post("/news/upload", upload.single('image'), (req, res) => {
//   // Send a response with the filename (or other relevant info) to the client
//   res.json({ filename: req.file.filename });
// });

app.use("/member", MemberRouter);
app.use("/contact", contactRoutes);
app.use("/news", newsRoutes);
app.use('/events', eventRoutes);
app.use('/userdetails',userDetailsRoutes)

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
