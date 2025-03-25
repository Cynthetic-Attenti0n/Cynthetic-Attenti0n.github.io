// Simple Express server for file listing API
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('.'));

// API endpoint to list files in root directory
app.get('/api/files', (req, res) => {
    fs.readdir('.', { withFileTypes: true }, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read directory' });
        }
        // Filter out directories, only return file names
        const fileNames = files
            .filter(file => file.isFile())
            .map(file => file.name);
        res.json(fileNames);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});