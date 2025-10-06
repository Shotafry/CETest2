import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
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
  Avatar
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const SubscriptionsSimple = () => {
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
            eventDate: '10-12 Mayo 2026',
            email: user?.email || 'user@example.com',
            remindDays: 7,
            createdAt: '1 Oct 2025',
            status: 'active'
          },
          {
            id: 'sub-2',
            eventId: 'ev-valencia',
            eventTitle: 'Valencia Cyber Meetup',
            eventDate: '12 Abril 2026',
            email: user?.email || 'user@example.com',
            remindDays: 3,
            createdAt: '15 Sep 2025',
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
        message: 'Te recordamos que CyberCon Madrid será en 7 días',
        sentAt: '3 May 2026, 09:00',
        read: false
      },
      {
        id: 'notif-2',
        type: 'reminder',
        eventTitle: 'Valencia Cyber Meetup',
        message: 'Te recordamos que Valencia Cyber Meetup será en 3 días',
        sentAt: '9 Abr 2026, 18:00',
        read: true
      },
      {
        id: 'notif-3',
        type: 'confirmation',
        eventTitle: 'BCN SecDays',
        message: 'Confirmación de suscripción a BCN SecDays',
        sentAt: '1 Oct 2025, 12:00',
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
                    {subscriptions.map((subscription, index) => (
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
                                  label="Activa"
                                  color="primary"
                                  size="small"
                                />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  📅 {subscription.eventDate}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  📧 {subscription.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  ⏰ Recordatorio: {subscription.remindDays} días antes
                                </Typography>
                                <Typography variant="body2" color="primary.main">
                                  Suscrito el {subscription.createdAt}
                                </Typography>
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
                    ))}
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
                                {notification.sentAt}
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

export default SubscriptionsSimple;
