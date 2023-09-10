import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'
import Spinner from './spinner'

function ProtectedRoute({children}) {
  const {user, loading} = useAuth()

  if(loading) return (
  <div className=" flex h-screen justify-center items-center">
    <Spinner/>
  </div>)
  
  if(!user) return <Navigate to="/login"/>

  return (<>{children}</>)
}

export default ProtectedRoute