import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  InputAdornment,
  Fab,
  Drawer,
  useMediaQuery,
  useTheme,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon } from 'leaflet';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

// Datos locales temporales
const mockEvents = [
  {
    id: 'ev-madrid',
    title: 'CyberCon Madrid',
    shortDescription: 'El mayor congreso de ciberseguridad de la capital',
    description: 'CyberCon Madrid es el evento más importante de ciberseguridad en la capital española.',
    startDate: '2026-05-10T09:00:00Z',
    endDate: '2026-05-12T18:00:00Z',
    location: {
      lat: 40.4168,
      lng: -3.7038,
      city: 'Madrid',
      region: 'Comunidad de Madrid',
      address: 'Palacio de Congresos de Madrid'
    },
    logoUrl: 'https://via.placeholder.com/200x200/00bcd4/ffffff?text=CyberCon+Madrid',
    organizer: {
      name: 'Madrid CyberSec Association',
      email: 'info@madridcybersec.es'
    },
    tags: ['Congreso', 'Networking', 'Empresarial', 'Internacional']
  },
  {
    id: 'ev-barcelona',
    title: 'BCN SecDays',
    shortDescription: 'Días de seguridad informática en Barcelona',
    description: 'BCN SecDays es un evento de tres días dedicado a la ciberseguridad en Barcelona.',
    startDate: '2026-06-22T10:00:00Z',
    endDate: '2026-06-24T17:00:00Z',
    location: {
      lat: 41.3851,
      lng: 2.1734,
      city: 'Barcelona',
      region: 'Cataluña',
      address: 'Centro de Convenciones Internacional de Barcelona'
    },
    logoUrl: 'https://via.placeholder.com/200x200/00bcd4/ffffff?text=BCN+SecDays',
    organizer: {
      name: 'Barcelona Security Group',
      email: 'contact@bcnsecdays.cat'
    },
    tags: ['Técnico', 'Pentesting', 'Estudiantes', 'Profesionales']
  },
  {
    id: 'ev-valencia',
    title: 'Valencia Cyber Meetup',
    shortDescription: 'Encuentro mensual de ciberseguridad en Valencia',
    description: 'El Valencia Cyber Meetup es un encuentro mensual informal.',
    startDate: '2026-04-12T18:00:00Z',
    endDate: '2026-04-12T21:00:00Z',
    location: {
      lat: 39.4699,
      lng: -0.3763,
      city: 'Valencia',
      region: 'Comunidad Valenciana',
      address: 'Espacio Coworking TechHub Valencia'
    },
    logoUrl: 'https://via.placeholder.com/200x200/00bcd4/ffffff?text=Valencia+Cyber',
    organizer: {
      name: 'Valencia CyberSec Community',
      email: 'meetup@valenciacyber.es'
    },
    tags: ['Meetup', 'Networking', 'Informal', 'Mensual']
  },
  {
    id: 'ev-sevilla',
    title: 'Sevilla HackFest',
    shortDescription: 'Festival de hacking ético y ciberseguridad',
    description: 'Sevilla HackFest es un festival de dos días centrado en el hacking ético.',
    startDate: '2026-09-03T09:00:00Z',
    endDate: '2026-09-04T19:00:00Z',
    location: {
      lat: 37.3891,
      lng: -5.9845,
      city: 'Sevilla',
      region: 'Andalucía',
      address: 'Universidad de Sevilla - ETSI'
    },
    logoUrl: 'https://via.placeholder.com/200x200/00bcd4/ffffff?text=Sevilla+HackFest',
    organizer: {
      name: 'Andalucía Hacker Collective',
      email: 'info@sevillahackfest.es'
    },
    tags: ['CTF', 'Hacking', 'Universidad', 'Competencia']
  },
  {
    id: 'ev-bilbao',
    title: 'Bilbao InfoSec',
    shortDescription: 'Conferencia de seguridad de la información',
    description: 'Bilbao InfoSec es una conferencia de tres días dedicada a la seguridad de la información.',
    startDate: '2026-10-11T08:30:00Z',
    endDate: '2026-10-13T17:30:00Z',
    location: {
      lat: 43.2630,
      lng: -2.9350,
      city: 'Bilbao',
      region: 'País Vasco',
      address: 'Palacio Euskalduna'
    },
    logoUrl: 'https://via.placeholder.com/200x200/00bcd4/ffffff?text=Bilbao+InfoSec',
    organizer: {
      name: 'Basque InfoSec Association',
      email: 'eventos@bilbaoinfosec.eus'
    },
    tags: ['Compliance', 'GDPR', 'Governance', 'Empresarial']
  },
  {
    id: 'ev-zaragoza',
    title: 'Zaragoza CTF & Talks',
    shortDescription: 'Competencia CTF y charlas técnicas',
    description: 'Zaragoza CTF & Talks combina una intensa competencia de Capture The Flag.',
    startDate: '2026-11-20T10:00:00Z',
    endDate: '2026-11-21T18:00:00Z',
    location: {
      lat: 41.6488,
      lng: -0.8891,
      city: 'Zaragoza',
      region: 'Aragón',
      address: 'Centro de Tecnologías Avanzadas de Zaragoza'
    },
    logoUrl: 'https://via.placeholder.com/200x200/00bcd4/ffffff?text=Zaragoza+CTF',
    organizer: {
      name: 'Aragón CyberSec Club',
      email: 'ctf@zaragozacyber.es'
    },
    tags: ['CTF', 'Competencia', 'Técnico', 'Forense']
  }
];

