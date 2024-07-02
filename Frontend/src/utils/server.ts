import axios, { type AxiosInstance } from "axios";
import { navigate } from "svelte-routing";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
});
api.defaults.withCredentials = true;

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            navigate("/login");
        }
        return Promise.reject(error);
    }
);

export default api;
