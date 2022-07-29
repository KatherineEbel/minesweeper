import {Route, Routes }  from 'react-router-dom'
import React, {Suspense}  from 'react'

const Footer = () => {
  return (
    <div className='attribution'>
      <a className='text-slate-100 mr-1' target="_blank" href="https://icons8.com/icon/47427/naval-mine" rel="noreferrer">Naval Mine</a>
      icon by <a target="_blank" href="https://icons8.com" rel="noreferrer">Icons8</a>
    </div>
  )
}

const NotFound = () => {
  return (
    <div className='grid place-items-center min-h-screen'>
      <h2>404, Page Not Found</h2>
    </div>
  )
}

const Minesweeper = React.lazy(() => import('pages/MineSweeper'))

const App = () => {
  return (
    <Routes>
      <Route path='/' element={
        <Suspense fallback={<div className='grid place-items-center min-h-screen'>Loading</div>}>
          <Minesweeper/>
          <Footer/>
        </Suspense>
      }/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App