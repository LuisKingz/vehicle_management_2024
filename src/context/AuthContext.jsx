import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, logoutRequest, verifyTokenRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      if (res.data.token) {
        setIsAuthenticated(true);
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);

        const item = {
          token: res.data.token,
          expiration: expirationDate,
        };
        localStorage.setItem("token", JSON.stringify(item));
        setErrors([]);
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const res = await logoutRequest({ token: JSON.parse(token).token });
      if (res.data) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      console.log("Error al cerrar sesión");
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest({
          token: JSON.parse(token).token,
        });
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          localStorage.removeItem("token");
          return setUser(null);
        }
        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, errors, signin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
