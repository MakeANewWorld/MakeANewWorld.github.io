import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/Root.css'
import { BlocklyApp } from './Blockly'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlocklyApp />
  </StrictMode>,
)