import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error)
    }
    // navigate("/login");  Ya no haria falta esto porque lo hace el componente ProtectedRoute
  };

if(loading) return (<h1>Loading</h1>)

  return (
    <div>
      <h1>Wellcome {user.displayName || user.email}</h1>

      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Home;
