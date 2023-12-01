// authController.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Ensure you are using the latest bcrypt version
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await db.none('INSERT INTO users(username, email, password) VALUES($1, $2, $3)', [username, email, hashedPassword]);

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);

    // Detailed error response
    if (error.code === '23505') {
      res.status(409).json({ success: false, error: 'User with this username or email already exists' });
    } else {
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

    // Always respond with "Invalid credentials" even if the user doesn't exist
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    } else {
      res.status(200).json({ success: true, message: 'Login successful' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
