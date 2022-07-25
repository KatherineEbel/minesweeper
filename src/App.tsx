import React from 'react'
import Header from './components/Header'
import tw from 'twin.macro'

const AppContainer = tw.div`grid justify-center min-w-full min-h-screen max-w-sm pt-8`

const App = () => {
  return (
    <AppContainer>
      <Header
        text="minesweeper"
        feature="flag"
        firstAction="alt"
        secondAction="click"
      />
    </AppContainer>
  )
}

export default App
