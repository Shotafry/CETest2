import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
  Alert,
  Snackbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Paper,
  Avatar
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '../../context/AuthContext';
import { subscriptionsService } from '../../services/api';

const Subscriptions = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    loadSubscriptions();
    loadNotifications();
  }, []);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      
      // Cargar desde localStorage como fallback
      const localSubscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
      
      // Simular algunos datos de ejemplo si no hay suscripciones
      if (localSubscriptions.length === 0) {
        const mockSubscriptions = [
          {
            id: 'sub-1',
            eventId: 'ev-madrid',
            eventTitle: 'CyberCon Madrid',
            eventDate: '2026-05-10T09:00:00Z',
            email: user?.email || 'user@example.com',
            remindDays: 7,
            createdAt: '2025-10-01T10:00:00Z',
            status: 'active'
          },
          {
            id: 'sub-2',
            eventId: 'ev-valencia',
            eventTitle: 'Valencia Cyber Meetup',
            eventDate: '2026-04-12T18:00:00Z',
            email: user?.email || 'user@example.com',
            remindDays: 3,
            createdAt: '2025-09-15T14:30:00Z',
            status: 'active'
          }
        ];
        setSubscriptions(mockSubscriptions);
        localStorage.setItem('subscriptions', JSON.stringify(mockSubscriptions));
      } else {
        setSubscriptions(localSubscriptions);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al cargar suscripciones',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const loadNotifications = () => {
    // Simular notificaciones de recordatorios
    const mockNotifications = [
      {
        id: 'notif-1',
        type: 'reminder',
        eventTitle: 'CyberCon Madrid',
        eventDate: '2026-05-10T09:00:00Z',
        message: 'Te recordamos que CyberCon Madrid será en 7 días',
        sentAt: '2026-05-03T09:00:00Z',
        read: false
      },
      {
        id: 'notif-2',
        type: 'reminder',
        eventTitle: 'Valencia Cyber Meetup',
        eventDate: '2026-04-12T18:00:00Z',
        message: 'Te recordamos que Valencia Cyber Meetup será en 3 días',
        sentAt: '2026-04-09T18:00:00Z',
        read: true
      },
      {
        id: 'notif-3',
        type: 'confirmation',
        eventTitle: 'BCN SecDays',
        message: 'Confirmación de suscripción a BCN SecDays',
        sentAt: '2025-10-01T12:00:00Z',
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
  };

  const handleDeleteSubscription = async () => {
    try {
      const updatedSubscriptions = subscriptions.filter(
        sub => sub.id !== subscriptionToDelete.id
      );
      
      setSubscriptions(updatedSubscriptions);
      localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
      
      setSnackbar({
        open: true,
        message: 'Suscripción eliminada exitosamente',
        severity: 'success'
      });
      
      setDeleteDialogOpen(false);
      setSubscriptionToDelete(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al eliminar suscripción',
        severity: 'error'
      });
    }
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId 
        ? { ...notif, read: true }
        : notif
    ));
  };

  const getDaysUntilEvent = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    return differenceInDays(event, today);
  };

  const getSubscriptionStatus = (subscription) => {
    const daysUntil = getDaysUntilEvent(subscription.eventDate);
    
    if (daysUntil < 0) {
      return { label: 'Finalizado', color: 'default' };
    } else if (daysUntil <= subscription.remindDays) {
      return { label: 'Recordatorio enviado', color: 'success' };
    } else {
      return { label: 'Activa', color: 'primary' };
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pt: 3 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Mis Suscripciones
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gestiona tus suscripciones a eventos y revisa las notificaciones
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Suscripciones */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Eventos Suscritos ({subscriptions.length})
                </Typography>
                
                {subscriptions.length === 0 ? (
                  <Box textAlign="center" py={4}>
                    <NotificationsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      No tienes suscripciones activas
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Suscríbete a eventos desde la página de detalles para recibir recordatorios
                    </Typography>
                  </Box>
                ) : (
                  <List>
                    {subscriptions.map((subscription, index) => {
                      const status = getSubscriptionStatus(subscription);
                      const daysUntil = getDaysUntilEvent(subscription.eventDate);
                      
                      return (
                        <React.Fragment key={subscription.id}>
                          <ListItem alignItems="flex-start">
                            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                              <EventIcon />
                            </Avatar>
                            
                            <ListItemText
                              primary={
                                <Box display="flex" alignItems="center" gap={1}>
                                  <Typography variant="body1" fontWeight="medium">
                                    {subscription.eventTitle}
                                  </Typography>
                                  <Chip
                                    label={status.label}
                                    color={status.color}
                                    size="small"
                                  />
                                </Box>
                              }
                              secondary={
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    📅 {format(new Date(subscription.eventDate), 'dd MMMM yyyy, HH:mm', { locale: es })}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    📧 {subscription.email}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    ⏰ Recordatorio: {subscription.remindDays} días antes
                                  </Typography>
                                  {daysUntil >= 0 && (
                                    <Typography variant="body2" color="primary.main">
                                      {daysUntil === 0 ? '¡Hoy!' : `En ${daysUntil} días`}
                                    </Typography>
                                  )}
                                </Box>
                              }
                            />
                            
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                color="error"
                                onClick={() => {
                                  setSubscriptionToDelete(subscription);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                          
                          {index < subscriptions.length - 1 && <Divider />}
                        </React.Fragment>
                      );
                    })}
                  </List>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Notificaciones */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notificaciones Recientes
                </Typography>
                
                {notifications.length === 0 ? (
                  <Box textAlign="center" py={2}>
                    <Typography variant="body2" color="text.secondary">
                      No hay notificaciones
                    </Typography>
                  </Box>
                ) : (
                  <List dense>
                    {notifications.map((notification, index) => (
                      <React.Fragment key={notification.id}>
                        <ListItem
                          button
                          onClick={() => markNotificationAsRead(notification.id)}
                          sx={{
                            bgcolor: notification.read ? 'transparent' : 'action.hover',
                            borderRadius: 1,
                            mb: 1
                          }}
                        >
                          <Avatar
                            sx={{
                              mr: 2,
                              width: 32,
                              height: 32,
                              bgcolor: notification.type === 'reminder' ? 'warning.main' : 'success.main'
                            }}
                          >
                            {notification.type === 'reminder' ? (
                              <ScheduleIcon fontSize="small" />
                            ) : (
                              <CheckCircleIcon fontSize="small" />
                            )}
                          </Avatar>
                          
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                fontWeight={notification.read ? 'normal' : 'medium'}
                              >
                                {notification.message}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" color="text.secondary">
                                {format(new Date(notification.sentAt), 'dd MMM, HH:mm', { locale: es })}
                              </Typography>
                            }
                          />
                          
                          {!notification.read && (
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                ml: 1
                              }}
                            />
                          )}
                        </ListItem>
                        
                        {index < notifications.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>

            {/* Configuración de notificaciones */}
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Configuración
                </Typography>
                
                <List dense>
                  <ListItem>
                    <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <ListItemText
                      primary="Email de notificaciones"
                      secondary={user?.email || 'No configurado'}
                    />
                  </ListItem>
                  
                  <ListItem>
                    <NotificationsIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <ListItemText
                      primary="Recordatorios por email"
                      secondary="Activado"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres eliminar la suscripción a "{subscriptionToDelete?.eventTitle}"?
            Ya no recibirás recordatorios sobre este evento.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleDeleteSubscription} color="error" variant="contained">
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
  );
};

export default Subscriptions;
