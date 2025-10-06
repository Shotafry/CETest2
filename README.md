# CibESphere Frontend

Este es el frontend de CibESphere, una aplicación web para una comunidad de ciberseguridad en España. La aplicación permite a los usuarios explorar eventos, ver detalles de eventos, suscribirse a ellos, y a los organizadores gestionar sus propios eventos.

## Características Implementadas

- **Landing Page (PR1)**: Mapa interactivo con eventos, filtros por región y categoría, y búsqueda.
- **Página de Detalle de Evento (PR2)**: Información detallada de cada evento, mini-mapa de ubicación y formulario de suscripción.
- **Autenticación (PR3)**: Registro, inicio de sesión y gestión de sesiones con roles (Admin, Organizador, Asistente).
- **Panel de Organizador (PR4)**: Funcionalidad CRUD (Crear, Leer, Actualizar, Eliminar) para eventos.
- **Sistema de Suscripciones y Recordatorios (PR5)**: Gestión de suscripciones de usuario y notificaciones simuladas.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript que añade tipado estático.
- **Vite**: Herramienta de construcción rápida para proyectos web.
- **Material-UI (MUI)**: Biblioteca de componentes React para un diseño rápido y responsivo.
- **React Leaflet**: Para la integración de mapas interactivos.
- **MSW (Mock Service Worker)**: Para simular la API REST y los datos del backend.
- **date-fns**: Para el manejo y formato de fechas.

## Configuración del Proyecto

Para configurar y ejecutar el proyecto localmente, sigue los siguientes pasos:

1.  **Clonar el repositorio** (si aplica, en este caso ya estás en el directorio del proyecto):
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd cibessphere-frontend
    ```

2.  **Instalar dependencias**:
    Asegúrate de tener `pnpm` instalado. Si no, puedes instalarlo globalmente:
    ```bash
    npm install -g pnpm
    ```
    Luego, instala las dependencias del proyecto:
    ```bash
    pnpm install
    ```

3.  **Variables de Entorno**:
    Crea un archivo `.env` en la raíz del proyecto y copia el contenido de `.env.example`:
    ```bash
    cp .env.example .env
    ```
    Asegúrate de que `VITE_API_BASE_URL` apunte a tu API de desarrollo o a la URL de MSW.

4.  **Iniciar el Mock Service Worker (MSW)**:
    MSW se inicia automáticamente en modo de desarrollo. Si necesitas regenerar los mocks, puedes usar:
    ```bash
    pnpm run msw init
    ```

5.  **Ejecutar la aplicación en modo desarrollo**:
    ```bash
    pnpm run dev
    ```
    La aplicación se abrirá en `http://localhost:5173` (o un puerto similar).

## Estructura de Archivos Clave

-   `src/App.jsx`: Componente principal que define las rutas.
-   `src/main.jsx`: Punto de entrada de la aplicación, configura `AuthProvider` y `ThemeProvider`.
-   `src/context/AuthContext.jsx`: Contexto de autenticación para gestionar el estado del usuario.
-   `src/components/Navigation.jsx`: Barra de navegación principal.
-   `src/components/ProtectedRoute.jsx`: Componente para proteger rutas basadas en la autenticación.
-   `src/pages/Landing/LandingSimple.jsx`: Página principal con el mapa de eventos y filtros.
-   `src/pages/EventDetail/EventDetail.jsx`: Página para ver los detalles de un evento específico.
-   `src/pages/Auth/Login.jsx`: Página de inicio de sesión.
-   `src/pages/Auth/Register.jsx`: Página de registro de usuario.
-   `src/pages/Organizer/OrganizerPanel.jsx`: Panel para que los organizadores gestionen sus eventos.
-   `src/pages/Subscriptions/SubscriptionsSimple.jsx`: Página para que los usuarios gestionen sus suscripciones.
-   `src/services/api.js`: Servicio para interactuar con la API (o MSW).
-   `src/services/authLocal.js`: Servicio de autenticación local (fallback).
-   `src/theme/theme.js`: Configuración del tema de Material-UI.
-   `mock/`: Contiene la configuración y los handlers de MSW.

## Scripts Disponibles

-   `pnpm run dev`: Inicia el servidor de desarrollo de Vite.
-   `pnpm run build`: Compila la aplicación para producción.
-   `pnpm run preview`: Sirve la aplicación compilada localmente.
-   `pnpm run lint`: Ejecuta ESLint para verificar el código.
-   `pnpm run test`: Ejecuta los tests (actualmente con Vitest).
-   `pnpm run msw init`: Inicializa MSW.

## Contacto

Para cualquier pregunta o sugerencia, por favor contacta a [Manus AI](mailto:manus.ai@example.com).
