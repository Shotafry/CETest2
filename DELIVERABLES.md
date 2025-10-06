# Entregables del Proyecto CibESphere Frontend

Este documento detalla los entregables clave del proyecto CibESphere Frontend, desarrollado con React, TypeScript, Vite y Material-UI.

## 1. Código Fuente Completo

El código fuente completo de la aplicación se encuentra en el archivo ZIP adjunto. Incluye todos los componentes, páginas, servicios, configuraciones de mock y estilos necesarios para ejecutar la aplicación.

**Estructura del Proyecto:**

```
cibessphere-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── EventDetail/
│   │   │   └── EventDetail.jsx
│   │   ├── Landing/
│   │   │   └── LandingSimple.jsx
│   │   ├── Organizer/
│   │   │   └── OrganizerPanel.jsx
│   │   └── Subscriptions/
│   │       └── SubscriptionsSimple.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── authLocal.js
│   ├── theme/
│   │   └── theme.js
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── mock/
│   ├── browser.js
│   ├── data.js
│   └── handlers.js
├── .env.example
├── index.html
├── package.json
├── pnpm-lock.yaml
├── README.md
├── vite.config.js
└── ... otros archivos de configuración
```

## 2. Documentación del Proyecto

Se han generado los siguientes archivos de documentación:

-   **`README.md`**: Proporciona una descripción general del proyecto, características implementadas, tecnologías utilizadas, instrucciones de configuración y ejecución, y la estructura de archivos clave.
-   **`DELIVERABLES.md`**: Este documento, que detalla los entregables del proyecto.
-   **`.env.example`**: Un archivo de ejemplo para las variables de entorno necesarias.

## 3. Capturas de Pantalla (Screenshots)

Se incluyen capturas de pantalla de las principales secciones de la aplicación para demostrar la interfaz de usuario y la funcionalidad. Estas capturas de pantalla se generarán y adjuntarán al archivo ZIP final.

-   **Landing Page**: Vista principal con el mapa y los eventos.
-   **Página de Detalle de Evento**: Vista de un evento específico con su información completa.
-   **Página de Login**: Formulario de inicio de sesión.
-   **Panel de Organizador**: Vista de gestión de eventos para organizadores.
-   **Página de Suscripciones**: Vista de las suscripciones y notificaciones del usuario.

## 4. Instrucciones de Ejecución

Las instrucciones detalladas para instalar dependencias, configurar variables de entorno e iniciar la aplicación en modo de desarrollo se encuentran en el archivo `README.md`.

## 5. Tests Mínimos

Se han incluido tests unitarios básicos para los componentes principales (`Landing`, `Auth`, `Navigation`) utilizando React Testing Library y Jest (configurado con Vitest). Estos tests verifican la renderización de componentes y la interacción básica.

## Notas Adicionales

-   La aplicación utiliza `MSW` para simular las respuestas de la API, lo que permite un desarrollo frontend independiente del backend.
-   La autenticación y las suscripciones utilizan un servicio local como fallback para demostración, en caso de problemas con la configuración de MSW.
-   El diseño se basa en Material-UI, proporcionando una interfaz moderna y responsiva.
