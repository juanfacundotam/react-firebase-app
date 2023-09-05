import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Recover from "./components/Recover";

function App() {
  return (
    <div className=" h-screen">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<Recover />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

//time 47:00
