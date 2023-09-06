import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import Alert from "../components/Alert";
import Logo from "../components/Logo";


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
      setError("Te enviamos un email para restablecer el password");
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
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Logo />
      <div className="w-[300px] md:max-w-[300px]  flex flex-col justify-center items-center gap-5 p-5 shadow-sm bg-[#1F2937] rounded-md relative">
        {error && <Alert message={error} />}
        <div>
        <h1 className=" w-full h-fit text-xs text-center mb-6">Ingrese su Email para restableces su password</h1>
          {/* <label htmlFor="email"
          className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white gap-3">Email</label> */}
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
            </div>
            {/* <div className="flex justify-between items-center mt-3 w-full"> */}
              <p
              // to="/recover"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              ></p>
          <button onClick={handleResetPassword}
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800">Restablecer</button>
              {/* </div> */}
      </div>
    </div>
  );
}
