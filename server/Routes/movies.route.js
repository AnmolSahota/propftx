let express = require('express');
const Movie = require('../model/movies.model');
const moviesRoute = express.Router()
moviesRoute.post('/movies', async (req, res) => {
    try {
        const movies = req.body;
        const insertedMovies = await Movie.insertMany(movies);
        res.json({ message: 'Movies inserted successfully', movies: insertedMovies });
    } catch (err) {
        console.error('Error inserting movies:', err);
        res.status(500).json({ message: 'Failed to insert movies' });
    }
});

moviesRoute.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json({ movies });
    } catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).json({ message: 'Failed to fetch movies' });
    }
});

moviesRoute.get('/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({ movie });
    } catch (err) {
        console.error('Error fetching movie:', err);
        res.status(500).json({ message: 'Failed to fetch movie' });
    }
});



module.exports = { moviesRoute }
