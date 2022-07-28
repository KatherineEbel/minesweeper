import {Route, Routes, useSearchParams} from 'react-router-dom'
import React, {Suspense}  from 'react'

const NotFound = () => {
  return (
    <div className='grid place-items-center min-h-screen'>
      <h2>404, Page Not Found</h2>
    </div>
  )
}

const Minesweeper = React.lazy(() => import('./pages/Minesweeper'))

const App = () => {
  const [searchParams] = useSearchParams()
  const level = searchParams.get('level') || ''

  console.log(level)
  return (
    <Routes>
      <Route path='/' element={
        <Suspense fallback={<div className='grid place-items-center min-h-screen'>Loading</div>}>
          <Minesweeper/>
        </Suspense>
      }/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App