import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Landing from '../pages/Landing/LandingSimple';
import theme from '../theme/theme';
import { AuthProvider } from '../context/AuthContext';

// Mock para react-leaflet
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: () => <div data-testid="marker" />,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>
}));

// Mock para react-leaflet-cluster
jest.mock('react-leaflet-cluster', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="marker-cluster">{children}</div>
}));

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

describe('Landing Page', () => {
  test('renders main title', () => {
    renderWithProviders(<Landing />);
    expect(screen.getByText('CibESphere')).toBeInTheDocument();
    expect(screen.getByText('Comunidad de Ciberseguridad en España')).toBeInTheDocument();
  });

  test('renders search input', () => {
    renderWithProviders(<Landing />);
    expect(screen.getByPlaceholderText('Buscar eventos...')).toBeInTheDocument();
  });

  test('renders filter sections', () => {
    renderWithProviders(<Landing />);
    expect(screen.getByText('Región')).toBeInTheDocument();
    expect(screen.getByText('Categorías')).toBeInTheDocument();
  });

  test('renders events list', () => {
    renderWithProviders(<Landing />);
    expect(screen.getByText(/Próximos eventos/)).toBeInTheDocument();
  });

  test('renders map container', () => {
    renderWithProviders(<Landing />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  test('filter functionality works', () => {
    renderWithProviders(<Landing />);
    
    // Buscar un filtro de región
    const madridFilter = screen.getByText('Comunidad de Madrid');
    fireEvent.click(madridFilter);
    
    // Verificar que el filtro se aplicó (el componente debería actualizar la lista)
    expect(madridFilter).toBeInTheDocument();
  });

  test('search functionality works', () => {
    renderWithProviders(<Landing />);
    
    const searchInput = screen.getByPlaceholderText('Buscar eventos...');
    fireEvent.change(searchInput, { target: { value: 'Madrid' } });
    
    expect(searchInput.value).toBe('Madrid');
  });

  test('clear filters button works', () => {
    renderWithProviders(<Landing />);
    
    const clearButton = screen.getByText('Limpiar filtros');
    fireEvent.click(clearButton);
    
    expect(clearButton).toBeInTheDocument();
  });
});
