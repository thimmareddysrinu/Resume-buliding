// src/ReduxToolkit/Store.jsx
import { configureStore } from '@reduxjs/toolkit'
import inputsending from './Reducers/Inputsending'

export const store = configureStore({
  reducer: {
    searchinput: inputsending
  }
})

