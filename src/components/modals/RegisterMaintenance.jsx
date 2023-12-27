import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Form, Pagination } from "react-bootstrap";
import editImg from "../../assets/img/edit.png";
import trashImg from "../../assets/img/trash.png";
import gearsImg from "../../assets/img/gears.png";
import cleanImg from "../../assets/img/clean.png";
import { SpareParts } from "./SpareParts";
import { useVehicles } from "../../context/VehiclesContext";
import Swal from "sweetalert2";

export const RegisterMaintenance = ({
  placa,
  isMaintenanceVisible,
  setIsMaintenanceVisible,
}) => {
  const {
    getMaintenances,
    addMaintenance,
    updateMaintenance,
    deleteMaintenance,
  } = useVehicles();

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [maintenanceId, setMaintenanceId] = useState("");
  const [isSparePartsVisible, setIsSparePartsVisible] = useState(false);
  const [validFields, setValidFields] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [newData, setNewData] = useState({
    id: `${placa}_${Math.random().toString(36).substring(2)}`,
    fecha: "",
    servicio: "",
    tipo_mantenimiento: "Preventivo",
    costo: 0.0,
    responsable: "",
    placa: placa,
  });

  const itemsPerPage = 4;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  useEffect(() => {
    setData([]);
    getMaintenancesData(placa);
  }, [placa]);
  const displayedData = data.slice(startIndex, endIndex);
  
  useEffect(() => {
    setNewData({
      ...newData,
      placa: placa,
      id: placa + "_" + Math.random().toString(36).substring(2),
    });
  }, []);

  const handleCloseModal = () => {
    setIsMaintenanceVisible(false);
    setPage(1);
    setNewData({
      fecha: 0,
      servicio: "",
      tipo_mantenimiento: "Preventivo",
      costo: 0.0,
      responsable: "",
      placa: "",
      id: "",
    });
    setValidFields({});
  };

  const getMaintenancesData = async (placa) => {
    const res = await getMaintenances(placa);
    setData(res);
  };

  const handleShowSpareParts = (id) => {
    setMaintenanceId(id);
    console.log(id);
    setIsSparePartsVisible(true);
  };

  const handleRegisterMaintenance = async () => {
    if (isEdit) {
      const result = data.filter(
        (maintenance) => maintenance.id === newData.id
      );
      result[0].fecha = newData.fecha;
      result[0].servicio = newData.servicio;
      result[0].tipo_mantenimiento = newData.tipo_mantenimiento;
      result[0].costo = newData.costo;
      result[0].responsable = newData.responsable;
      await updateMaintenance(newData.id, result[0]);
      setData([...data]);
      setIsEdit(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Mantenimiento actualizado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await addMaintenance(newData);
      setData([...data, newData]);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Mantenimiento creado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    setNewData({
      id: placa + "_" + Math.random().toString(36).substring(2),
      fecha: "",
      servicio: "",
      tipo_mantenimiento: "Preventivo",
      costo: 0.0,
      responsable: "",
      placa: placa,
    });
  };

  const cleanForm = () => {
    setIsEdit(false);
    setNewData({
      id: placa + "_" + Math.random().toString(36).substring(2),
      fecha: "",
      servicio: "",
      tipo_mantenimiento: "Preventivo",
      costo: 0.0,
      responsable: "",
      placa: placa,
    });
    setValidFields({});
  };

  const handleEdit = (id) => {
    const result = data.filter((user) => user.id === id);
    setNewData(result[0]);
    setIsEdit(true);
  };

  const handlePagination = (page) => {
    if (page > 0 && page <= Math.ceil(data.length / itemsPerPage)) {
      setPage(page);
    }
  };

  const dateFormat = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar este mantenimiento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = data.filter((user) => user.id !== id);
        await deleteMaintenance(id);
        setData(result);
        Swal.fire(
          "Eliminado!",
          "El mantenimiento ha sido eliminado.",
          "success"
        );
      }
    });
  };

  const handleValidForm = (event) => {
    event.preventDefault();
    const requiredFields = [
      "fecha",
      "servicio",
      "tipo_mantenimiento",
      "costo",
      "responsable",
    ];
    let isValid = true;
    const field = {};
    for (let i = 0; i < requiredFields.length; i++) {
      const requiredField = requiredFields[i];
      if (
        newData[requiredField] === "" ||
        newData[requiredField] === null ||
        newData[requiredField] === undefined ||
        newData[requiredField] === "0" ||
        newData[requiredField] === 0 ||
        newData[requiredField] === 0.0
      ) {
        isValid = false;
        field[requiredField] = true;
      } else {
        field[requiredField] = false;
      }
    }

    if (isValid) {
      handleRegisterMaintenance();
      setIsEdit(false);
      cleanForm();
    } else {
      setValidFields(field);
    }
  };

  return (
    <>
      <Modal show={isMaintenanceVisible} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Gestion de Mantenimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-3">
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de mantenimiento:</Form.Label>
                  <Form.Control
                    className={
                      validFields.tipo_mantenimiento ? "is-invalid" : ""
                    }
                    as={"select"}
                    name="tipo_mantenimiento"
                    value={newData.tipo_mantenimiento}
                    onChange={(e) =>
                      setNewData({
                        ...newData,
                        tipo_mantenimiento: e.target.value,
                      })
                    }
                  >
                    <option value="Preventido">Preventivo</option>
                    <option value="Correctivo">Correctivo</option>
                  </Form.Control>
                  {validFields.tipo_mantenimiento ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-3">
                <Form.Group className="mb-3">
                  <Form.Label>costo:</Form.Label>
                  <Form.Control
                    className={validFields.costo ? "is-invalid" : ""}
                    type="number"
                    name="costo"
                    min={1}
                    value={newData.costo}
                    onChange={(e) =>
                      setNewData({ ...newData, costo: e.target.value })
                    }
                    step="0.01"
                  />
                  {validFields.costo ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-3">
                <Form.Group className="mb-3">
                  <Form.Label>Fecha:</Form.Label>
                  <Form.Control
                    className={validFields.fecha ? "is-invalid" : ""}
                    type="date"
                    name="fecha"
                    value={newData.fecha}
                    onChange={(e) =>
                      setNewData({ ...newData, fecha: e.target.value })
                    }
                  />
                  {validFields.fecha ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-3">
                <Form.Group className="mb-3">
                  <Form.Label>Responsable:</Form.Label>
                  <Form.Control
                    className={validFields.responsable ? "is-invalid" : ""}
                    type="text"
                    name="responsable"
                    value={newData.responsable}
                    onChange={(e) =>
                      setNewData({ ...newData, responsable: e.target.value })
                    }
                  />
                  {validFields.responsable ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-4">
                <Form.Group className="mb-3">
                  <Form.Label>Descripcion del servicio:</Form.Label>
                  <Form.Control
                    className={validFields.servicio ? "is-invalid" : ""}
                    as="textarea"
                    name="servicio"
                    value={newData.servicio}
                    onChange={(e) =>
                      setNewData({ ...newData, servicio: e.target.value })
                    }
                  />
                  {validFields.servicio ? (
                    <Form.Control.Feedback type="invalid">
                      Este campo es requerido
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </div>
              <div className="col-2 d-flex flex-column justify-content-end align-items-start mb-3">
                <Button
                  variant={isEdit ? "warning" : "primary"}
                  style={{ width: "88px" }}
                  onClick={(e) => {
                    handleValidForm(e);
                  }}
                >
                  {isEdit ? "Actualizar" : "Registrar"}
                </Button>
                <Button
                  className="mt-2"
                  style={{ width: "88px" }}
                  variant="success"
                  onClick={cleanForm}
                >
                  <img style={{ width: "20px" }} src={cleanImg} />
                </Button>
              </div>
            </div>
          </Form>

          <div className="border-bottom my-4"></div>

          <Table
            responsive
            striped
            hover
            size="xl"
            className="table text-center"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Tipo de mantenimiento</th>
                <th>Servicio</th>
                <th>costo</th>
                <th>Responsable</th>
                <th>Refacciones</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                displayedData.map((item, index) => (
                  <tr key={index}>
                    <td>{startIndex + index + 1}</td>
                    <td>{dateFormat(item.fecha)}</td>
                    <td>{item.tipo_mantenimiento}</td>
                    <td>{item.servicio}</td>
                    <td>${item.costo}</td>
                    <td>{item.responsable}</td>
                    <td>
                      <button
                        className="btn btn-info btn-acciones"
                        onClick={() => handleShowSpareParts(item.id)}
                      >
                        <img
                          style={{ width: "20px" }}
                          className="img img-fluid icon-button"
                          src={gearsImg}
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        data-id={item.id}
                        className="btn btn-warning btn-acciones"
                        onClick={() => handleEdit(item.id)}
                      >
                        <img
                          style={{ width: "20px" }}
                          className="img img-fluid icon-button"
                          src={editImg}
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-acciones"
                        onClick={() => handleDelete(item.id)}
                      >
                        <img
                          style={{ width: "20px" }}
                          className="img img-fluid icon-button"
                          src={trashImg}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan={9}>No hay datos</td>
                </tr>
              )}
            </tbody>
          </Table>
          <div className="d-flex justify-content-end align-items-end">
            <Pagination>
              <Pagination.Prev onClick={() => handlePagination(page - 1)} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={() => handlePagination(page + 1)} />
            </Pagination>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {isSparePartsVisible && (
        <SpareParts
          isSparePartsVisible={isSparePartsVisible}
          setIsSparePartsVisible={setIsSparePartsVisible}
          maintenanceId={maintenanceId}
          placa={placa}
        />
      )}
    </>
  );
};
