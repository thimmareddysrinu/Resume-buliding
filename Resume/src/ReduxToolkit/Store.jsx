// src/ReduxToolkit/Store.jsx
import { configureStore } from '@reduxjs/toolkit'
import inputsending from './Reducers/Inputsending'
import SignupReducer from'./Reducers/Account-authentication/SignupReducer'
import LoginReducer from'./Reducers/Account-authentication/LoginReducer'
import VerifyOtp from './Reducers/Account-authentication/VerifyOtp'
import { api } from './RtkApi'

import GetUserDetails from './Reducers/Account-authentication/GetUserDetails'

import ConversationMessages from './Reducers/ConversationMSG'

export const store = configureStore({
  reducer: {
    inputsending: inputsending,
    ConversationMessages:ConversationMessages,
    signin:SignupReducer,
    login:LoginReducer,
    Otpverify:VerifyOtp,
    UserDetails:GetUserDetails,







   [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

