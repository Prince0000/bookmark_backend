const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    userId:String,
    title: { type: String, unique: true },
    notes: String,
    collectionData: String, 
    tags: [String],
    url: String,
}, { timestamps: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema); // Changed model name

module.exports = Bookmark;
