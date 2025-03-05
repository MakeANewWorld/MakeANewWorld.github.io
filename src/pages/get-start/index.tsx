import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GetStart } from './GetStart.tsx'
import '../../Root.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GetStart />
  </StrictMode>,
)
