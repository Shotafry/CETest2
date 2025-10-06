import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Snackbar,
  IconButton,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { eventsService } from '../../services/api';

// Regiones y categorías disponibles
const REGIONS = [
  'Comunidad de Madrid',
  'Cataluña',
  'Comunidad Valenciana',
  'Andalucía',
  'País Vasco',
  'Aragón',
  'Galicia',
  'Castilla y León',
  'Castilla-La Mancha',
  'Murcia',
  'Asturias',
  'Extremadura',
  'Baleares',
  'Canarias',
  'Cantabria',
  'La Rioja',
  'Navarra'
];

const CATEGORIES = [
  'Congreso',
  'Networking',
  'Empresarial',
  'Internacional',
  'Técnico',
  'Pentesting',
  'Estudiantes',
  'Profesionales',
  'Meetup',
  'Informal',
  'Mensual',
  'CTF',
  'Hacking',
  'Universidad',
  'Competencia',
  'Compliance',
  'GDPR',
  'Governance',
  'Forense'
];

const OrganizerPanel = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    location: {
      city: '',
      region: '',
      address: '',
      lat: 40.4168,
      lng: -3.7038
    },
    logoUrl: '',
    organizer: {
      name: '',
      email: '',
      avatar: ''
    },
    tags: [],
    website: '',
    price: '',
    capacity: 100
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      // Simular carga de eventos del organizador
      const mockOrganizerEvents = [
        {
          id: 'ev-madrid',
          title: 'CyberCon Madrid',
          shortDescription: 'El mayor congreso de ciberseguridad de la capital',
          startDate: '2026-05-10T09:00:00Z',
          endDate: '2026-05-12T18:00:00Z',
          location: {
            city: 'Madrid',
            region: 'Comunidad de Madrid',
            address: 'Palacio de Congresos de Madrid'
          },
          tags: ['Congreso', 'Networking', 'Empresarial', 'Internacional'],
          price: 'Desde 299€',
          capacity: 1500,
          attendees: 847,
          status: 'Publicado'
        },
        {
          id: 'ev-valencia',
          title: 'Valencia Cyber Meetup',
          shortDescription: 'Encuentro mensual de ciberseguridad en Valencia',
          startDate: '2026-04-12T18:00:00Z',
          endDate: '2026-04-12T21:00:00Z',
          location: {
            city: 'Valencia',
            region: 'Comunidad Valenciana',
            address: 'Espacio Coworking TechHub Valencia'
          },
          tags: ['Meetup', 'Networking', 'Informal', 'Mensual'],
          price: 'Gratuito',
          capacity: 80,
          attendees: 45,
          status: 'Publicado'
        }
      ];
      
      setEvents(mockOrganizerEvents);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al cargar eventos',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        shortDescription: event.shortDescription,
        description: event.description || '',
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        location: event.location,
        logoUrl: event.logoUrl || '',
        organizer: event.organizer || {
          name: user.name,
          email: user.email,
          avatar: ''
        },
        tags: event.tags || [],
        website: event.website || '',
        price: event.price || '',
        capacity: event.capacity || 100
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        shortDescription: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        location: {
          city: '',
          region: '',
          address: '',
          lat: 40.4168,
          lng: -3.7038
        },
        logoUrl: '',
        organizer: {
          name: user.name,
          email: user.email,
          avatar: ''
        },
        tags: [],
        website: '',
        price: '',
        capacity: 100
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEvent(null);
  };

  const handleSaveEvent = async () => {
    try {
      const eventData = {
        ...formData,
        id: editingEvent?.id || `ev-${Date.now()}`,
        attendees: editingEvent?.attendees || 0,
        status: 'Publicado'
      };

      if (editingEvent) {
        // Actualizar evento existente
        const updatedEvents = events.map(e => 
          e.id === editingEvent.id ? eventData : e
        );
        setEvents(updatedEvents);
        
        setSnackbar({
          open: true,
          message: 'Evento actualizado exitosamente',
          severity: 'success'
        });
      } else {
        // Crear nuevo evento
        setEvents([...events, eventData]);
        
        setSnackbar({
          open: true,
          message: 'Evento creado exitosamente',
          severity: 'success'
        });
      }

      handleCloseDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al guardar evento',
        severity: 'error'
      });
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const updatedEvents = events.filter(e => e.id !== eventToDelete.id);
      setEvents(updatedEvents);
      
      setSnackbar({
        open: true,
        message: 'Evento eliminado exitosamente',
        severity: 'success'
      });
      
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al eliminar evento',
        severity: 'error'
      });
    }
  };

  const handleTagChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      tags: typeof value === 'string' ? value.split(',') : value
    });
  };

  const formatEventDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return format(start, 'dd MMM yyyy', { locale: es });
    } else {
      return `${format(start, 'dd MMM', { locale: es })} - ${format(end, 'dd MMM yyyy', { locale: es })}`;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 3 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Panel de Organizador
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gestiona tus eventos de ciberseguridad
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <EventIcon color="primary" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h4" component="div">
                        {events.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Eventos Totales
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <PeopleIcon color="success" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h4" component="div">
                        {events.reduce((sum, event) => sum + (event.attendees || 0), 0)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Asistentes
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <LocationIcon color="info" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h4" component="div">
                        {new Set(events.map(e => e.location.city)).size}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Ciudades
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <VisibilityIcon color="warning" sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h4" component="div">
                        {events.filter(e => e.status === 'Publicado').length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Publicados
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Events Table */}
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  Mis Eventos
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog()}
                >
                  Nuevo Evento
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Evento</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Ubicación</TableCell>
                      <TableCell>Asistentes</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {event.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {event.shortDescription}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              {event.tags.slice(0, 2).map(tag => (
                                <Chip
                                  key={tag}
                                  label={tag}
                                  size="small"
                                  sx={{ mr: 0.5 }}
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
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatEventDate(event.startDate, event.endDate)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {event.location.city}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {event.location.region}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {event.attendees} / {event.capacity}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={event.status}
                            color="success"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(event)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setEventToDelete(event);
                              setDeleteDialogOpen(true);
                            }}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {events.length === 0 && (
                <Box textAlign="center" py={4}>
                  <Typography variant="body1" color="text.secondary">
                    No tienes eventos creados aún.
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{ mt: 2 }}
                  >
                    Crear tu primer evento
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>

        {/* Event Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              {editingEvent ? 'Editar Evento' : 'Nuevo Evento'}
              <IconButton onClick={handleCloseDialog}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título del evento"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción corta"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción completa"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  label="Fecha de inicio"
                  value={formData.startDate}
                  onChange={(newValue) => setFormData({ ...formData, startDate: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  label="Fecha de fin"
                  value={formData.endDate}
                  onChange={(newValue) => setFormData({ ...formData, endDate: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ciudad"
                  value={formData.location.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.target.value }
                  })}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Región</InputLabel>
                  <Select
                    value={formData.location.region}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location, region: e.target.value }
                    })}
                    label="Región"
                  >
                    {REGIONS.map(region => (
                      <MenuItem key={region} value={region}>
                        {region}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  value={formData.location.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location, address: e.target.value }
                  })}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Categorías</InputLabel>
                  <Select
                    multiple
                    value={formData.tags}
                    onChange={handleTagChange}
                    label="Categorías"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {CATEGORIES.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Precio"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="ej: Gratuito, Desde 50€"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Capacidad"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Sitio web"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://ejemplo.com"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveEvent}
              variant="contained"
              disabled={!formData.title || !formData.shortDescription || !formData.location.city}
            >
              {editingEvent ? 'Actualizar' : 'Crear'} Evento
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que quieres eliminar el evento "{eventToDelete?.title}"?
              Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleDeleteEvent} color="error" variant="contained">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
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
    </LocalizationProvider>
  );
};

export default OrganizerPanel;
