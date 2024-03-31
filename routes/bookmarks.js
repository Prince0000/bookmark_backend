const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark');

// POST route for creating a new document
router.post('/', async (req, res) => {
    try {
        // Check if a bookmark with the same title already exists
        const existingBookmark = await Bookmark.findOne({ title: req.body.title });
        if (existingBookmark) {
            return res.status(400).json({ message: 'Bookmark with this title already exists.' });
        }

        // Validate request body against the Mongoose schema
        const { error } = Bookmark.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Create a new document based on the validated request body
        const newBookmark = await Bookmark.create(req.body);

        // If creation is successful, send the newly created document as a response
        res.status(201).json({ message: "New bookmark created.", data: newBookmark });
    } catch (error) {
        // If there's an error, send an error response
        res.status(400).json({ message: error.message });
    }
});

// Route to get all bookmarks
router.get('/', async (req, res) => {
    try {
        const bookmarks = await Bookmark.find();
        console.log(bookmarks.tags)
        res.json(bookmarks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get all bookmarks for a specific user by userId
router.get('/:id', async (req, res) => {
    try {
        // Find all bookmarks belonging to the specified userId
        const bookmarks = await Bookmark.find({ userId: req.params.id });
        res.json(bookmarks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:fetchType/:collectionData/:id', async (req, res) => {
    try {
        // Check if fetchType is empty
        if (!req.params.fetchType) {
            return res.status(400).json({ message: 'Fetch type parameter is required.' });
        }

        // Create a dynamic query object
        const query = { userId: req.params.id };
        query[req.params.fetchType] = req.params.collectionData;

        // Find all bookmarks based on the dynamic query
        const bookmarks = await Bookmark.find(query);
        res.json(bookmarks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Route to delete a bookmark by ID
router.delete('/:id', async (req, res) => {
    try {
        const foundBookmark = await Bookmark.findById(req.params.id);
        if (!foundBookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }
        await foundBookmark.remove();
        res.json({ message: 'Bookmark deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
