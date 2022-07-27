import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game from './components/Game/Game'

const root = document.getElementById('root')
if (root === null) throw new Error('root element not found')
createRoot(root).render(<Game/>)
