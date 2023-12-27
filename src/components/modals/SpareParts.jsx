import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Form, Pagination } from "react-bootstrap";
import editImg from "../../assets/img/edit.png";
import trashImg from "../../assets/img/trash.png";
import cleanImg from "../../assets/img/clean.png";
import Swal from "sweetalert2";
import { useVehicles } from "../../context/VehiclesContext";

export const SpareParts = ({
  isSparePartsVisible,
  setIsSparePartsVisible,
  maintenanceId,
}) => {
  const { getSpareParts, addSpareParts, updateSpareParts, deleteSpareParts } =
    useVehicles();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [validFields, setValidFields] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [newData, setNewData] = useState({
    id: "ref_" + Math.random().toString(36).substring(2),
    mantenimientoId: maintenanceId,
    descripcion_refaccion: "",
    cantidad: 0,
    precio_unitario: 0.0,
    total: 0.0,
  });
  const itemsPerPage = 4;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  useEffect(() => {
    setNewData({
      id: "ref_" + Math.random().toString(36).substring(2),
      mantenimientoId: maintenanceId,
      ...newData,
    });
  }, []);

  const displayedData = data.slice(startIndex, endIndex);
  useEffect(() => {
    setNewData({
      ...newData,
      total: (newData.cantidad * newData.precio_unitario).toFixed(2),
    });
  }, [newData.cantidad, newData.precio_unitario]);

  useEffect(() => {
    setData([]);
    getSparePartsData(maintenanceId);
  }, [maintenanceId]);

  const getSparePartsData = async () => {
    try {
      if (maintenanceId != "") {
        const res = await getSpareParts(maintenanceId);
        setData(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setIsSparePartsVisible(false);
    setPage(1);
    setNewData({
      id: "",
      descripcion_refaccion: "",
      cantidad: 0,
      precio_unitario: 0.0,
      total: 0.0,
    });
    setValidFields({});
  };

  const handleRegisterSpareParts = async () => {
    if (isEdit) {
      const result = data.filter((item) => item.id === newData.id);
      result[0].descripcion_refaccion = newData.descripcion_refaccion;
      result[0].cantidad = newData.cantidad;
      result[0].precio_unitario = newData.precio_unitario;
      result[0].total = newData.total;
      await updateSpareParts(newData.id, result[0]);
      setData([...data]);
      setIsEdit(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Repuesto editado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await addSpareParts(newData);
      setData([...data, newData]);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Repuesto creado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setNewData({
      ...newData,
      id: "ref_" + Math.random().toString(36).substring(2),
      descripcion_refaccion: "",
      cantidad: 0,
      precio_unitario: 0.0,
      total: 0.0,
    });
  };

  const cleanForm = () => {
    setNewData({
      ...newData,
      id: "ref_" + Math.random().toString(36).substring(2),
      descripcion_refaccion: "",
      cantidad: 0,
      precio_unitario: 0.0,
      total: 0.0,
    });
    setValidFields({});
    setIsEdit(false);
  };

  const handleEditSpareParts = (id) => {
    const result = data.filter((item) => item.id === id);
    console.log(result[0]);
    setNewData(result[0]);
    setIsEdit(true);
  };

  const handleDeleteSpareParts = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esta accion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = data.filter((item) => item.id !== id);
        await deleteSpareParts(id);
        setData(result);
        Swal.fire("Eliminado!", "El elemento ha sido eliminado.", "success");
      }
    });
  };

  const handlePagination = (page) => {
    if (page > 0 && page <= Math.ceil(data.length / itemsPerPage)) {
      setPage(page);
    }
  };

  const validForm = (event) => {
    event.preventDefault();

    const requiredFields = [
      "descripcion_refaccion",
      "cantidad",
      "precio_unitario",
    ];
    let isValid = true;
    const fields = {};
    for (let i = 0; i < requiredFields.length; i++) {
      const requiredField = requiredFields[i];
      if (
        newData[requiredField] === "" ||
        newData[requiredField] === null ||
        newData[requiredField] === 0 ||
        newData[requiredField] === 0.0 ||
        newData[requiredField] === "0"
      ) {
        isValid = false;
        fields[requiredField] = true;
      } else {
        fields[requiredField] = false;
      }
    }

    if (isValid) {
      handleRegisterSpareParts();
      cleanForm();
      setIsEdit(false);
    } else {
      setValidFields(fields);
    }
  };

  return (
    <Modal
      show={isSparePartsVisible}
      onHide={handleCloseModal}
      scrollable
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>Gestion de Refacciones</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row">
            <div className="col-2">
              <Form.Group className="mb-3">
                <Form.Label>Cantidad:</Form.Label>
                <Form.Control
                  className={validFields.cantidad ? "is-invalid" : ""}
                  type="number"
                  name="cantidad"
                  value={newData.cantidad}
                  onChange={(event) =>
                    setNewData({ ...newData, cantidad: event.target.value })
                  }
                />
                {validFields.cantidad ? (
                  <Form.Control.Feedback type="invalid">
                    Este campo es requerido
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </div>
            <div className="col-3">
              <Form.Group className="mb-3">
                <Form.Label>Precio Unitario:</Form.Label>
                <Form.Control
                  className={validFields.precio_unitario ? "is-invalid" : ""}
                  type="number"
                  step="0.01"
                  min={1}
                  value={newData.precio_unitario}
                  name="precio_unitario"
                  onChange={(event) =>
                    setNewData({
                      ...newData,
                      precio_unitario: event.target.value,
                    })
                  }
                />
                {validFields.precio_unitario ? (
                  <Form.Control.Feedback type="invalid">
                    Este campo es requerido
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </div>
            <div className="col-2">
              <Form.Group className="mb-3">
                <Form.Label>Total:</Form.Label>
                <Form.Control
                  className={
                    validFields.total ? "is-invalid text-center" : "text-center"
                  }
                  type="text"
                  value={newData.total}
                  name="total"
                  disabled
                />
              </Form.Group>
            </div>
            <div className="col-5">
              <Form.Group className="mb-3">
                <Form.Label>Refacciones:</Form.Label>
                <Form.Control
                  className={
                    validFields.descripcion_refaccion ? "is-invalid" : ""
                  }
                  as={"textarea"}
                  value={newData.descripcion_refaccion}
                  onChange={(event) =>
                    setNewData({
                      ...newData,
                      descripcion_refaccion: event.target.value,
                    })
                  }
                />
                {validFields.descripcion_refaccion ? (
                  <Form.Control.Feedback type="invalid">
                    Este campo es requerido
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
            </div>
            <div className="col-12">
              <Button
                variant="success"
                style={{ width: "88px" }}
                onClick={cleanForm}
                className="float-end"
              >
                <img style={{ width: "20px" }} src={cleanImg} />
              </Button>
              <Button
                variant={isEdit ? "warning" : "primary"}
                style={{ width: "88px" }}
                onClick={validForm}
                className="float-end mx-2"
              >
                {isEdit ? "Editar" : "Registrar"}
              </Button>
            </div>
          </div>
        </Form>

        <div className="border-bottom my-4"></div>

        <Table striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
              <th>Refacciones</th>
              <th>Editar</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.precio_unitario}</td>
                  <td>{item.total}</td>
                  <td>{item.descripcion_refaccion}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEditSpareParts(item.id)}
                    >
                      <img style={{ width: "20px" }} src={editImg} />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteSpareParts(item.id)}
                    >
                      <img style={{ width: "20px" }} src={trashImg} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No hay registros
                </td>
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
  );
};
