import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import defaultImg from "../../assets/img/default.jpg";

export const RegisterVehicle = ({
  handleRegister,
  isEdit,
  setIsEdit,
  isVisible,
  setIsVisible,
  updateData,
}) => {
  const [validField, setValidField] = useState({});
  const [imgSelected, setImgSelected] = useState(defaultImg);
  const [data, setdata] = useState({
    _id: "",
    foto: "",
    tipo: "Automovil",
    placa: "",
    marca: "",
    modelo: "",
    entidad: "México",
    year: "",
    cilindraje: "",
    serie: "",
    motor: "",
    tarjeta: "",
    seguro: "si",
    tenencia: "",
    verificacion: "",
    mantenimiento: "2023",
    observaciones: "",
  });

  useEffect(() => {
    setdata({
      foto: isEdit ? updateData.foto : "",
      url: isEdit ? updateData.url : "",
      tipo: isEdit ? updateData.tipo : "Automovil",
      placa: isEdit ? updateData.placa : "",
      marca: isEdit ? updateData.marca : "",
      modelo: isEdit ? updateData.modelo : "",
      entidad: isEdit ? updateData.entidad : "México",
      year: isEdit ? updateData.year : "",
      cilindraje: isEdit ? updateData.cilindraje : "",
      serie: isEdit ? updateData.serie : "",
      motor: isEdit ? updateData.motor : "",
      tarjeta: isEdit ? updateData.tarjeta : "",
      seguro: isEdit ? updateData.seguro : "si",
      tenencia: isEdit ? updateData.tenencia : "",
      verificacion: isEdit ? updateData.verificacion : "",
      mantenimiento: isEdit ? updateData.mantenimiento : "",
      observaciones: isEdit ? updateData.observaciones : "",
    });
    setImgSelected(isEdit ? updateData.foto : defaultImg);
  }, []);

  const handleCloseModal = () => {
    setIsVisible(false);
    setIsEdit(false);
    setdata({
      _id: "",
      foto: "",
      tipo: "Automovil",
      placa: "",
      marca: "",
      modelo: "",
      entidad: "México",
      year: "",
      cilindraje: "",
      serie: "",
      motor: "",
      tarjeta: "",
      seguro: "si",
      tenencia: "",
      verificacion: "",
      mantenimiento: "",
      observaciones: "",
    });
    setImgSelected(defaultImg);
  };

  const handleChangeImg = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgSelected(reader.result);
        setdata({
          ...data,
          foto: reader.result,
          url: URL.createObjectURL(file),
        });
      };
    }
  };

  const handleValidateForm = (event) => {
    event.preventDefault();
    const requiredFields = [
      "tipo",
      "placa",
      "marca",
      "modelo",
      "entidad",
      "year",
      "cilindraje",
      "serie",
      "motor",
      "tarjeta",
      "seguro",
      "tenencia",
    ];
    let isValid = true;
    const field = {};
    for (let i = 0; i < requiredFields.length; i++) {
      const requiredField = requiredFields[i];
      if (
        data[requiredField] === "" ||
        data[requiredField] === null ||
        data[requiredField] === undefined ||
        data[requiredField].length === 0
      ) {
        isValid = false;
        field[requiredField] = true;
      } else {
        field[requiredField] = false;
      }
    }

    if (isValid) {
      handleRegister(data);
      handleCloseModal();
      setValidField({
        tipo: false,
        placa: false,
        marca: false,
        modelo: false,
        entidad: false,
        year: false,
        cilindraje: false,
        serie: false,
        motor: false,
        tarjeta: false,
        seguro: false,
        tenencia: false,
        verificacion: false,
        mantenimiento: false,
      });
      setdata({
        id: "",
        foto: "",
        tipo: "Automovil",
        placa: "",
        marca: "",
        modelo: "",
        entidad: "México",
        year: "",
        cilindraje: "",
        serie: "",
        motor: "",
        tarjeta: "",
        seguro: "si",
        tenencia: "",
        verificacion: "",
        mantenimiento: "",
        observaciones: "",
      });
    } else {
      setValidField({
        ...field,
      });
    }
  };

  return (
    <>
      <Modal 
        show={isVisible} 
        onHide={handleCloseModal} 
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registro de Vehiculo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row g-3">
              <div className="col-md-3">
                <Form.Group controlId="formTipo" className="mb-3">
                  <Form.Label>Tipo de Vehiculo:</Form.Label>
                  <Form.Control
                    className={validField.tipo ? "is-invalid" : ""}
                    type="text"
                    as="select"
                    name="tipo"
                    value={data.tipo}
                    onChange={(e) => setdata({ ...data, tipo: e.target.value })}
                  >
                    <option value="Automovil">Automovil</option>
                    <option value="Motocicleta">Motocicleta</option>
                  </Form.Control>
                  {validField.tipo ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Placa:</Form.Label>
                  <Form.Control
                    className={validField.placa ? "is-invalid" : ""}
                    type="text"
                    value={data.placa}
                    onChange={(e) =>
                      setdata({ ...data, placa: e.target.value })
                    }
                  />
                  {validField.placa ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Marca:</Form.Label>
                  <Form.Control
                    className={validField.marca ? "is-invalid" : ""}
                    type="text"
                    value={data.marca}
                    onChange={(e) =>
                      setdata({ ...data, marca: e.target.value })
                    }
                  />
                  {validField.marca ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Modelo:</Form.Label>
                  <Form.Control
                    className={validField.modelo ? "is-invalid" : ""}
                    type="text"
                    value={data.modelo}
                    onChange={(e) =>
                      setdata({ ...data, modelo: e.target.value })
                    }
                  />
                  {validField.modelo ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
            </div>
            <div className="row g-3 ">
              <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Cilindraje:</Form.Label>
                  <Form.Control
                    className={validField.cilindraje ? "is-invalid" : ""}
                    type="number"
                    value={data.cilindraje}
                    onChange={(e) =>
                      setdata({ ...data, cilindraje: e.target.value })
                    }
                  />
                  {validField.cilindraje ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>No. Serie:</Form.Label>
                  <Form.Control
                    className={validField.serie ? "is-invalid" : ""}
                    type="text"
                    value={data.serie}
                    onChange={(e) =>
                      setdata({ ...data, serie: e.target.value })
                    }
                  />
                  {validField.serie ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Motor:</Form.Label>
                  <Form.Control
                    className={validField.motor ? "is-invalid" : ""}
                    type="text"
                    value={data.motor}
                    onChange={(e) =>
                      setdata({ ...data, motor: e.target.value })
                    }
                  />
                  {validField.motor ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Año del vehículo:</Form.Label>
                  <Form.Control
                    className={validField.year ? "is-invalid" : ""}
                    type="number"
                    value={data.year}
                    onChange={(e) => setdata({ ...data, year: e.target.value })}
                  />
                  {validField.year ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
            </div>
            <div className="row g-3 ">
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label>No. Tarjeta de Circulación:</Form.Label>
                  <Form.Control
                    className={validField.tarjeta ? "is-invalid" : ""}
                    type="text"
                    value={data.tarjeta}
                    onChange={(e) =>
                      setdata({ ...data, tarjeta: e.target.value })
                    }
                  />
                  {validField.tarjeta ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label>Año de ultima Tenencia:</Form.Label>
                  <Form.Control
                    className={validField.tenencia ? "is-invalid" : ""}
                    type="Number"
                    min={1900}
                    max={2023}
                    value={data.tenencia}
                    onChange={(e) =>
                      setdata({ ...data, tenencia: e.target.value })
                    }
                  />
                  {validField.tenencia ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label>Ultima verificación:</Form.Label>
                  <Form.Control
                    className={validField.verificacion ? "is-invalid" : ""}
                    type="date"
                    value={data.verificacion}
                    onChange={(e) =>
                      setdata({ ...data, verificacion: e.target.value })
                    }
                  />
                  {validField.verificacion ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              {/* <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Mantenimiento:</Form.Label>
                  <Form.Control
                    className={validField.mantenimiento ? "is-invalid" : ""}
                    type="text"
                    value={data.mantenimiento}
                    onChange={(e) =>
                      setdata({ ...data, mantenimiento: e.target.value })
                    }
                  />
                  {validField.mantenimiento ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div> */}
            </div>
            <div className="row g-3 ">
              <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Seguro:</Form.Label>
                  <Form.Control
                    className={validField.seguro ? "is-invalid" : ""}
                    as="select"
                    name="seguro"
                    value={data.seguro}
                    onChange={(e) =>
                      setdata({ ...data, seguro: e.target.value })
                    }
                  >
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </Form.Control>
                  {validField.seguro ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group className="mb-3">
                  <Form.Label>Entidad</Form.Label>
                  <Form.Control
                    className={validField.entidad ? "is-invalid" : ""}
                    type="text"
                    value={data.entidad}
                    onChange={(e) =>
                      setdata({ ...data, entidad: e.target.value })
                    }
                  />
                  {validField.entidad ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Foto:</Form.Label>
                  <Form.Control
                    className={validField.foto ? "is-invalid" : ""}
                    type="file"
                    accept="image/jpg"
                    onChange={(e) => handleChangeImg(e)}
                  />
                  {validField.foto ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
            </div>
            <div className="row g-3 ">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Observaciones:</Form.Label>
                  <Form.Control
                    as={"textarea"}
                    rows={3}
                    value={data.observaciones}
                    onChange={(e) =>
                      setdata({ ...data, observaciones: e.target.value })
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 text-center">
                <Form.Group className="mb-3">
                  <img
                    src={imgSelected}
                    alt="sin imagen"
                    className="img-fluid"
                    style={{ width: "150px", height: "150px" }}
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button
            variant={isEdit ? "warning" : "primary"}
            onClick={(e) => handleValidateForm(e)}
          >
            {isEdit ? "Actualizar" : "Registrar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
