import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './User.tsx'
import '../../Root.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
