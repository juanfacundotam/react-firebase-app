import React, { useState } from "react";
import Alert from "./Alert";
import { useAuth } from "../context/authContext";

export default function Recover() {
  const { resetPassword } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleResetPassword = async () => {
    if (!user.email) return setError("Ingrese su email");
    try {
      await resetPassword(user.email);
      setError("Te enviamos un email para restablecer el password")
      // Si llegamos aquí, la llamada a resetPassword fue exitosa
      // setError("Hemos enviado un enlace para restablecer tu contraseña");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("La dirección de correo electrónico no es válida.");
          // Puedes mostrar un mensaje de error al usuario si es necesario.
          break;
        case "auth/user-not-found":
            setError(
            "No se encontró ningún usuario con esta dirección de correo electrónico."
          );
          // Puedes mostrar un mensaje de error al usuario si es necesario.
          break;
        default:
            setError("Se produjo un error desconocido:", error);
          // Puedes manejar otros errores aquí o mostrar un mensaje genérico al usuario.
          break;
      }
    }
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
