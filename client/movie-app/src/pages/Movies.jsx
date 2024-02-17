import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, CardMedia, Typography, IconButton, Tooltip, Box } from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import Topbar from '../component/Topbar';
import { ToastContainer, toast } from 'react-toastify';
import { FadeLoader } from 'react-spinners';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    axios.get('https://propftx-8u8u.onrender.com/movies')
      .then(response => {
        setMovies(response.data.movies);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  }, []);

  const handleAddToWishlist = (movie) => {
    setWishlistLoading(true);
    let token = localStorage.getItem("Token");
    axios.post('https://propftx-8u8u.onrender.com/wishlist', movie, {
      headers: {
        token: `Bearer ${token}`,
      }
    })
      .then(response => {
        toast.success("Added to wishlist")
        console.log('Added to wishlist:', response.data);
        setWishlistLoading(false);
      })
      .catch(error => {
        toast.error('Error adding to wishlist')
        console.error('Error adding to wishlist:', error);
        setWishlistLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      <Topbar pageTitle='Movies List Page' />
      <Container maxWidth="lg">
        {loading && <Box style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: "center" }}>
          <FadeLoader color={'#36D7B7'} loading={loading || wishlistLoading} />
        </Box>}
        {!loading && (
          <Grid container spacing={3}>
            {movies.map(movie => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={movie.Poster}
                    alt={movie.Title}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {movie.Title} ({movie.Year})
                    </Typography>
                  </CardContent>
                  <IconButton
                    aria-label="add to wishlist"
                    onClick={() => handleAddToWishlist(movie)}
                  >
                    <Tooltip title="Add to Wishlist">
                      <FavoriteIcon />
                    </Tooltip>
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default Movies;
