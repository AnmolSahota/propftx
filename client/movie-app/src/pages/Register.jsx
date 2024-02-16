import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Topbar from '../component/Topbar';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  let navigate = useNavigate()
  const validate = () => {
    let valid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };

    if (!firstName) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!lastName) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.post('http://localhost:8080/register', {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password
      })
        .then((response) => {
          toast.success(response.data.msg)
          navigate("/")
          console.log('Registration successful:', response.data.msg);

        })
        .catch((error) => {
          // Handle registration error
          toast.error('error occur')
          console.error('Registration error:', error.response.data);
        });
    }
  };

  return (
    <>
      <Topbar pageTitle='Welcome to our Movie Hub' />
      <Container maxWidth="sm">
        <ToastContainer />
        <Box mt={8}>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleRegister}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
          <Button
            component={Link}
            to="/"
            color="primary"
            style={{ margin: '8px' }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default Register;
