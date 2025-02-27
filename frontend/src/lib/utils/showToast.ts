import { toast } from 'svelte-sonner';

interface ApiError {
	response?: {
		data?: {
			message?: string;
		};
		status?: number;
	};
}

export const showSuccess = (message: string) => {
	toast.success(message);
};

export const showError = (err: ApiError | null, text?: string) => {
	let message = err?.response?.data?.message || text;
	if (err?.response?.status === 403) message = 'No cuentas con los permisos necesarios';

	toast.error(message || 'Ocurrió un error');
};
