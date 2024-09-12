import { toast } from 'svelte-sonner';

export const showSuccess = (message: string) => {
	toast.success(message);
};

export const showError = (err: any, text?: string) => {
	let message = err.response.data.message || text;
	if (err.response.status === 403) message = 'No cuentas con los permisos necesarios';

	toast.error(message);
};
