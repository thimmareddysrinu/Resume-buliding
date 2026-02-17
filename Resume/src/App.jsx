import { useState } from 'react'

import './App.css'

import Allcall from './Components/Allcall'
import {Provider} from 'react-redux'
import { store } from './ReduxToolkit/Store'

function App() {
  

  return (
    <Provider store={store}>
        <Allcall/>
  
    </Provider>
  )
}

export default App
