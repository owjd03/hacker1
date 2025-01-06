const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Ensure the `uploads/` directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

// File type validation
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'), false);
    }
    cb(null, true);
};

// Multer instance with storage, limits, and filters
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter,
});

// File Upload Endpoint
router.post('/', upload.array('file', 10), (req, res) => {
    console.log('Request received for file upload');
    console.log('Uploaded Files:', req.files);

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded.' });
    }

    // Respond with details of uploaded files
    res.status(200).json({
        message: 'Files uploaded successfully.',
        files: req.files.map((file) => ({
            originalName: file.originalname,
            uploadPath: file.path,
            size: file.size,
            mimetype: file.mimetype,
        })),
    });
});

// Handle Multer errors globally for this router
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Multer-specific errors
        return res.status(400).json({ error: `Multer error: ${err.message}` });
    } else if (err) {
        // Other errors
        return res.status(400).json({ error: `Error: ${err.message}` });
    }
    next();
});

module.exports = router;