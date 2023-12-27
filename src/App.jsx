import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { UsersProvider } from "./context/UsersContext";
import { VehiclesProvider } from "./context/VehiclesContext"

import './styles/style.css';
import Home from './routes/Home'
import Login from './routes/Login'

import ProtectedRoute from "./ProtectedRoute";
import ValidLoginPage  from "./ValidLoginPage";

function App() {
  useEffect(() => {
    async function expToken() {
      const token = localStorage.getItem('token');
      if (!token) {
        return null
      }
      const exp = JSON.parse(token).expiration;
      const now = Date.now();
      if (exp < now) {
        localStorage.removeItem('token');
        return null;
      }
    }
    expToken();
  }, []);
  return (
    <AuthProvider>
      <UsersProvider>
        <VehiclesProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<ValidLoginPage/>}>
                <Route path='/login' element={ <Login/>} />
              </Route>
              <Route element={<ProtectedRoute/>}>            
                <Route path='/' element={<Home/>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </VehiclesProvider>
      </UsersProvider>
    </AuthProvider>
  );
}
export default App;