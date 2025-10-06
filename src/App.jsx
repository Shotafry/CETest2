import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navigation from './components/Navigation';
import Landing from './pages/Landing/LandingSimple';
import EventDetail from './pages/EventDetail/EventDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import OrganizerPanel from './pages/Organizer/OrganizerPanel';
import Subscriptions from './pages/Subscriptions/SubscriptionsSimple';
import './App.css';

function App() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/organizer" 
          element={
            <ProtectedRoute requiredRole="Organizer">
              <OrganizerPanel />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/subscriptions" 
          element={
            <ProtectedRoute>
              <Subscriptions />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Box>
  );
}

export default App;
