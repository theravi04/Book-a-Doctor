import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { getAuth } from "./auth";
import Profile from "./pages/Profile";

function App() {
  const auth = getAuth();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={auth ? <Profile/> : <Login />} />
        <Route
          path="/dashboard"
          element={
            auth ? (
              auth.user.role === "patient" ? <PatientDashboard /> :
              auth.user.role === "doctor" ? <DoctorDashboard /> :
              <AdminDashboard />
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
