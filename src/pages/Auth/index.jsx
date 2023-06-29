import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import Signup from './SignUp'
import SignIn from './SignIn'

export const AuthLayout = () => {
  const pocketbaseAuth = localStorage.getItem('pocketbase_auth')

  if (pocketbaseAuth) return <Navigate to='/' />

  return (
    <Routes>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='*' element={
        <Navigate to='/auth/signin' replace />
      } />
    </Routes>
  )
}