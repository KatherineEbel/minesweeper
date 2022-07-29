import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {store} from 'store'

const root = document.getElementById('root')
if (root === null) throw new Error('root element not found')
createRoot(root).render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)
