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
  const [tareas, setTareas] = useState([]);
  const [image, setImage] = useState("");
  const { user, logout, loading, searchOrCreateDocument, searchOrCreateImage } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getImage();
    getTareas();
  }, []);

  async function getTareas() {
    const tasksSearched = await searchOrCreateDocument(user.email);
    setTareas(tasksSearched);
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

  if (loading) return <h1>Loading</h1>;

  return (
    <div className="flex flex-col justify-center items-center  relative">
      <Logo />
      <div
        className="absolute right-2 top-7 md:top-7 md:right-7 cursor-pointer hover:scale-110"
        onClick={handleLogout}
      >
        <LogoutIcon />
      </div>

      {/* <img src={user.photoURL} alt="" className="w-16 h-16 rounded-full" /> */}
      {/* <h1>Wellcome {user.displayName || user.email}</h1> */}
      <CardEmployees
        image={image}
        name={user.displayName || user.email}
        rol="FullStack Developer"
      />

      {/* <div className="border-b-2 w-96"></div> */}
      {/* <AddTask tareas={tareas} setTareas={setTareas} /> */}
      {/* <ListTask tareas={tareas} setTareas={setTareas} /> */}
    </div>
  );
}

export default Home;
