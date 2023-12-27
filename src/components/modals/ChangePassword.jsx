import React, { useState } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
import show from "../../assets/img/show.png";
import hide from "../../assets/img/hide.png";
import { useAuth } from "../../context/AuthContext";
import { useUsers } from "../../context/UsersContext";
import Swal from "sweetalert2";

export const ChangePassword = ({
  isChangePasswordVisible,
  setIsChangePasswordVisible,
}) => {
  const { user } = useAuth();
  const { changePassword } = useUsers();
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validField, setValidField] = useState({
    newPassword: { required: false, message: "" },
    confirmPassword: { required: false, message: "" },
  });
  const handleCloseModal = () => {
    setIsChangePasswordVisible(false);
    setPassword({
      newPassword: "",
      confirmPassword: "",
    });
    setValidField({
      newPassword: { required: false, message: "" },
      confirmPassword: { required: false, message: "" },
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handlechangePassword = async () => {
    try {
      await changePassword(user.email, password.newPassword);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Contraseña cambiada",
        showConfirmButton: false,
        timer: 1500,

      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleValidForm = (event) => {
    event.preventDefault();
    const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const requiredFields = ["newPassword", "confirmPassword"];

    let isValid = true;
    const field = {};
    for (let i = 0; i < requiredFields.length; i++) {
      const requiredField = requiredFields[i];
      if (
        password[requiredField] === "" ||
        password[requiredField] === null ||
        password[requiredField] === undefined ||
        password[requiredField].length === 0
      ) {
        isValid = false;
        field[requiredField] = {
          required: true,
          message: "Este campo es requerido",
        };
      } else {
        field[requiredField] = {
          required: false,
          message: "",
        };
      }
      if (!pattern.test(password[requiredField])) {
        isValid = false;
        field[requiredField] = {
          required: true,
          message:
            "Debe contener al menos una letra mayúscula, una letra minúscula, un número y 8 caracteres.",
        };
      } else {
        field[requiredField] = {
          required: false,
          message: "",
        };
      }
    }

    if (password.newPassword !== password.confirmPassword) {
      isValid = false;
      field["confirmPassword"] = {
        required: true,
        message: "Las contraseñas no coinciden",
      };
    } else {
      field["confirmPassword"] = {
        required: false,
        message: "",
      };
    }
    if (isValid) {
      handlechangePassword();
      setValidField({
        newPassword: { required: false, message: "" },
        confirmPassword: { required: false, message: "" },
      });

      setIsChangePasswordVisible(true);
    } else {
      setValidField(field);
    }
  };
  return (
    <Modal
      show={isChangePasswordVisible}
      onHide={handleCloseModal}
      scrollable
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Cambiar Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nueva Contraseña</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type={showPassword ? "text" : "password"}
                className={validField.newPassword.required ? "is-invalid" : ""}
                minLength="8"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Debe contener al menos una letra mayúscula, una letra minúscula y un número."
                name="newPassword"
                placeholder="Nueva Contraseña"
                value={password.newPassword}
                onChange={(event) =>
                  setPassword({
                    ...password,
                    newPassword: event.target.value,
                  })
                }
              />
              <InputGroup.Text>
                <Button
                  variant="light"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  title="Mostrar Contraseña"
                  aria-label="Mostrar Contraseña"
                  aria-describedby="basic-addon1"
                  className="p-0"
                  style={{ border: "none" }}
                  size="sm"
                >
                  <img
                    src={showPassword ? hide : show}
                    alt="show"
                    width="20"
                    height="20"
                  />
                </Button>
              </InputGroup.Text>
              {validField.newPassword.required ? (
                <Form.Control.Feedback type="invalid">
                  {validField.newPassword.message}
                </Form.Control.Feedback>
              ) : null}
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                required
                className={
                  validField.confirmPassword.required ? "is-invalid" : ""
                }
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                value={password.confirmPassword}
                onChange={(event) =>
                  setPassword({
                    ...password,
                    confirmPassword: event.target.value,
                  })
                }
              />
              <InputGroup.Text>
                <Button
                  variant="light"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  type="button"
                  title="Mostrar Contraseña"
                  aria-label="Mostrar Contraseña"
                  aria-describedby="basic-addon1"
                  className="p-0"
                  style={{ border: "none" }}
                  size="sm"
                >
                  <img
                    src={showConfirmPassword ? hide : show}
                    alt="show"
                    width="20"
                    height="20"
                  />
                </Button>
              </InputGroup.Text>
              {validField.confirmPassword.required ? (
                <Form.Control.Feedback type="invalid">
                  {validField.confirmPassword.message}
                </Form.Control.Feedback>
              ) : null}
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleValidForm}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
