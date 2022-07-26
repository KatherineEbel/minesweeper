import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Field} from './types'
import Game from './components/Game/Game'

const staticField: Field = [
  [9,2,9,2,0,0,1,1,1,1,1,1],
  [1,2,2,2,1,0,1,9,1,1,9,1],
  [0,0,1,9,10,0,2,2,2,1,1,1],
  [0,0,10,10,1,0,1,9,1,2,2,2],
  [0,1,1,2,2,9,1,1,1,0,0,0],
  [0,1,9,3,9,2,10,0,0,2,1,1],
  [0,2,2,4,9,2,10,1,1,1,9,1],
  [0,1,9,2,1,1,1,9,1,2,2,2],
  [0,1,10,10,0,0,1,1,1,1,9,1],
  [0,1,10,10,0,0,1,1,1,1,9,1],
  [0,1,1,1,0,0,1,1,1,1,9,1],
  [0,1,1,1,0,0,1,1,1,1,9,1],
]


const root = document.getElementById('root')
if (root === null) throw new Error('root element not found')
createRoot(root).render(<Game field={staticField}/>)
