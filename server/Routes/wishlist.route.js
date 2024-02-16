let express = require('express');
const WishlistItem = require('../model/wishlist.model');
const wishlistRoute = express.Router()


wishlistRoute.post('/wishlist', async (req, res) => {
    const { userId } = req.body
    console.log(req.body);
    try {
        const { imdbID, Title, Year, Poster } = req.body;
        const wishlistItem = new WishlistItem({ imdbID, Title, Year, Poster,userId });
        await wishlistItem.save();
        res.json({ message: 'Movie added to wishlist', wishlistItem });
    } catch (err) {
        console.error('Error adding movie to wishlist:', err);
        res.status(500).json({ message: 'Failed to add movie to wishlist' });
    }
});

wishlistRoute.get('/wishlist', async (req, res) => {
    const { userId } = req.body;
    try {
        const wishlistItems = await WishlistItem.find({ userId });
        res.json({ wishlistItems });
    } catch (err) {
        console.error('Error fetching wishlist items:', err);
        res.status(500).json({ message: 'Failed to fetch wishlist items' });
    }
});


module.exports={wishlistRoute}