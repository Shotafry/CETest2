import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Divider
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isOrganizer } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const handleOrganizerPanel = () => {
    navigate('/organizer');
    handleClose();
  };

  // No mostrar navegación en páginas de auth
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            color: 'primary.main',
            fontWeight: 'bold'
          }}
          onClick={() => navigate('/')}
        >
          CibESphere
        </Typography>

        {/* Navigation Items */}
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Organizer Panel Button */}
            {isOrganizer() && (
              <Button
                color="inherit"
                startIcon={<DashboardIcon />}
                onClick={handleOrganizerPanel}
                sx={{ mr: 1 }}
              >
                Panel Organizador
              </Button>
            )}

            {/* User Menu */}
            <IconButton
              size="large"
              aria-label="cuenta del usuario"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
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
              <MenuItem disabled>
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    {user.name || user.email}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.role}
                  </Typography>
                </Box>
              </MenuItem>
              
              <Divider />
              
              <MenuItem onClick={() => { navigate('/subscriptions'); handleClose(); }}>
                <NotificationsIcon sx={{ mr: 1 }} />
                Mis Suscripciones
              </MenuItem>
              
              {isOrganizer() && (
                <MenuItem onClick={handleOrganizerPanel}>
                  <DashboardIcon sx={{ mr: 1 }} />
                  Panel Organizador
                </MenuItem>
              )}
              
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={() => navigate('/login')}
              sx={{ mr: 1 }}
            >
              Iniciar Sesión
            </Button>
            <Button
              color="inherit"
              startIcon={<PersonAddIcon />}
              onClick={() => navigate('/register')}
              variant="outlined"
            >
              Registrarse
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
