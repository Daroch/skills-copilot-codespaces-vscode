// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Get comments
router.get('/', (req, res) => {
    const comments = fs.readFileSync(path.join(__dirname, '../data/comments.json'));
    res.send(comments);
});

// Add a comment
router.post('/', (req, res) => {
    const comments = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/comments.json')));
    comments.push(req.body);
    fs.writeFileSync(path.join(__dirname, '../data/comments.json'), JSON.stringify(comments));
    res.send(comments);
});

// Delete a comment
router.delete('/:id', (req, res) => {
    const comments = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/comments.json')));
    const newComments = comments.filter((comment) => {
        return comment.id !== req.params.id;
    });
    fs.writeFileSync(path.join(__dirname, '../data/comments.json'), JSON.stringify(newComments));
    res.send(newComments);
});

// Export module
module.exports = router;