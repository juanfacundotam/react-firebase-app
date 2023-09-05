import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code)
      if(error.code === "auth/internal-error") {
        setError("Cuenta de correo invalida")
      }
      if(error.code === "auth/weak-password") {
        setError("Contraseña: Más de 6 caracteres")
      }
      if(error.code === "auth/email-already-in-use") {
        setError("Ya existe una cuenta con ese email")
      }
    }
  };
  console.log(error);
  return (
    <div>
      <form onSubmit={handleSubmit}>
      {error && <Alert message={error}/>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="example@email.com"
          onChange={handleChange}
          />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
