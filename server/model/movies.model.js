const mongoose= require('mongoose')

const movieSchema = new mongoose.Schema({
    imdbID: {
        type: String,
    },
    Title: {
        type: String,
    },
    Year: {
        type: String,
    },
    Poster: {
        type: String,
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;