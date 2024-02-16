import React, { useState } from 'react';
import { Toolbar, Typography, IconButton, Menu, MenuItem, Paper } from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

function Topbar({ pageTitle }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [username, setUsername] = useState(localStorage.getItem('username') || "");
    const location = useLocation();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Paper square elevation={2} style={{ marginBottom: '20px' }}>
            <Toolbar>
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    {pageTitle}
                </Typography>
                {location.pathname !== '/' && location.pathname !== '/register' && (
                    <>
                        <Typography variant="body1" style={{ marginRight: '10px' }}>
                            Welcome {username}
                        </Typography>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                            color="inherit"
                        >
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {location.pathname === '/wishlist' ? (
                                <MenuItem onClick={handleMenuClose} component={Link} to="/movies">Movies</MenuItem>
                            ) : (
                                <MenuItem onClick={handleMenuClose} component={Link} to="/wishlist">Wishlist</MenuItem>
                            )}
                            <MenuItem onClick={handleMenuClose} component={Link} to="/">Logout</MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </Paper>
    );
}

export default Topbar;
