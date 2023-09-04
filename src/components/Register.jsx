import React, { useState } from 'react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

function Register() {
const [user, setUser] = useState({
  email: "",
  password: "",
})
const [error, setError] = useState()
const {signup} = useAuth()
const navigate = useNavigate()

const handleChange = ({target: {name, value}}) => {
  setUser({...user, [name]: value})
}
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await signup(user.email, user.password)
    navigate("/")
  } catch (error) {
    setError(error.message)
  }
}
console.log(error)
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" placeholder='example@email.com' onChange={handleChange}/>

      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" placeholder='password' onChange={handleChange}/>
      <button>Register</button>
    </form>
  )
}

export default Register