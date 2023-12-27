import axios from "./axios";

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequest = (token) => axios.post(`/verify`, token);

export const logoutRequest = (token) => axios.post(`/logout`, token);