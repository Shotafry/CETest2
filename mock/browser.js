import { setupWorker } from 'msw/browser';
import { handlers } from './handlers.js';

// Configurar el service worker para interceptar requests
export const worker = setupWorker(...handlers);

// Función para inicializar el mock en desarrollo
export const startMocking = async () => {
  if (import.meta.env.DEV) {
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
};
