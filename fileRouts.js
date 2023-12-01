// fileRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const fileController = require('../controllers/fileController');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

// Use authenticateToken middleware for file-related routes
router.get('/get-files', authenticateToken, fileController.getFiles);
router.post('/upload', authenticateToken, uploadMiddleware.single('file'), fileController.uploadFile);

module.exports = router;
