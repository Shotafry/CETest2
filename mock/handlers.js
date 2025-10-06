import { http, HttpResponse } from 'msw';
import { users, events, subscriptions, generateMockToken } from './data.js';

const API_BASE = '/api';

export const handlers = [
  // Auth endpoints
  http.post(`${API_BASE}/auth/login`, async ({ request }) => {
    const { email, password } = await request.json();
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return HttpResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const token = generateMockToken(user);
    
    return HttpResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });
  }),

  http.post(`${API_BASE}/auth/register`, async ({ request }) => {
    const { email, password, name } = await request.json();
    
    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return HttpResponse.json(
        { error: 'El usuario ya existe' },
        { status: 409 }
      );
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      role: 'Attendee',
      name: name || email.split('@')[0]
    };

    users.push(newUser);

    return HttpResponse.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name
      }
    }, { status: 201 });
  }),

  // Events endpoints
  http.get(`${API_BASE}/events`, () => {
    return HttpResponse.json(events);
  }),

  http.get(`${API_BASE}/events/:id`, ({ params }) => {
    const event = events.find(e => e.id === params.id);
    
    if (!event) {
      return HttpResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    return HttpResponse.json(event);
  }),

  http.post(`${API_BASE}/events`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Token de autorización requerido' },
        { status: 401 }
      );
    }

    const eventData = await request.json();
    
    const newEvent = {
      id: `ev-${Date.now()}`,
      ...eventData,
      logoUrl: eventData.logoUrl || 'https://via.placeholder.com/200x200/00bcd4/ffffff?text=Nuevo+Evento'
    };

    events.push(newEvent);

    return HttpResponse.json(newEvent, { status: 201 });
  }),

  http.patch(`${API_BASE}/events/:id`, async ({ params, request }) => {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Token de autorización requerido' },
        { status: 401 }
      );
    }

    const eventIndex = events.findIndex(e => e.id === params.id);
    
    if (eventIndex === -1) {
      return HttpResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    const updates = await request.json();
    events[eventIndex] = { ...events[eventIndex], ...updates };

    return HttpResponse.json(events[eventIndex]);
  }),

  http.delete(`${API_BASE}/events/:id`, ({ params, request }) => {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { error: 'Token de autorización requerido' },
        { status: 401 }
      );
    }

    const eventIndex = events.findIndex(e => e.id === params.id);
    
    if (eventIndex === -1) {
      return HttpResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    events.splice(eventIndex, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  // Upload endpoint (mock)
  http.post(`${API_BASE}/uploads`, async ({ request }) => {
    // Simular subida de archivo
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return HttpResponse.json(
        { error: 'No se proporcionó archivo' },
        { status: 400 }
      );
    }

    // Generar URL mock
    const mockUrl = `https://via.placeholder.com/200x200/00bcd4/ffffff?text=${encodeURIComponent(file.name)}`;
    
    return HttpResponse.json({ url: mockUrl });
  }),

  // Subscriptions endpoint
  http.post(`${API_BASE}/subscriptions`, async ({ request }) => {
    const subscriptionData = await request.json();
    
    const newSubscription = {
      id: `sub-${Date.now()}`,
      ...subscriptionData,
      createdAt: new Date().toISOString()
    };

    subscriptions.push(newSubscription);

    return HttpResponse.json(newSubscription);
  })
];
