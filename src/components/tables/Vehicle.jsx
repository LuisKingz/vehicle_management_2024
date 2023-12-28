import React, { useEffect } from "react";
import { useState } from "react";
import { Pagination, Table } from "react-bootstrap";
import { RegisterVehicle } from "../modals/RegisterVehicle";
import trashImg from "../../assets/img/trash.png";
import editImg from "../../assets/img/edit.png";
import toolsImg from "../../assets/img/tools.png";
import { RegisterMaintenance } from "../modals/RegisterMaintenance";
import { useVehicles } from "../../context/VehiclesContext";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

export const Vehicle = () => {
  const { user } = useAuth();
  const { getVehicles, addVehicles, deleteVehicle, updateVehicle } =
    useVehicles();
  const [page, setPage] = useState(1);
  const [placa, setPlaca] = useState("");
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({
    _id: "",
    foto: "",
    tipo: "",
    placa: "",
    marca: "",
    modelo: "",
    entidad: "",
    year: "",
    cilindraje: "",
    serie: "",
    motor: "",
    tarjeta: "",
    seguro: "",
    tenencia: "",
    verificacion: "NA",
    mantenimiento: "2023",
    observaciones: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMaintenanceVisible, setIsMaintenanceVisible] = useState(false);
  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    setData([]);
    getVehicleData();
  }, []);
  const displayedData = data.slice(startIndex, endIndex);

  const getVehicleData = async () => {
    const res = await getVehicles();
    setData(res);
  };
  const filterVehicles = (search) => {
    if (search === "") {
      getVehicleData();
      return;
    }

    const value = search.toLowerCase();
    const result = data.filter((vehicle) => {
      return (
        vehicle.placa.toLowerCase().includes(value) ||
        vehicle.marca.toLowerCase().includes(value) ||
        vehicle.modelo.toLowerCase().includes(value) ||
        vehicle.tipo.toLowerCase().includes(value)
      );
    });

    setData(value === "" ? [] : result);
  };

  const handleRegister = async (vehicle, placaAux) => {
    if (isEdit) {
      const result = data.filter((vehicle) => vehicle.placa === placaAux);
      const targetVehicle = result[0];
      targetVehicle.foto = vehicle.foto;
      targetVehicle.tipo = vehicle.tipo;
      targetVehicle.placa = vehicle.placa;
      targetVehicle.marca = vehicle.marca;
      targetVehicle.modelo = vehicle.modelo;
      targetVehicle.entidad = vehicle.entidad;
      targetVehicle.year = vehicle.year;
      targetVehicle.cilindraje = vehicle.cilindraje;
      targetVehicle.serie = vehicle.serie;
      targetVehicle.motor = vehicle.motor;
      targetVehicle.tarjeta = vehicle.tarjeta;
      targetVehicle.seguro = vehicle.seguro;
      targetVehicle.tenencia = vehicle.tenencia;
      targetVehicle.verificacion = vehicle.verificacion;
      targetVehicle.mantenimiento = vehicle.mantenimiento;
      targetVehicle.observaciones = vehicle.observaciones;
      await updateVehicle(placaAux, vehicle);
      setData(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Vehículo actualizado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      delete vehicle._id;
      await addVehicles(vehicle);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Vehículo creado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      setData([...data, vehicle]);
    }
    setIsEdit(false);
    setIsVisible(false);
  };

  const handleDelete = (placa) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar este vehículo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteVehicle(placa);
        const result = data.filter((vehicle) => vehicle.placa !== placa);
        setData(result);
        Swal.fire("Eliminado!", "El vehículo ha sido eliminado.", "success");
      }
    });
  };

  const handleEdit = (placa) => {
    const result = data.filter((vehicle) => vehicle.placa === placa);
    setUpdateData(result[0]);
    setIsEdit(true);
    setIsVisible(true);
  };

  const handleMaintenance = (placa) => {
    setPlaca(placa);
    setIsMaintenanceVisible(true);
  };

  const handlePagination = (page) => {
    if (data === undefined) {
      return;
    }
    if (page < 1 || page > Math.ceil(data.length / itemsPerPage)) {
      return;
    }
    setPage(page);
  };

  const handleTenencia = (tenencia) => {
    const currentYear = new Date().getFullYear();
    const isOlderThanCurrentYear = tenencia < currentYear;
    const badgeClass = isOlderThanCurrentYear ? "bg-danger" : "bg-success";
    const text = isOlderThanCurrentYear ? "PAGAR" : "VIGENTE";

    return (
      <span className={`badge ${badgeClass}`}>
        {text} {tenencia}
      </span>
    );
  };

  const handleMantenimiento = (mantenimiento) => {
    try {
      const date = new Date();
      const maintenandMonth = new Date(mantenimiento);
      const diff =
        (date.getFullYear() - maintenandMonth.getFullYear()) * 12 +
        (date.getMonth() - maintenandMonth.getMonth());

      if (diff < 6) {
        return <span className="badge bg-success">VIGENTE</span>;
      } else if (diff >= 6 && diff < 12) {
        return <span className="badge bg-warning">PROXIMO MANTENIMIENTO</span>;
      } else {
        return <span className="badge bg-danger">PROXIMO MANTENIMIENTO</span>;
      }
    } catch (error) {
      return <span className="badge bg-danger">PROXIMO MANTENIMIENTO</span>;
    }
  };

  const handleVerificacion = (verificacion, tipo, placa) => {
    if (tipo === "Motocicleta") {
      return <span className="badge bg-light text-dark">NO APLICA</span>;
    }
    const plateTermination = placa.slice(-1);
    const date = new Date();
    const month = date.toLocaleDateString("es-ES", { month: "numeric" });

    const currentYear = new Date();
    currentYear.setHours(0, 0, 0, 0);
    let badgeClass = "";
    let text = "";
    switch (month) {
      case "6": //JUNIO
        // NOTIFICACION DE ENGOMADO AMARILLO
        if (plateTermination === "5" || plateTermination === "6") {
          badgeClass = "bg-warning";
          text = "PROXIMA VERFICACIÓN";
        } else {
          badgeClass = "bg-warning";
          text = "PROXIMA VERFICACIÓN";
        }
        break;
      case "7": //JULIO
        // NOTIFICACION DE ENGOMADO ROSA
        // ENGOMADO AMARILLO PRIMERA VERIFICACIÓN
        if (plateTermination === "7" || plateTermination === "8") {
          badgeClass = "bg-warning";
          text = "PROXIMA VERFICACIÓN";
        }
        if (plateTermination === "5" || plateTermination === "6") {
          if (verificacion === "") {
            badgeClass = "bg-danger";
            text = "SIN VERIFICACIÓN";
          } else {
            const currentMonth = (
              new Date(verificacion).getMonth() + 1
            ).toString();
            if (currentMonth === month) {
              badgeClass = "bg-success";
              text = `VIGENTE ${verificacion}`;
            } else {
              badgeClass = "bg-warning";
              text = "VERIFICAR " + verificacion;
            }
          }
        } else {
          badgeClass = "bg-warning";
          text = "PROXIMA VERFICACIÓN";
        }
        break;
      case "8": //AGOSTO
        // NOTIFICACION DE ENGOMADO ROJO
        // ENGOMADO ROSA PRIMERA VERIFICACIÓN
        // ENGOMADO AMARILLO SEGUNDA VERIFICACIÓN
        if (plateTermination === "3" || plateTermination === "4") {
          badgeClass = "bg-warning";
          text = "PROXIMA VERFICACIÓN";
        }
        if (plateTermination === "5" || plateTermination === "6") {
          if (verificacion === "") {
            badgeClass = "bg-danger";
            text = "SIN VERIFICACIÓN";
          } else {
            const currentMonth = (
              new Date(verificacion).getMonth() + 2
            ).toString();
            if (currentMonth === month) {
              badgeClass = "bg-success";
              text = `VIGENTE ${verificacion}`;
            } else {
              badgeClass = "bg-warning";
              text = "VERIFICAR " + verificacion;
            }
          }
        }

        if (plateTermination === "7" || plateTermination === "8") {
          if (verificacion === "") {
            badgeClass = "bg-danger";
            text = "SIN VERIFICACIÓN";
          } else {
            const currentMonth = (
              new Date(verificacion).getMonth() + 1
            ).toString();
            if (currentMonth === month) {
              badgeClass = "bg-success";
              text = `VIGENTE ${verificacion}`;
            } else {
              badgeClass = "bg-warning";
              text = "VERIFICAR " + verificacion;
            }
          }
        } else {
          badgeClass = "bg-warning";
          text = "PROXIMA VERFICACIÓN";
        }
        break;
      case "9": //SEPTIEMBRE
        // NOTIFICACION DE ENGOMADO VERDE
        // ENGOMADO ROJO PRIMERA VERIFICACION
        // ENGOMADO ROSA SEGUNDA VERIFICACION
        if (plateTermination === "1" || plateTermination === "2") {
          badgeClass = "bg-warning";
          text = "PROXIMA VERFICACIÓN";
        }

        if (plateTermination === "3" || plateTermination === "4") {
          if (verificacion === "") {
            badgeClass = "bg-danger";
            text = "SIN VERIFICACIÓN";
          } else {
            const currentMonth = (
              new Date(verificacion).getMonth() + 1
            ).toString();
            if (currentMonth === month) {
              badgeClass = "bg-success";
              text = `VIGENTE ${verificacion}`;
            } else {
              badgeClass = "bg-warning";
              text = "VERIFICAR " + verificacion;
            }
          }
        }

        if (plateTermination === "7" || plateTermination === "8") {
          if (verificacion === "") {
            badgeClass = "bg-danger";
            text = "SIN VERIFICACIÓN";
          } else {
            const currentMonth = (
              new Date(verificacion).getMonth() + 2
            ).toString();
            if (currentMonth === month) {
              badgeClass = "bg-success";
              text = `VIGENTE ${verificacion}`;
            } else {
              badgeClass = "bg-warning";
              text = "VERIFICAR " + verificacion;
            }
          }
        } else {
          badgeClass = "bg-warning";
          text = "PROXIMA VERFICACIÓN";
        }

        break;
      case "10": //OCTUBRE
        // NOTIFICACION DE ENGOMADO AZUL
        // ENGOMADO VERDE PRIMERA VERIFICACION
        // ENGOMADO ROJO SEGUNDA VERIFICACION
        if (plateTermination === "9" || plateTermination === "0") {
          badgeClass = "bg-warning";
          text = "PROXIMA VERFICACIÓN";
        }
        if (plateTermination === "9" || plateTermination === "0") {
          if (verificacion === "") {
            badgeClass = "bg-danger";
            text = "SIN VERIFICACIÓN";
          } else {
            const currentMonth = (
              new Date(verificacion).getMonth() + 1
            ).toString();
            if (currentMonth === month) {
              badgeClass = "bg-success";
              text = `VIGENTE ${verificacion}`;
            } else {
              badgeClass = "bg-warning";
              text = "VERIFICAR " + verificacion;
            }
          }
        }

        if (plateTermination === "3" || plateTermination === "4") {
          if (verificacion === "") {
            badgeClass = "bg-danger";
            text = "SIN VERIFICACIÓN";
          } else {
            const currentMonth = (
              new Date(verificacion).getMonth() + 2
            ).toString();
            if (currentMonth === month) {
              badgeClass = "bg-success";
              text = `VIGENTE ${verificacion}`;
            } else {
              badgeClass = "bg-warning";
              text = "VERIFICAR " + verificacion;
            }
          }
        } else {
          badgeClass = "bg-warning";
          text = "PROXIMA VERFICACIÓN";
        }

        break;
      case "11": //NOVIEMBRE
        // ENGOMADO AZUL PRIMERA VERIFICACION
        // ENGOMADO VERDE SEGUNDA VERIFICACION
        if (plateTermination === "1" || plateTermination === "2") {
          if (verificacion === "") {
            badgeClass = "bg-danger";
            text = "SIN VERIFICACIÓN";
          } else {
            const currentMonth = (
              new Date(verificacion).getMonth() + 2
            ).toString();
            if (currentMonth === month) {
              badgeClass = "bg-success";
              text = `VIGENTE ${verificacion}`;
            } else {
              badgeClass = "bg-warning";
              text = "VERIFICAR " + verificacion;
            }
          }
        }
        if (plateTermination === "9" || plateTermination === "0") {
          if (verificacion === "") {
            badgeClass = "bg-danger";
            text = "SIN VERIFICACIÓN";
          } else {
            const currentMonth = (
              new Date(verificacion).getMonth() + 2
            ).toString();
            if (currentMonth === month) {
              badgeClass = "bg-success";
              text = `VIGENTE ${verificacion}`;
            } else {
              badgeClass = "bg-warning";
              text = "VERIFICAR " + verificacion;
            }
          }
        } else {
          badgeClass = "bg-warning";
          text = "PROXIMA VERFICACIÓN";
        }
        break;
      case "12": //DICIEMBRE
        // ENGOMADO AZUL
        if (plateTermination === "9" || plateTermination === "0") {
          if (verificacion === "") {
            badgeClass = "bg-danger";
            text = "SIN VERIFICACIÓN";
          } else {
            const currentMonth = (
              new Date(verificacion).getMonth() + 2
            ).toString();
            if (currentMonth === month) {
              badgeClass = "bg-success";
              text = `VIGENTE ${verificacion}`;
            } else {
              badgeClass = "bg-warning";
              text = "VERIFICAR " + verificacion;
            }
          }
        } else {
          badgeClass = "bg-warning";
          text = "PROXIMA VERFICACIÓN";
        }
        break;
      default:
        if (verificacion === "") {
          badgeClass = "bg-danger";
          text = "SIN VERIFICACIÓN";
        } else {
          badgeClass = "bg-success";
          text = `VERIFICADO ${verificacion}`;
        }
        break;
    }

    return <span className={`badge ${badgeClass}`}> {text}</span>;
  };

  return (
    <>
      <div className="table-container mt-5">
        <div className="d-flex justify-content-end align-items-end">
          <button
            className="btn btn-primary"
            onClick={() => setIsVisible(true)}
          >
            Agregar
          </button>
          <input
            onChange={(e) => filterVehicles(e.target.value)}
            className="form-control"
            type="search"
            placeholder="filtrar"
            aria-label="Search"
            style={{ width: "15rem", height: "2.5rem", marginLeft: "1rem" }}
          />
        </div>
        <Table responsive className="mt-3 text-center" size="lg" striped hover>
          <thead>
            <tr className="text-center">
              <th>#</th>
              <th>Foto</th>
              <th>Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Tipo</th>
              <th>Tenencia</th>
              <th>Verificación</th>
              <th>Mantenimiento</th>
              <th>Observaciones</th>
              <th>Editar</th>
              <th>Eliminar</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>
                    <img
                      style={{ width: "56px", height: "56px" }}
                      className="img-fluid icon-button"
                      src={item.foto}
                    />
                  </td>
                  <td>{item.placa}</td>
                  <td>{item.marca}</td>
                  <td>{item.modelo}</td>
                  <td>{item.tipo}</td>
                  <td>{handleTenencia(item.tenencia)}</td>
                  <td>
                    {handleVerificacion(
                      item.verificacion,
                      item.tipo,
                      item.placa
                    )}
                  </td>
                  <td>{handleMantenimiento(item.mantenimiento)}</td>
                  <td>{item.observaciones}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(item.placa)}
                      className="btn btn-warning btn-acciones"
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
                      onClick={() => handleDelete(item.placa)}
                      className="btn btn-danger btn-acciones"
                    >
                      <img
                        style={{ width: "20px" }}
                        className="img img-fluid icon-button"
                        src={trashImg}
                      />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleMaintenance(item.placa)}
                      className="btn btn-info btn-acciones"
                    >
                      <img
                        style={{ width: "20px" }}
                        className="img img-fluid icon-button"
                        src={toolsImg}
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center">
                  No hay resultados
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
      </div>
      {isVisible && (
        <RegisterVehicle
          handleRegister={handleRegister}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          updateData={updateData}
        />
      )}
      {isMaintenanceVisible && (
        <RegisterMaintenance
          placa={placa}
          isMaintenanceVisible={isMaintenanceVisible}
          setIsMaintenanceVisible={setIsMaintenanceVisible}
          updateData={updateData}
        />
      )}
    </>
  );
};
