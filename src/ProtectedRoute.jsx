import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    // TODO: add spinner
    const spiner = (
      <div className="container z-30 w-full h-full flex justify-center items-center bg-white bg-opacity-50 fixed inset-0 z-50 overflow-x-hidden overflow-y-auto ">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return spiner;
  }
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
