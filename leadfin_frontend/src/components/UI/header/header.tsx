import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styles from './header.module.css';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = () => {
    setIsLoggedIn(false);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={styles.Header}> 
      <AppBar position="static" color='inherit'>
        <Toolbar>
          {isLoggedIn ? (
            <Box className={styles.MenuButton}> 
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Личный кабинет</MenuItem>
                <MenuItem onClick={handleMenuItemClick}>Выйти</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box className={styles.MenuButton}>
              <Button className={styles.LoggedInButton} color="inherit" onClick={() => setIsLoggedIn(true)}>
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
