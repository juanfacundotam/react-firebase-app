import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        setError("Cuenta de correo invalida");
      }
      if (error.code === "auth/wrong-password") {
        setError("Password incorrecto");
      }
      if (error.code === "auth/weak-password") {
        setError("Contraseña: Más de 6 caracteres");
      }
      if (error.code === "auth/user-not-found") {
        setError("Cuenta de correo inexistente");
      }
      if (error.code === "auth/too-many-requests") {
        setError("Has superado la cantidad de intentos");
      }
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  };

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
        <button>Login</button>
      </form>

      <button onClick={handleGoogleSignin}>Login with Google</button>
    </div>
  );
}

export default Login;
