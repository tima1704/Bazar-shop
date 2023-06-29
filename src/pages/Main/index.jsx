import React from 'react'
import { Navigate } from 'react-router-dom'
import Sidebar from '../../components/Main/Sidebar'
import NoAccess from '../../components/pageSections/NoAccess'

export const MainPage = () => {
  
  const pocketbaseAuth = localStorage.getItem('pocketbase_auth')

  if(!pocketbaseAuth) return <NoAccess />

  return (
    <div>
      <Sidebar>
        <h1>Home page</h1>
      </Sidebar>
    </div>
  )
}
