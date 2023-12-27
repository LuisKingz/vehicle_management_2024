import axios from "./axios";

export const getUsersRequest = async () => axios.get("/users");

export const addUserRequest = async (user) => axios.post(`/adduser`, user);

export const deleteUserRequest = async (email) => axios.delete(`/users/${email}`);

export const findUserToUpdateRequest = async (email) => axios.get(`/users/find/${email}`);

export const updateUserRequest = async (email, user) => axios.put(`/users/${email}`, user);

export const changePasswordRequest = async (email, password) => axios.put(`/users/password/${email}`, password)