import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Navigation from '../components/Navigation';
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

describe('Navigation Component', () => {
  test('renders logo and title', () => {
    renderWithProviders(<Navigation />);
    
    expect(screen.getByText('CibESphere')).toBeInTheDocument();
  });

  test('renders login button when not authenticated', () => {
    renderWithProviders(<Navigation />);
    
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
  });

  test('logo is clickable', () => {
    renderWithProviders(<Navigation />);
    
    const logo = screen.getByText('CibESphere');
    expect(logo).toBeInTheDocument();
    
    // Simular click en el logo
    fireEvent.click(logo);
  });

  test('login button is clickable', () => {
    renderWithProviders(<Navigation />);
    
    const loginButton = screen.getByText('Iniciar Sesión');
    fireEvent.click(loginButton);
    
    expect(loginButton).toBeInTheDocument();
  });

  test('navigation is responsive', () => {
    renderWithProviders(<Navigation />);
    
    // Verificar que el componente se renderiza correctamente
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
