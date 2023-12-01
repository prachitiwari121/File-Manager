// userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authorize } = require('../middlewares/authMiddleware');

// Example admin-only route
router.post('/admin-only', authorize('admin'), (req, res) => {
  // Handle the admin-only functionality
  res.json({ success: true, message: 'Admin-only route accessed successfully' });
});

module.exports = router;
