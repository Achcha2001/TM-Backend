// routes/member.js
const router = require("express").Router();
const Member = require("../models/members");
const bcrypt = require('bcryptjs');

router.route("/add").post(async (req, res) => {
  try {
    const { fullname, email, password, membershipnumber } = req.body;

    const newMember = new Member({
      fullname,
      email,
      password,
      membershipnumber
    });

    await newMember.save();
    res.json("Signup successful!");
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.route("/authenticate").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const member = await Member.findOne({ email });

    if (!member) {
      return res.json({ success: false, message: 'Authentication failed. Member not found.' });
    }

    const passwordMatch = await bcrypt.compare(password, member.password);

    if (passwordMatch) {
      return res.json({ success: true, member });
    } else {
      return res.json({ success: false, message: 'Authentication failed. Invalid password.' });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.route("/").get((req, res) => {
  Member.find().then((members) => {
    res.json(members);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  });
});

router.route("/update/:id").put(async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullname, email, password, membershipnumber } = req.body;

    const updateMember = {
      fullname,
      email,
      password,
      membershipnumber
    };

    await Member.findByIdAndUpdate(userId, updateMember);
    res.json({ status: "Member updated" });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  try {
    const userId = req.params.id;
    await Member.findByIdAndDelete(userId);
    res.json({ status: "Member deleted" });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.route("/get/:email").get(async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await Member.findOne({ email: userEmail });

    if (!user) {
      return res.json({ status: "Member not found" });
    }

    res.json({ status: "Success", user });
  } catch (error) {
    console.error('Error getting member:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.route("/getLoggedInUser").get((req, res) => {
  const userEmail = req.user ? req.user.email : null;

  if (!userEmail) {
    return res.json({ success: false, message: 'User not logged in' });
  }

  res.json({ success: true, email: userEmail });
});

module.exports = router;
