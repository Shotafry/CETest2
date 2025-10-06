// Servicio de autenticación local (fallback cuando MSW no funciona)

const users = [
  {
    id: 'user-admin',
    email: 'admin@cybesphere.local',
    password: 'Admin123!',
    role: 'Admin',
    name: 'Administrador CibESphere'
  },
  {
    id: 'user-organizer',
    email: 'organizer@cybesphere.local',
    password: 'Organizer123!',
    role: 'Organizer',
    name: 'Organizador de Eventos'
  },
  {
    id: 'user-attendee',
    email: 'attendee@cybesphere.local',
    password: 'Attendee123!',
    role: 'Attendee',
    name: 'Asistente a Eventos'
  }
];

const generateMockToken = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ 
    sub: user.id, 
    email: user.email, 
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 horas
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

export const authLocalService = {
  login: async (email, password) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const token = generateMockToken(user);
    
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    };
  },

  register: async (email, password, name) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password,
      role: 'Attendee',
      name: name || email.split('@')[0]
    };

    users.push(newUser);

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name
      }
    };
  },

  logout: () => {
    // No hay nada específico que hacer para logout local
  }
};
