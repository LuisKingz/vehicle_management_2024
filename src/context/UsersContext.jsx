import { createContext, useContext } from "react";
import {
  addUserRequest,
  deleteUserRequest,
  updateUserRequest,
  getUsersRequest,
  findUserToUpdateRequest,
  changePasswordRequest,
} from "../api/users";

const UsersContext = createContext();

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

export const UsersProvider = ({ children }) => {
  const signup = async (user) => {
    try {
      const res = await addUserRequest(user);
      console.log(res);
      if (!res.status) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (email) => {
    try {
      const res = await deleteUserRequest(email);
      console.log(res);
      if (!res.status) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (email, user) => {
    try {
      await updateUserRequest(email, user);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsers = async () => {
    const res = await getUsersRequest();
    return res.data;
  };

  const getUser = async (email) => {
    const res = await findUserToUpdateRequest(email);
    return res.data;
  };

  const changePassword = async (email, password) => {
    try {
      const res = await changePasswordRequest(email, {password});
      console.log(res);
      if (!res.status) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        signup,
        deleteUser,
        updateUser,
        getUsers,
        getUser,
        changePassword,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
