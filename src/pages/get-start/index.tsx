import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Get-start.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
