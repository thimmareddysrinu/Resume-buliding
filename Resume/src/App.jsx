import { useState } from 'react'

import './App.css'

import Allcall from './Components/Allcall'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SignUp from './Components/Accounts/SignUp';
import Login from './Components/Accounts/Login';
import Otpverify from './Components/Accounts/Otpverify';
import Profile from './Components/Profile';

function App() {
  

  return (
    <BrowserRouter>

    <Routes>
      <Route path='/' element={<Allcall/>}/>
       <Route path='/signup' element={<SignUp/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/otpverify' element={<Otpverify/>}/>
       <Route path='/profile' element={<Profile/>}/>


    </Routes>
    </BrowserRouter>
 
       
  
    
  )
}

export default App
