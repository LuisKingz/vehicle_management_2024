import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export const RegisterUser = ({
  handleRegister,
  isEdit,
  setIsEdit,
  isVisible,
  setIsVisible,
  updateData,
  
}) => {
  const [validField, setValidField] = useState({
    nombre: {
      isInvalid: false,
      message: ``,
    },
    email: {
      isInvalid: false,
      message: ``,
    },
    password: {
      isInvalid: false,
      message: ``,
    },
    rol: {
      isInvalid: false,
      message: ``,
    },
  });
  const [user, setUser] = useState({
    _id: "",
    nombre: "",
    email: "",
    password: "",
    rol: "admin",
  });

  useEffect(() => {
    setUser({
      _id: isEdit ? updateData?._id : "",
      nombre: isEdit ? updateData?.nombre : "",
      email: isEdit ? updateData?.email : "",
      password: isEdit ? updateData?.password : "",
      rol: isEdit ? updateData?.rol : "admin",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ["nombre", "email", "password", "rol"];
    let isValid = true;
    let field = {};

    for (let i = 0; i < requiredFields.length; i++) {
      const requiredField = requiredFields[i];
      console.log(requiredField);
      switch (requiredField) {
        case "nombre":
          if (!user[requiredField]) {
            isValid = false;
            field[requiredField] = {
              isInvalid: true,
              message: `El campo ${requiredField} es requerido`,
            };
          } else {
            field[requiredField] = {
              isInvalid: false,
              message: `El campo ${requiredField} es requerido`,
            };
          }
          break;
        case "email":
          if (!/\S+@\S+\.\S+/.test(user[requiredField])) {
            isValid = false;
            field[requiredField] = {
              isInvalid: true,
              message: `El campo ${requiredField} no es valido, el formato debe ser: abc@example.com`,
            };
          } else if (
            user[requiredField] === "" ||
            user[requiredField] === null ||
            user[requiredField] === undefined
          ) {
            isValid = false;
            field[requiredField] = {
              isInvalid: true,
              message: `El campo ${requiredField} es requerido`,
            };
          } else {
            field[requiredField] = {
              isInvalid: false,
              message: ``,
            };
          }
          break;
        case "password":
          if (user[requiredField].length < 6) {
            isValid = false;
            field[requiredField] = {
              isInvalid: true,
              message: `El campo ${requiredField} debe ser de minimo 6 caracteres`,
            };
          } else if (
            user[requiredField] === "" ||
            user[requiredField] === null ||
            user[requiredField] === undefined
          ) {
            isValid = false;
            field[requiredField] = {
              isInvalid: true,
              message: `El campo ${requiredField} es requerido`,
            };
          } else {
            field[requiredField] = {
              isInvalid: false,
              message: ``,
            };
          }
          break;
        case "rol":
          field[requiredField] = {
            isInvalid: false,
            message: ``,
          };
          break;
        default:
          field[requiredField] = {
            isInvalid: false,
            message: ``,
          };
          break;
      }
    }

    if (isValid) {
      handleRegister(user);
      setValidField({
        nombre: {
          isInvalid: false,
          message: ``,
        },
        email: {
          isInvalid: false,
          message: ``,
        },
        password: {
          isInvalid: false,
          message: ``,
        },
        rol: {
          isInvalid: false,
          message: ``,
        },
      });
      setUser({
        _id: "",
        name: "",
        user: "",
        password: "",
        rol: "",
      });
    } else {
      setValidField({ ...field });
    }
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setIsEdit(false);
    setUser({
      _id: "",
      nombre: "",
      email: "",
      password: "",
      rol: "admin",
    });
  };

  return (
    <>
      <Modal show={isVisible} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Editar" : "Agregar"} Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                className={validField.nombre.isInvalid ? "is-invalid" : ""}
                as="input"
                name="nombre"
                id="nombre"
                type="text"
                placeholder="Nombre"
                value={user.nombre}
                onChange={(e) => setUser({ ...user, nombre: e.target.value })}
              />
              {validField.nombre.isInvalid ? (
                <Form.Control.Feedback type="invalid">
                  {validField.nombre.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className={validField.email.isInvalid ? "is-invalid" : ""}
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              {validField.email.isInvalid ? (
                <Form.Control.Feedback type="invalid">
                  {validField.email.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            {isEdit ? null : (
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  className={validField.password.isInvalid ? "is-invalid" : ""}
                  type="password"
                  placeholder="Contraseña"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                {validField.password.isInvalid ? (
                  <Form.Control.Feedback type="invalid">
                    {validField.password.message}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            )}

            <Form.Group controlId="formRol">
              <Form.Label>Rol</Form.Label>
              <Form.Control
                className={validField.rol.isInvalid ? "is-invalid" : ""}
                as="select"
                name="rol"
                value={user.rol}
                onChange={(e) => setUser({ ...user, rol: e.target.value })}
              >
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </Form.Control>
              {validField.rol.isInvalid ? (
                <Form.Control.Feedback type="invalid">
                  {validField.rol.message}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button
            variant={isEdit ? "warning" : "primary"}
            onClick={(e) => handleSubmit(e)}
          >
            {isEdit ? "Actualizar" : "Registrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
