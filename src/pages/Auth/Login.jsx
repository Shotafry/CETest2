import React, { useState } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import {
  Login as LoginIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';

// Esquema de validación
const schema = yup.object({
  email: yup
    .string()
    .email('Ingresa un email válido')
    .required('El email es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida')
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    const result = await login(data.email, data.password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleDemoLogin = async (role) => {
    setLoading(true);
    setError('');

    let email, password;
    switch (role) {
      case 'admin':
        email = 'admin@cybesphere.local';
        password = 'Admin123!';
        break;
      case 'organizer':
        email = 'organizer@cybesphere.local';
        password = 'Organizer123!';
        break;
      case 'attendee':
        email = 'attendee@cybesphere.local';
        password = 'Attendee123!';
        break;
      default:
        return;
    }

    const result = await login(email, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
        py: 3
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" component="h1" color="primary" gutterBottom>
              CibESphere
            </Typography>
            <Typography variant="h5" gutterBottom>
              Iniciar Sesión
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Accede a tu cuenta para gestionar eventos
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mb: 3 }}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ minWidth: 'auto', p: 1 }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                )
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
              disabled={loading}
              sx={{ mb: 3 }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </Box>

          {/* Demo Accounts */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Cuentas de demostración
            </Typography>
          </Divider>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Prueba la aplicación con estas cuentas:
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('admin')}
                disabled={loading}
              >
                Admin (admin@cybesphere.local)
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('organizer')}
                disabled={loading}
              >
                Organizador (organizer@cybesphere.local)
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDemoLogin('attendee')}
                disabled={loading}
              >
                Asistente (attendee@cybesphere.local)
              </Button>
            </Box>
          </Box>

          {/* Register Link */}
          <Box textAlign="center">
            <Typography variant="body2">
              ¿No tienes cuenta?{' '}
              <Link component={RouterLink} to="/register">
                Regístrate aquí
              </Link>
            </Typography>
          </Box>

          {/* Back to Home */}
          <Box textAlign="center" mt={2}>
            <Link component={RouterLink} to="/" variant="body2">
              ← Volver al inicio
            </Link>
          </Box>
        </Paper>

        {/* Credentials Info Card */}
        <Card sx={{ mt: 3, bgcolor: 'info.main', color: 'info.contrastText' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Credenciales de prueba
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Admin:</strong> admin@cybesphere.local / Admin123!
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Organizador:</strong> organizer@cybesphere.local / Organizer123!
            </Typography>
            <Typography variant="body2">
              <strong>Asistente:</strong> attendee@cybesphere.local / Attendee123!
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
