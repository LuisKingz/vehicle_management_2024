import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5502/api",
    // baseURL: "http://api.gestionvehicular.routedev.mx/api",
    withCredentials: true
})

export default instance;