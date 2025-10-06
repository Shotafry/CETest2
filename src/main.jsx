import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import './index.css'
import App from './App.jsx'
import theme from './theme/theme.js'
import { AuthProvider } from './context/AuthContext.jsx'
import { startMocking } from '../mock/browser.js'

// Inicializar MSW en desarrollo
if (import.meta.env.DEV) {
  startMocking().then(() => {
    console.log('MSW iniciado correctamente');
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
