import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from '../component/Topbar';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate()
    const handleLogin = () => {
        const userData = { email, password };
        axios.post('http://localhost:8080/login', userData)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("Token", response.data.Token)
                localStorage.setItem("username", response.data.userName)
                toast.success('Login successful');
                navigate("movies")
            })
            .catch((error) => {
                console.error('Error logging in:', error.response);
                toast.error(error.response.data);
                // Handle login error, e.g., show error message
            });
    };


    return (
        <>
            <Topbar pageTitle='Welcome to our Movie Hub' />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                <h1>Login</h1>
                <ToastContainer />
                <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px' }} noValidate autoComplete="off">
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        style={{ margin: '8px', width: '100%' }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        style={{ margin: '8px', width: '100%' }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ margin: '8px', width: '100%' }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <Button
                        component={Link}
                        to="/register"
                        color="primary"
                        style={{ margin: '8px', alignSelf: 'flex-start' }}
                    >
                        Register
                    </Button>
                </form>
            </div>
        </>
    );
}

export default Login;