// Configurar iconos de Leaflet
const eventIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Landing = () => {
  const [events] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Filtrar eventos cuando cambien los filtros
  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, selectedRegion, selectedTags]);

  const filterEvents = () => {
    let filtered = events;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por región
    if (selectedRegion) {
      filtered = filtered.filter(event =>
        event.location.region === selectedRegion
      );
    }

    // Filtrar por tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(event =>
        selectedTags.some(tag => event.tags.includes(tag))
      );
    }

    setFilteredEvents(filtered);
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('');
    setSelectedTags([]);
  };

  // Obtener regiones únicas
  const regions = [...new Set(events.map(event => event.location.region))];
  
  // Obtener tags únicos
  const allTags = [...new Set(events.flatMap(event => event.tags))];

  const formatEventDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return format(start, 'dd MMM yyyy', { locale: es });
    } else {
      return `${format(start, 'dd MMM', { locale: es })} - ${format(end, 'dd MMM yyyy', { locale: es })}`;
    }
  };

  const FiltersContent = () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filtros
      </Typography>
      
      {/* Búsqueda */}
      <TextField
        fullWidth
        placeholder="Buscar eventos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {/* Filtro por región */}
      <Typography variant="subtitle2" gutterBottom>
        Región
      </Typography>
      <Box sx={{ mb: 2 }}>
        {regions.map(region => (
          <Chip
            key={region}
            label={region}
            onClick={() => setSelectedRegion(selectedRegion === region ? '' : region)}
            color={selectedRegion === region ? 'primary' : 'default'}
            variant={selectedRegion === region ? 'filled' : 'outlined'}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>

      {/* Filtro por tags */}
      <Typography variant="subtitle2" gutterBottom>
        Categorías
      </Typography>
      <Box sx={{ mb: 2 }}>
        {allTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagToggle(tag)}
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>

      <Button
        variant="outlined"
        onClick={clearFilters}
        fullWidth
      >
        Limpiar filtros
      </Button>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Paper elevation={1} sx={{ py: 2, mb: 2 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            CibESphere
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Comunidad de Ciberseguridad en España
          </Typography>
        </Container>
      </Paper>

      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {/* Filtros - Desktop */}
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <Paper elevation={2}>
                <FiltersContent />
              </Paper>
            </Grid>
          )}

          {/* Mapa */}
          <Grid item xs={12} md={9}>
            <Paper elevation={2} sx={{ height: '70vh', position: 'relative' }}>
              <MapContainer
                center={[40.4637, -3.7492]} // Centro de España
                zoom={6}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MarkerClusterGroup>
                  {filteredEvents.map(event => (
                    <Marker
                      key={event.id}
                      position={[event.location.lat, event.location.lng]}
                      icon={eventIcon}
                    >
                      <Popup>
                        <Box sx={{ minWidth: 200 }}>
                          <img
                            src={event.logoUrl}
                            alt={event.title}
                            style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 4 }}
                          />
                          <Typography variant="h6" sx={{ mt: 1 }}>
                            {event.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatEventDate(event.startDate, event.endDate)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {event.location.city}
                          </Typography>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => navigate(`/events/${event.id}`)}
                            sx={{ mt: 1 }}
                            fullWidth
                          >
                            Ver evento
                          </Button>
                        </Box>
                      </Popup>
                    </Marker>
                  ))}
                </MarkerClusterGroup>
              </MapContainer>
            </Paper>
          </Grid>

          {/* Lista de eventos */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
              Próximos eventos ({filteredEvents.length})
            </Typography>
            <Grid container spacing={2}>
              {filteredEvents.map(event => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Card
                    sx={{ 
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      }
                    }}
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={event.logoUrl}
                      alt={event.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {event.shortDescription}
                      </Typography>
                      <Box display="flex" alignItems="center" mb={1}>
                        <EventIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatEventDate(event.startDate, event.endDate)}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" mb={2}>
                        <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.location.city}
                        </Typography>
                      </Box>
                      <Box>
                        {event.tags.slice(0, 2).map(tag => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ mr: 1, mb: 1 }}
                          />
                        ))}
                        {event.tags.length > 2 && (
                          <Chip
                            label={`+${event.tags.length - 2}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* FAB para filtros en móvil */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="filtros"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setDrawerOpen(true)}
        >
          <FilterIcon />
        </Fab>
      )}

      {/* Drawer para filtros en móvil */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 300 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Typography variant="h6">Filtros</Typography>
            <Button onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </Button>
          </Box>
          <FiltersContent />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Landing;
