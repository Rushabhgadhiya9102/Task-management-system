import axios from "axios";

const apiInstance = axios.create({
    baseURL:import.meta.env.VITE_FIREBASE_DATABASE_URL + '/todoList',
})

export default apiInstance;