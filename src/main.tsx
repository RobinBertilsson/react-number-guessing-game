import { createRoot } from 'react-dom/client'
import { Game } from './components/Game/Game'
import React from 'react'
import './index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
)
