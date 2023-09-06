import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import Alert from "./Alert";
import Logo from "./Logo";

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
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/internal-error") {
        setError("Cuenta de correo invalida");
      }
      if (error.code === "auth/weak-password") {
        setError("Contraseña: Más de 6 caracteres");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Ya existe una cuenta con ese email");
      }
    }
  };
  console.log(error);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Logo />
      <div className="w-[300px] md:max-w-[300px]  flex flex-col justify-center items-center gap-5 p-5 shadow-sm bg-[#1F2937] rounded-md relative">
        {error && <Alert message={error} />}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center  w-[250px] items-center gap-3"
        >
          {error && <Alert message={error} />}
          <h1 className="w-full text-center mb-5">Registra tu cuenta</h1>
          <div className="flex flex-col justify-start items-start w-[250px]">
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
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Register
            </button>
            <Link
              // to="/recover"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            ></Link>
          </div>
        </form>
        <div className="flex justify-between items-center w-full p-2">
          <p className="">Already have an Account</p>
          <Link to="/login" className="text-[#45baf0] hover:text-[#3d7792]">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
