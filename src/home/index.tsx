import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Home.tsx'
import '../Root.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
