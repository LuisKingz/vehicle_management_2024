import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ValidLoginPage() {
    const { isAuthenticated } = useAuth();
  
    if (isAuthenticated) {
      return <Navigate to="/" replace />
    } 
    return <Outlet />
  }
  
  export default ValidLoginPage;