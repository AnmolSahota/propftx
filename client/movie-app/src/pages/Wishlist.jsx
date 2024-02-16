import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import Topbar from '../component/Topbar';
import { FadeLoader } from 'react-spinners';

function Wishlist() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("Token");
    axios.get('http://localhost:8080/wishlist', {
      headers: {
        token: `Bearer ${token}`,
      }
    })
      .then(response => {
        setMovies(response.data.wishlistItems);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Topbar pageTitle="Wish List Page" />
      <Container maxWidth="lg">
        {loading && <Box style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: "center" }}>
          <FadeLoader color={'#36D7B7'} loading={loading} css={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
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
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default Wishlist;
