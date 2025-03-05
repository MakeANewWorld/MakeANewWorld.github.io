import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../Root.css'
import { Play } from './Play'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Play />
  </StrictMode>,
)
