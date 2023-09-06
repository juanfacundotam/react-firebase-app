import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import Alert from "./Alert";
import logo from "../assets/TAMCO.webp";
import Logo from "./Logo";

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

    if (!user.email) {
      setError("Ingrese una cuenta de email");
      return;
    }
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        setError("Cuenta de correo inválida");
      } else if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      } else if (error.code === "auth/weak-password") {
        setError("Contraseña débil: Debe tener al menos 6 caracteres");
      } else if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado. Verifica tus credenciales");
      } else if (error.code === "auth/too-many-requests") {
        setError(
          "Has superado el número máximo de intentos. Intenta más tarde"
        );
      } else if (error.code === "auth/network-request-failed") {
        setError("Error de red. Verifica tu conexión a Internet");
      } else if (error.code === "auth/user-disabled") {
        setError("Tu cuenta ha sido deshabilitada. Contacta al soporte");
      } else if (error.code === "auth/missing-password") {
        setError("Ingrese su contraseña");
      } else {
        setError(
          "Se ha producido un error inesperado. Por favor, inténtalo de nuevo más tarde"
        );
      }
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Logo />
      <div className="w-[300px] md:max-w-[300px]  flex flex-col justify-center items-center gap-5 p-5 shadow-sm bg-[#1F2937] rounded-md relative">
        {error && <Alert message={error} />}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center  w-[250px] items-center gap-3"
        >
          <div className="flex flex-col justify-start items-start w-[250px]">
          <h1 className="w-full text-center mb-5">Ingresa tu cuenta</h1>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className="flex flex-col justify-start items-start  w-[250px]">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </div>
          <div className="flex justify-between items-center mt-3 w-full">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800">
              Login
            </button>
            <Link
              to="/recover"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
        <div className="flex justify-between items-center w-full p-2">
          <p className="">Don´t have an Account</p>

          <Link to="/register" className="text-[#45baf0] hover:text-[#3d7792]">
            Signup
          </Link>
        </div>
        <button
          onClick={handleGoogleSignin}
          type="button"
          className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
        >
          <svg
            className="w-4 h-4 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="currentColor"
            viewBox="0 0 18 19"
          >
            <path
              fillRule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clipRule="evenodd"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
