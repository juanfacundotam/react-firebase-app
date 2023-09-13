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
    estado: "eee"
  });
  const [image, setImage] = useState("");
  const [loadSpinner, setLoadSpinner] = useState(false);
  const { user, logout, loading, searchOrCreateDocument, searchOrCreateImage } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getImage();
    getDatos();
  }, []);

  async function getDatos() {
    const datosSearched = await searchOrCreateDocument(user.email);
    console.log(datosSearched)
    setDatos(datosSearched);
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
        nickName={datos.nickName || "" }
        estado={datos.estado || ""}
        setDatos={setDatos}
        datos={datos}
        rol="FullStack Developer"
      />
    </div>
  );
}

export default Home;
