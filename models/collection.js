const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    Desc: String,
}, { timestamps: true });

const collection = mongoose.model('collection', collectionSchema);

module.exports = collection;
