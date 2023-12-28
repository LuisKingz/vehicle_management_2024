import React from "react";
import { useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { RegisterUser } from "../modals/RegisterUser";
import trashImg from "../../assets/img/trash.png";
import editImg from "../../assets/img/edit.png";
import { useUsers } from "../../context/UsersContext";
import Swal from "sweetalert2";

export const User = () => {
  const { signup, deleteUser, updateUser, getUser, getUsers } = useUsers();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({
    _id: "",
    nombre: "",
    email: "",
    password: "",
    rol: "admin",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    setData([]);
    getUsersData();
  }, []);
  const displayedData = data.slice(startIndex, endIndex);

  const getUsersData = async () => {
    const res = await getUsers();
    setData(res);
  };

  const filterUsers = (search) => {
    if (search === "") {
      getUsersData();
    }
    const value = search;
    const result = data.filter((user) => {
      return user.nombre.toLowerCase().search(value) !== -1 || user.email.toLowerCase().search(value) !== -1;
    });
    if (result.length === 0) {
      setData([]);
    } else {
      setData(result);
    }
  };

  const handleRegister = async (user, emailAux) => {
    if (isEdit) {
      const result = data.filter((user) => user._id === updateData._id);
      const targetUser = result[0];
      targetUser.nombre = user.nombre;
      targetUser.email = user.email;
      targetUser.password = user.password;
      targetUser.rol = user.rol;
      await updateUser(emailAux, user);
      setData(data);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario editado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsEdit(false);
      setIsVisible(false);
    } else {
      delete user._id;
      const result = await signup(user);
      if (result[0] === "error") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: result[1],
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: result[1],
          showConfirmButton: false,
          timer: 1500,
        });
        setData([...data, user]);
        setIsEdit(false);
        setIsVisible(false);
      }
    }
  };

  const handleDelete = (email) => {
    Swal.fire({
      title: "¿Estas seguro de eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser(email);
        const result = data.filter((user) => user.email !== email);
        setData(result);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuario eliminado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleEdit = async (email) => {
    const userFinded = await getUser(email);
    console.log(userFinded);
    setUpdateData(userFinded);
    setIsEdit(true);
    setIsVisible(true);
  };

  const handlePagination = (page) => {
    if (page > 0 && page <= Math.ceil(data.length / itemsPerPage)) {
      setPage(page);
    }
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
            onChange={(e) => filterUsers(e.target.value)}
            className="form-control"
            type="search"
            placeholder="filtrar"
            aria-label="Search"
            style={{ width: "15rem", height: "2.5rem", marginLeft: "1rem" }}
          />
        </div>
        <Table responsive className="mt-3 text-center" size="lg" striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              displayedData.map((registro, index) => (
                <tr key={startIndex + index + 1}>
                  <td>{startIndex + index + 1}</td>
                  <td>{registro.nombre}</td>
                  <td>{registro.email}</td>
                  <td>{registro.rol}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(registro.email)}
                      className="btn btn-warning btn-acciones"
                    >
                      <img
                        style={{ width: "20px" }}
                        className="img trash img-fluid icon-button"
                        src={editImg}
                      />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(registro.email)}
                      className="btn btn-danger btn-acciones"
                    >
                      <img
                        style={{ width: "20px" }}
                        className="img trash img-fluid icon-button"
                        src={trashImg}
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
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
      </div>
      {isVisible && (
        <RegisterUser
          handleRegister={handleRegister}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          updateData={updateData}
        />
      )}
    </>
  );
};
