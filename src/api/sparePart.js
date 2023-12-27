import axios from "./axios";

export const getSparePartsRequest = async (placa) => axios.get(`/spareParts/${placa}`);

export const addSparePartsRequest = async (spareParts) => axios.post(`/spareParts`, spareParts);

export const deleteSparePartsRequest = async (id) => axios.delete(`/spareParts/${id}`);

export const updateSparePartsRequest = async (id, spareParts) => axios.put(`/spareParts/${id}`, spareParts);