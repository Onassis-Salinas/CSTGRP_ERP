import { goto } from '$app/navigation';
import axios, { type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASEURL
});
api.defaults.withCredentials = true;

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			goto('/login');
		}
		return Promise.reject(error);
	}
);

export default api;
