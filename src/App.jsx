import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Recover from "./views/Recover";
import Register from "./views/Register";
import Home from "./views/Home";
import Login from "./views/Login";
import Chat from "./views/Chat";

function App() {
  return (
    <div className="min-h-screen overflor-hidden bg-[#2B2D31] text-white">
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
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat/>
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
