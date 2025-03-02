import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "../Components/Registration";
import  Login from '../Components/Login'
import Dashboard from "../Components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;