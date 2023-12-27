import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5500/api",
    // baseURL: "http://api.gestionvehicular.routedev.mx/api",
    withCredentials: true
})

export default instance;