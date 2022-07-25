import React from 'react'
import Header from './components/Header'
import tw from 'twin.macro'
import Hud from './components/Hud'

const AppContainer = tw.div`grid gap-y-4 justify-center min-w-full max-w-sm pt-8`

const App = () => {
  return (
    <AppContainer>
      <Header
        text="minesweeper"
        feature="flag"
        firstAction="alt"
        secondAction="click"
      />
      <Hud time={'000'} levels={['beginner', 'intermediate', 'expert']} mines={'010'} onReset={() => console.log('reset!')}/>
    </AppContainer>
  )
}

export default App
