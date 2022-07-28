import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'

const root = document.getElementById('root')
if (root === null) throw new Error('root element not found')
createRoot(root).render(<BrowserRouter>
  <App/>
</BrowserRouter>)
