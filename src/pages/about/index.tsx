import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../Root.css'
import { About } from './About'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <About />
  </StrictMode>,
)
