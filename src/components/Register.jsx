import React, { useState } from 'react'

function Register() {
const [user, setUser] = useState({
  email: "",
  password: "",
})

const handleChange = ({target: {name, value}}) => {
  setUser({...user, [name]: value})
}
const handleSubmit = (e) => {
  e.preventDefault()
  console.log(user)
}

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