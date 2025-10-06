import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  CircularProgress,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Notifications as NotificationsIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { subscriptionsService } from '../../services/api';
import 'leaflet/dist/leaflet.css';

// Datos locales temporales (mismos que en Landing)
const mockEvents = [
  {
    id: 'ev-madrid',
    title: 'CyberCon Madrid',
    shortDescription: 'El mayor congreso de ciberseguridad de la capital',
    description: 'CyberCon Madrid es el evento más importante de ciberseguridad en la capital española. Durante tres días, expertos internacionales compartirán las últimas tendencias en seguridad informática, amenazas emergentes y soluciones innovadoras. El evento incluye conferencias magistrales, talleres prácticos, competencias de hacking ético y una zona de exposición con las principales empresas del sector.\n\nEl programa incluye:\n• Conferencias magistrales con expertos internacionales\n• Talleres prácticos de ciberseguridad\n• Competencias de hacking ético\n• Zona de exposición con empresas líderes\n• Sesiones de networking\n• Certificaciones profesionales',
    startDate: '2026-05-10T09:00:00Z',
    endDate: '2026-05-12T18:00:00Z',
    location: {
      lat: 40.4168,
      lng: -3.7038,
      city: 'Madrid',
      region: 'Comunidad de Madrid',
      address: 'Palacio de Congresos de Madrid, Paseo de la Castellana, 99'
    },
    logoUrl: 'https://via.placeholder.com/400x200/00bcd4/ffffff?text=CyberCon+Madrid',
    organizer: {
      name: 'Madrid CyberSec Association',
      email: 'info@madridcybersec.es',
      avatar: 'https://via.placeholder.com/64x64/00bcd4/ffffff?text=MCA'
    },
    tags: ['Congreso', 'Networking', 'Empresarial', 'Internacional'],
    website: 'https://cyberconmadrid.es',
    price: 'Desde 299€',
    capacity: 1500,
    attendees: 847
  },
  {
    id: 'ev-barcelona',
    title: 'BCN SecDays',
    shortDescription: 'Días de seguridad informática en Barcelona',
    description: 'BCN SecDays es un evento de tres días dedicado a la ciberseguridad en Barcelona. Dirigido tanto a profesionales como a estudiantes, el evento combina charlas técnicas, demostraciones en vivo y sesiones de networking. Los asistentes podrán aprender sobre las últimas vulnerabilidades, técnicas de pentesting y estrategias de defensa cibernética.\n\nActividades principales:\n• Charlas técnicas especializadas\n• Demostraciones en vivo de vulnerabilidades\n• Talleres de pentesting\n• Laboratorios prácticos\n• Mesa redonda con expertos\n• Concurso de CTF para estudiantes',
    startDate: '2026-06-22T10:00:00Z',
    endDate: '2026-06-24T17:00:00Z',
    location: {
      lat: 41.3851,
      lng: 2.1734,
      city: 'Barcelona',
      region: 'Cataluña',
      address: 'Centro de Convenciones Internacional de Barcelona, Plaza de Willy Brandt, 11-14'
    },
    logoUrl: 'https://via.placeholder.com/400x200/00bcd4/ffffff?text=BCN+SecDays',
    organizer: {
      name: 'Barcelona Security Group',
      email: 'contact@bcnsecdays.cat',
      avatar: 'https://via.placeholder.com/64x64/00bcd4/ffffff?text=BSG'
    },
    tags: ['Técnico', 'Pentesting', 'Estudiantes', 'Profesionales'],
    website: 'https://bcnsecdays.cat',
    price: 'Gratuito',
    capacity: 500,
    attendees: 312
  },
  {
    id: 'ev-valencia',
    title: 'Valencia Cyber Meetup',
    shortDescription: 'Encuentro mensual de ciberseguridad en Valencia',
    description: 'El Valencia Cyber Meetup es un encuentro mensual informal donde profesionales de la ciberseguridad se reúnen para compartir conocimientos, experiencias y establecer contactos. Cada sesión incluye presentaciones cortas sobre temas actuales, discusiones grupales y tiempo para networking.\n\nFormato del meetup:\n• Presentaciones de 15 minutos sobre temas actuales\n• Discusiones grupales interactivas\n• Tiempo dedicado al networking\n• Intercambio de experiencias profesionales\n• Oportunidades de colaboración\n• Ambiente relajado e informal',
    startDate: '2026-04-12T18:00:00Z',
    endDate: '2026-04-12T21:00:00Z',
    location: {
      lat: 39.4699,
      lng: -0.3763,
      city: 'Valencia',
      region: 'Comunidad Valenciana',
      address: 'Espacio Coworking TechHub Valencia, Calle de Colón, 1'
    },
    logoUrl: 'https://via.placeholder.com/400x200/00bcd4/ffffff?text=Valencia+Cyber',
    organizer: {
      name: 'Valencia CyberSec Community',
      email: 'meetup@valenciacyber.es',
      avatar: 'https://via.placeholder.com/64x64/00bcd4/ffffff?text=VCC'
    },
    tags: ['Meetup', 'Networking', 'Informal', 'Mensual'],
    website: 'https://valenciacyber.es',
    price: 'Gratuito',
    capacity: 80,
    attendees: 45
  },
  {
    id: 'ev-sevilla',
    title: 'Sevilla HackFest',
    shortDescription: 'Festival de hacking ético y ciberseguridad',
    description: 'Sevilla HackFest es un festival de dos días centrado en el hacking ético y la ciberseguridad ofensiva. El evento incluye competencias CTF, talleres de hacking, demostraciones de exploits y charlas sobre las últimas técnicas de penetration testing. Ideal para hackers éticos, pentesters y entusiastas de la seguridad.\n\nProgramación del festival:\n• Competencia CTF de 24 horas\n• Talleres de hacking ético\n• Demostraciones de exploits en vivo\n• Charlas sobre técnicas de pentesting\n• Bug bounty workshop\n• Ceremonia de premiación',
    startDate: '2026-09-03T09:00:00Z',
    endDate: '2026-09-04T19:00:00Z',
    location: {
      lat: 37.3891,
      lng: -5.9845,
      city: 'Sevilla',
      region: 'Andalucía',
      address: 'Universidad de Sevilla - Escuela Técnica Superior de Ingeniería Informática, Av. Reina Mercedes, s/n'
    },
    logoUrl: 'https://via.placeholder.com/400x200/00bcd4/ffffff?text=Sevilla+HackFest',
    organizer: {
      name: 'Andalucía Hacker Collective',
      email: 'info@sevillahackfest.es',
      avatar: 'https://via.placeholder.com/64x64/00bcd4/ffffff?text=AHC'
    },
    tags: ['CTF', 'Hacking', 'Universidad', 'Competencia'],
    website: 'https://sevillahackfest.es',
    price: 'Desde 50€',
    capacity: 300,
    attendees: 178
  },
  {
    id: 'ev-bilbao',
    title: 'Bilbao InfoSec',
    shortDescription: 'Conferencia de seguridad de la información',
    description: 'Bilbao InfoSec es una conferencia de tres días dedicada a la seguridad de la información y la protección de datos. El evento reúne a expertos en compliance, auditores de seguridad, CISOs y profesionales de la privacidad para discutir las mejores prácticas en gestión de riesgos, cumplimiento normativo y gobernanza de la seguridad.\n\nTemas principales:\n• Gestión de riesgos de ciberseguridad\n• Cumplimiento del GDPR y normativas\n• Auditorías de seguridad\n• Gobernanza de la información\n• Estrategias de respuesta a incidentes\n• Formación en concienciación',
    startDate: '2026-10-11T08:30:00Z',
    endDate: '2026-10-13T17:30:00Z',
    location: {
      lat: 43.2630,
      lng: -2.9350,
      city: 'Bilbao',
      region: 'País Vasco',
      address: 'Palacio Euskalduna, Abandoibarra Etorb., 4'
    },
    logoUrl: 'https://via.placeholder.com/400x200/00bcd4/ffffff?text=Bilbao+InfoSec',
    organizer: {
      name: 'Basque InfoSec Association',
      email: 'eventos@bilbaoinfosec.eus',
      avatar: 'https://via.placeholder.com/64x64/00bcd4/ffffff?text=BIA'
    },
    tags: ['Compliance', 'GDPR', 'Governance', 'Empresarial'],
    website: 'https://bilbaoinfosec.eus',
    price: 'Desde 399€',
    capacity: 800,
    attendees: 523
  },
  {
    id: 'ev-zaragoza',
    title: 'Zaragoza CTF & Talks',
    shortDescription: 'Competencia CTF y charlas técnicas',
    description: 'Zaragoza CTF & Talks combina una intensa competencia de Capture The Flag con charlas técnicas especializadas. Durante dos días, los equipos competirán en desafíos de criptografía, forense digital, ingeniería inversa y explotación de binarios, mientras que las charlas cubrirán temas avanzados de ciberseguridad.\n\nActividades del evento:\n• Competencia CTF por equipos\n• Desafíos de criptografía avanzada\n• Análisis forense digital\n• Ingeniería inversa de malware\n• Explotación de binarios\n• Charlas técnicas especializadas',
    startDate: '2026-11-20T10:00:00Z',
    endDate: '2026-11-21T18:00:00Z',
    location: {
      lat: 41.6488,
      lng: -0.8891,
      city: 'Zaragoza',
      region: 'Aragón',
      address: 'Centro de Tecnologías Avanzadas de Zaragoza, Calle de María de Luna, 3'
    },
    logoUrl: 'https://via.placeholder.com/400x200/00bcd4/ffffff?text=Zaragoza+CTF',
    organizer: {
      name: 'Aragón CyberSec Club',
      email: 'ctf@zaragozacyber.es',
      avatar: 'https://via.placeholder.com/64x64/00bcd4/ffffff?text=ACC'
    },
    tags: ['CTF', 'Competencia', 'Técnico', 'Forense'],
    website: 'https://zaragozacyber.es',
    price: 'Desde 75€',
    capacity: 200,
    attendees: 134
  }
];

