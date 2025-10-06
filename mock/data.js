// Datos semilla para CibESphere
export const users = [
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

export const events = [
  {
    id: 'ev-madrid',
    title: 'CyberCon Madrid',
    shortDescription: 'El mayor congreso de ciberseguridad de la capital',
    description: 'CyberCon Madrid es el evento más importante de ciberseguridad en la capital española. Durante tres días, expertos internacionales compartirán las últimas tendencias en seguridad informática, amenazas emergentes y soluciones innovadoras. El evento incluye conferencias magistrales, talleres prácticos, competencias de hacking ético y una zona de exposición con las principales empresas del sector.',
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
    description: 'BCN SecDays es un evento de tres días dedicado a la ciberseguridad en Barcelona. Dirigido tanto a profesionales como a estudiantes, el evento combina charlas técnicas, demostraciones en vivo y sesiones de networking. Los asistentes podrán aprender sobre las últimas vulnerabilidades, técnicas de pentesting y estrategias de defensa cibernética.',
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
    description: 'El Valencia Cyber Meetup es un encuentro mensual informal donde profesionales de la ciberseguridad se reúnen para compartir conocimientos, experiencias y establecer contactos. Cada sesión incluye presentaciones cortas sobre temas actuales, discusiones grupales y tiempo para networking.',
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
    description: 'Sevilla HackFest es un festival de dos días centrado en el hacking ético y la ciberseguridad ofensiva. El evento incluye competencias CTF, talleres de hacking, demostraciones de exploits y charlas sobre las últimas técnicas de penetration testing. Ideal para hackers éticos, pentesters y entusiastas de la seguridad.',
    startDate: '2026-09-03T09:00:00Z',
    endDate: '2026-09-04T19:00:00Z',
    location: {
      lat: 37.3891,
      lng: -5.9845,
      city: 'Sevilla',
      region: 'Andalucía',
      address: 'Universidad de Sevilla - Escuela Técnica Superior de Ingeniería Informática'
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
    description: 'Bilbao InfoSec es una conferencia de tres días dedicada a la seguridad de la información y la protección de datos. El evento reúne a expertos en compliance, auditores de seguridad, CISOs y profesionales de la privacidad para discutir las mejores prácticas en gestión de riesgos, cumplimiento normativo y gobernanza de la seguridad.',
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
    description: 'Zaragoza CTF & Talks combina una intensa competencia de Capture The Flag con charlas técnicas especializadas. Durante dos días, los equipos competirán en desafíos de criptografía, forense digital, ingeniería inversa y explotación de binarios, mientras que las charlas cubrirán temas avanzados de ciberseguridad.',
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

export const subscriptions = [];

// Función para generar tokens JWT simulados
export const generateMockToken = (user) => {
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
