const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a folder
router.post('/create-folder', async (req, res) => {
  try {
    const { folderName, parentFolderId } = req.body;
    
    // Assuming you have a "folders" table with columns: folder_id, folder_name, parent_folder_id
    const result = await db.query('INSERT INTO folders(folder_name, parent_folder_id) VALUES($1, $2) RETURNING *', [folderName, parentFolderId]);
    
    res.status(201).json({ success: true, folder: result.rows[0], message: 'Folder created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Get all folders
router.get('/get-folders', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM folders');
    res.json({ success: true, folders: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Other folder management routes can be added as needed (e.g., update folder, delete folder)

module.exports = router;
