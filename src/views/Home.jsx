import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import CardEmployees from "../components/CardEmployees";
import AddTask from "../components/Tareas/AddTask";
import ListTask from "../components/Tareas/ListTask";
import { AccessAlarm } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import Spinner from "../components/spinner";

function Home() {
  const [datos, setDatos] = useState({
    nickName: "wwww",
    estado: "eee",
  });
  const [image, setImage] = useState("");
  const [loadSpinner, setLoadSpinner] = useState(true);
  const { user, logout, loading, searchOrCreateDocument, searchOrCreateImage } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getImage();
    getDatos();
  }, []);

  async function getDatos() {
    const datosSearched = await searchOrCreateDocument(user.email);
    setDatos(datosSearched);
    setLoadSpinner(false);
  }
  async function getImage() {
    setImage(await searchOrCreateImage(user.email, user.photoURL));
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
    // navigate("/login");  Ya no haria falta esto porque lo hace el componente ProtectedRoute
  };

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col justify-center items-center  relative">
      <Logo />
      <div
        className="absolute right-2 top-7 md:top-7 md:right-7 cursor-pointer hover:scale-110"
        onClick={handleLogout}
      >
        <LogoutIcon />
      </div>

      <CardEmployees
        setLoadSpinner={setLoadSpinner}
        loadSpinner={loadSpinner}
        getImage={getImage}
        getDatos={getDatos}
        image={image}
        nickName={datos.nickName || ""}
        estado={datos.estado || ""}
        setDatos={setDatos}
        datos={datos}
        rol="FullStack Developer"
      />
            <div className="flex flex-col justify-center items-start mt-10 text-start border rounded-md p-3 w-96">
        <h1 className="text-center w-full">Canales Publicos:</h1>
        <h1>- Los canales generales son dos, de momento no se pueden añadir</h1>
        <h1 className="mt-10 text-center w-full">Chats Privados:</h1>
        <h1>- Para añadir un contacto debes ingresar su email</h1>
        <h1>- Solo aparecera si este se encuentra registrado</h1>
        <h1>- Puedes hacer la prueba creandote dos usuarios ingresando con google desde dos cuentas diferentes</h1>


      </div>
    </div>
  );
}

export default Home;
