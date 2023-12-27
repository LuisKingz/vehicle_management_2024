import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import show from "../assets/img/show.png";
import hide from "../assets/img/hide.png";

function Login() {
  const { register, handleSubmit } = useForm();
  const { signin, isAuthenticated, errors } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if(errors.length === 0){
      console.log("false");
      setShowAlert(false);
    }else{
      console.log("true");
      setShowAlert(true);
    }
  },[errors])
  useAuth();

  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex justify-content-center align-items-center card-container">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center">Iniciar Sesión</h3>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="user" className="form-label">
                Correo electrónico :
              </label>
              <input
                type="text"
                {...register("email", { required: true })}
                className="form-control"
                placeholder="ejemplo@gmail.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña:
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  className="form-control"
                  placeholder="Contraseña"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={showPassword ? hide : show}
                    alt="show"
                    width="20"
                    height="20"
                    className="img img-fluid"
                  />
                </button>
              </div>
            </div>
            {showAlert ? <p className="text-danger">{errors}</p> : null}
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Iniciar Sesion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
