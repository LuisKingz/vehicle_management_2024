import axios from "./axios";

export const getMaintenancesRequest = async (placa) => axios.get(`/maintenances/${placa}`);

export const addMaintenanceRequest = async (maintenance) => axios.post(`/maintenances`, maintenance);

export const deleteMaintenanceRequest = async (id) => axios.delete(`/maintenances/${id}`);

export const updateMaintenanceRequest = async (id, maintenance) => axios.put(`/maintenances/${id}`, maintenance);