// Configurar icono de Leaflet
const eventIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionOpen, setSubscriptionOpen] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState({
    email: '',
    remindDays: 7
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      // Simular carga desde API
      const foundEvent = mockEvents.find(e => e.id === id);
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        setSnackbar({
          open: true,
          message: 'Evento no encontrado',
          severity: 'error'
        });
        navigate('/');
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Error al cargar el evento',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubscription = async () => {
    try {
      await subscriptionsService.subscribe({
        ...subscriptionData,
        eventId: event.id
      });
      
      setSnackbar({
        open: true,
        message: 'Suscripción creada exitosamente. Te notificaremos sobre este evento.',
        severity: 'success'
      });
      
      setSubscriptionOpen(false);
      setSubscriptionData({ email: '', remindDays: 7 });
    } catch (err) {
      // Fallback a localStorage si falla la API
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
      subscriptions.push({
        id: Date.now(),
        ...subscriptionData,
        eventId: event.id,
        eventTitle: event.title,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
      
      setSnackbar({
        open: true,
        message: 'Suscripción guardada localmente. Te notificaremos sobre este evento.',
        severity: 'success'
      });
      
      setSubscriptionOpen(false);
      setSubscriptionData({ email: '', remindDays: 7 });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.shortDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copiar URL al portapapeles
      navigator.clipboard.writeText(window.location.href);
      setSnackbar({
        open: true,
        message: 'URL copiada al portapapeles',
        severity: 'success'
      });
    }
  };

  const formatEventDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return {
        date: format(start, 'dd MMMM yyyy', { locale: es }),
        time: `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`
      };
    } else {
      return {
        date: `${format(start, 'dd MMM', { locale: es })} - ${format(end, 'dd MMM yyyy', { locale: es })}`,
        time: `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`
      };
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return null;
  }

  const eventDate = formatEventDate(event.startDate, event.endDate);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Breadcrumbs y botón de regreso */}
        <Box sx={{ mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{ mb: 2 }}
          >
            Volver a eventos
          </Button>
          
          <Breadcrumbs>
            <Link color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
              CibESphere
            </Link>
            <Typography color="text.primary">{event.title}</Typography>
          </Breadcrumbs>
        </Box>

        <Grid container spacing={4}>
          {/* Columna principal */}
          <Grid item xs={12} md={8}>
            {/* Imagen del evento */}
            <Card sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                height="300"
                image={event.logoUrl}
                alt={event.title}
              />
            </Card>

            {/* Información principal */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h3" component="h1" gutterBottom>
                {event.title}
              </Typography>
              
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {event.shortDescription}
              </Typography>

              <Box sx={{ mb: 3 }}>
                {event.tags.map(tag => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{ mr: 1, mb: 1 }}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h5" gutterBottom>
                Descripción
              </Typography>
              
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
                {event.description}
              </Typography>
            </Paper>
          </Grid>

          {/* Columna lateral */}
          <Grid item xs={12} md={4}>
            {/* Información del evento */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Información del evento
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <EventIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Fecha
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight="medium">
                    {eventDate.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {eventDate.time}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Ubicación
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight="medium">
                    {event.location.city}, {event.location.region}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.location.address}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Precio
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {event.price}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Asistentes
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {event.attendees} / {event.capacity}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<NotificationsIcon />}
                    onClick={() => setSubscriptionOpen(true)}
                    sx={{ mb: 1 }}
                  >
                    Suscribirme
                  </Button>
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ShareIcon />}
                    onClick={handleShare}
                  >
                    Compartir
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Organizador */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Organizador
                </Typography>
                
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    src={event.organizer.avatar}
                    sx={{ mr: 2, width: 48, height: 48 }}
                  >
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {event.organizer.name}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <EmailIcon sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {event.organizer.email}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {event.website && (
                  <Button
                    variant="outlined"
                    fullWidth
                    href={event.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sitio web
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Mini mapa */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Ubicación
                </Typography>
                
                <Box sx={{ height: 200, mb: 2 }}>
                  <MapContainer
                    center={[event.location.lat, event.location.lng]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                      position={[event.location.lat, event.location.lng]}
                      icon={eventIcon}
                    >
                      <Popup>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {event.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {event.location.address}
                          </Typography>
                        </Box>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  {event.location.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Dialog de suscripción */}
      <Dialog open={subscriptionOpen} onClose={() => setSubscriptionOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Suscribirse a {event.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Te enviaremos un recordatorio antes del evento.
          </Typography>
          
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={subscriptionData.email}
            onChange={(e) => setSubscriptionData({ ...subscriptionData, email: e.target.value })}
            sx={{ mb: 2 }}
            required
          />
          
          <FormControl fullWidth>
            <InputLabel>Recordarme</InputLabel>
            <Select
              value={subscriptionData.remindDays}
              onChange={(e) => setSubscriptionData({ ...subscriptionData, remindDays: e.target.value })}
              label="Recordarme"
            >
              <MenuItem value={1}>1 día antes</MenuItem>
              <MenuItem value={3}>3 días antes</MenuItem>
              <MenuItem value={7}>1 semana antes</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubscriptionOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubscription}
            variant="contained"
            disabled={!subscriptionData.email}
          >
            Suscribirse
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventDetail;
