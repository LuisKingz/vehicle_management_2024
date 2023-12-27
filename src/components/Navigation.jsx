import React from "react";
import { Navigate } from "react-router-dom";
import userImg from "./../assets/img/user.png";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { ChangePassword } from "./modals/changePassword";

export const Navigation = () => {
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const { logout, user } = useAuth();

  useAuth();

  const handleEditPassword = () => {
    setIsChangePasswordVisible(true);
  };

  const handleLogout = async () => {
    await logout();
    return <Navigate to="/login" replace />;
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Gestión Vehicular
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <span className="navbar-text me-3">{user.nombre}</span>
            <div className="d-flex ">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    style={{ width: "20px" }}
                    className="img img-fluid icon-button"
                    src={userImg}
                    alt="user"
                  />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" onClick={handleEditPassword}>
                      Cambio de contraseña
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={handleLogout}>
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {isChangePasswordVisible && (
        <ChangePassword
          isChangePasswordVisible={isChangePasswordVisible}
          setIsChangePasswordVisible={setIsChangePasswordVisible}
        />
      )}
    </>
  );
};
