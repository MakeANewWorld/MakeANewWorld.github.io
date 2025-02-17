import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Play.tsx'
import '../../Root.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
