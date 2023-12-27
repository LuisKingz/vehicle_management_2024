import axios from "./axios";

export const getVehiclesRequest = async () => axios.get("/vehicles");

export const getVehicleRequest = async (id) => axios.get(`/vehicles/${id}`);

export const addVehicleRequest = async (vehicle) => axios.post(`/vehicles`, vehicle);

export const deleteVehicleRequest = async (id) => axios.delete(`/vehicles/${id}`);

export const updateVehicleRequest = async (id, vehicle) => axios.put(`/vehicles/${id}`, vehicle);