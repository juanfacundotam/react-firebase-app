import React, {useState, useEffect} from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import CardEmployees from "../components/CardEmployees";
import AddTask from "../components/Tareas/AddTask";
import ListTask from "../components/Tareas/ListTask";



function Home() {
  const [tareas, setTareas] = useState([]);
  const { user, logout, loading, searchOrCreateDocument} = useAuth();
  const navigate = useNavigate();

  const arrayTasks = [
    {id: 1, description: "Foto Pedro", url: "https://picsum.photos/420"},
    {id: 2, description: "Foto Juan", url: "https://picsum.photos/420"},
    {id: 3, description: "Foto Tomas", url: "https://picsum.photos/420"}, 
  ]

useEffect(()=>{
  getTareas()
},[])

async function getTareas(){
  const tasksSearched = await searchOrCreateDocument(user.email)
  setTareas(tasksSearched)
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
    <div className="flex flex-col justify-center items-center h-fit relative">
      <Logo />
      <div className="absolute right-2 top-7 md:top-7 md:right-7 ">
        <button
          onClick={handleLogout}
          className="relative  border border-gray-600 rounded px-2 pb-1 overflow-hidden group bg-transparent  hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-400 text-white hover:ring-2 transition-all ease-out duration-300"
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative text-xs">Logout</span>
        </button>
      </div>
      <>
        {/* <img src={user.photoURL} alt="" className="w-16 h-16 rounded-full" />
        <h1>Wellcome {user.displayName || user.email}</h1> */}
        <CardEmployees image={user.photoURL} name={user.displayName || user.email} rol="FullStack Developer"/>
      </>

      <div className="border-b-2 w-96"></div>
        <AddTask/>
        <ListTask tareas={tareas}/>
    </div>
  );
}

export default Home;

