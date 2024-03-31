const express = require('express');
const router = express.Router();
const Collection = require('../models/collection');

// POST route for creating a new document
router.post('/', async (req, res) => {
    try {
        // Check if a collection with the same name already exists
        const existingCollection = await Collection.findOne({ name: req.body.name });
        if (existingCollection) {
            return res.status(400).json({ message: 'Collection with this name already exists.' });
        }

        // Validate request body against the Mongoose schema
        const { error } = Collection.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Create a new document based on the validated request body
        const newCollection = await Collection.create(req.body);

        // If creation is successful, send the newly created document as a response
        res.status(201).json({ message: "New collection created.", data: newCollection });
    } catch (error) {
        // If there's an error, send an error response
        res.status(400).json({ message: error.message });
    }
});

// Route to get all blogs
router.get('/', async (req, res) => {
    try {
        const Collections = await Collection.find();
        res.json(Collections);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to delete a collection by ID
router.delete('/:id', async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        await collection.remove();
        res.json({ message: 'Collection deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
