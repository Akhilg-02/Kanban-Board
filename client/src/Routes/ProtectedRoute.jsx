import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ element }) => {
  const user  = sessionStorage.getItem("user")

  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
