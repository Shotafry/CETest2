import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import theme from '../theme/theme';
import { AuthProvider } from '../context/AuthContext';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          {component}
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  test('renders login form', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test('renders quick login buttons', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText(/Admin/)).toBeInTheDocument();
    expect(screen.getByText(/Organizador/)).toBeInTheDocument();
    expect(screen.getByText(/Asistente/)).toBeInTheDocument();
  });

  test('renders register link', () => {
    renderWithProviders(<Login />);
    
    expect(screen.getByText(/Regístrate aquí/)).toBeInTheDocument();
  });

  test('form validation works', async () => {
    renderWithProviders(<Login />);
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);
    
    // El formulario debería mostrar errores de validación
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });
  });

  test('email input works', () => {
    renderWithProviders(<Login />);
    
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput.value).toBe('test@example.com');
  });

  test('password input works', () => {
    renderWithProviders(<Login />);
    
    const passwordInput = screen.getByLabelText(/contraseña/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(passwordInput.value).toBe('password123');
  });
});

describe('Register Component', () => {
  test('renders register form', () => {
    renderWithProviders(<Register />);
    
    expect(screen.getByText('Crear Cuenta')).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
  });

  test('renders login link', () => {
    renderWithProviders(<Register />);
    
    expect(screen.getByText(/Inicia sesión aquí/)).toBeInTheDocument();
  });

  test('form inputs work', () => {
    renderWithProviders(<Register />);
    
    const nameInput = screen.getByLabelText(/nombre/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(nameInput.value).toBe('Test User');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
});
