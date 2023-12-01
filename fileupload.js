// fileUpload.js
const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const awsConfig = require('./awsConfig');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: awsConfig.aws_access_key_id,
  secretAccessKey: awsConfig.aws_secret_access_key,
  region: awsConfig.aws_region,
});

// Create an S3 instance
const s3 = new AWS.S3();

// Configure multer to use S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: awsConfig.s3_bucket_name,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

// Example route for file upload
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    // File uploaded successfully
    res.json({ success: true, message: 'File uploaded to S3 successfully' });
  } catch (error) {
    console.error(error);
    if (error.code === 'LimitUnexceeded') {
      // Multer file size limit exceeded
      res.status(400).json({ success: false, error: 'File size limit exceeded' });
    } else {
      // Other errors (e.g., S3 upload failure)
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
});

module.exports = router;
