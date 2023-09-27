import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styles from './header.module.css';
import { useUserStore } from '../../../storage/userStore';
import { Button } from '@mui/material';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user, logout, login } = useUserStore();

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = () => {
    logout();
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    // Моковая авторизация
    const mockUser = {
      username: 'mockUser',
      password: 'mockPassword',
      role: 'client',
    };

    login(mockUser.username); // Передаем только юзернейм
  };

  return (
    <Box className={styles.Header}> 
      <AppBar position="static" color='inherit'>
        <Toolbar>
          {user ? (
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
              <Button
                className={styles.LoggedInButton}
                color="inherit"
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
