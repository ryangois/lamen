import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/latin-ext-300.css'
import '@fontsource/inter/latin-ext-400.css'
import '@fontsource/inter/latin-ext-500.css'
import '@fontsource/cinzel/latin-ext-400.css'
import '@fontsource/cinzel/latin-ext-500.css'
import '@fontsource/cinzel/latin-ext-600.css'
import '@fontsource/cinzel/latin-ext-700.css'
import '@fontsource/cinzel/latin-ext-800.css'
import './index.css'
import RootApp from './RootApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Offline support is optional; the online experience remains available.
    })
  })
}
