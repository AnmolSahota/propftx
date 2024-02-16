const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    imdbID: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    Poster: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema);

module.exports = WishlistItem;
