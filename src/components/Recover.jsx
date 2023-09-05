import React, { useState } from "react";
import Alert from "./Alert";
import { useAuth } from "../context/authContext";


export default function Recover() {
    const { resetPassword} = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  const handleResetPassword = async () => {
    if (!user.email) return setError("Ingrese su email");
    try {
        await resetPassword(user.email)
        setError("Hemos enviado un enlace para restablecer tu contraseña")
    } catch (error) {
        setError(error.menssage)
    }
    setError("")
    console.log("reset");
  };
  return (
    <div>
      {error && <Alert message={error} />}
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="example@email.com"
            onChange={handleChange}
        />
        <button onClick={handleResetPassword}>Login</button>
      </div>
    </div>
  );
}
