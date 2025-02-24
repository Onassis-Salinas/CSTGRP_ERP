import Cookies from 'js-cookie';

export function formatDate(strDate?: string) {
	if (!strDate) return '';
	const partes = strDate.split('T');
	const fecha = partes[0].split('-');
	const fechaFormateada = fecha[2] + '/' + fecha[1] + '/' + fecha[0];
	return fechaFormateada;
}

export function getWeekDays(dateString: any) {
	if (dateString instanceof Date) {
		dateString = dateString.toISOString().split('T')[0];
	} else if (dateString.includes('T')) {
		dateString = dateString.split('T')[0];
	}

	const date = new Date(dateString);
	const dayOfWeek = date.getDay();

	const monday = new Date(date);
	monday.setDate(date.getDate() - dayOfWeek);

	const friday = new Date(date);
	friday.setDate(date.getDate() - (dayOfWeek - 4));

	return [monday.toISOString().split('T')[0], friday.toISOString().split('T')[0]];
}

export function getDayNumber(date: string | Date) {
	const dateObject = new Date(date);
	return dateObject.getDay();
}

export function getImage(image: string) {
	return import.meta.env.VITE_BASEURL + '/static/' + image;
}

export function hasAccess(name: string) {
	return parseInt(Cookies.get('perm_' + name) || '0') > 0;
}

export function getPreview(file: any): Promise<string | null> {
	return new Promise((resolve, reject) => {
		if (!file) return resolve(null);

		const reader = new FileReader();
		reader.onload = (e) => {
			resolve(e?.target?.result as string);
		};
		reader.onerror = (err) => {
			reject(err);
		};

		reader.readAsDataURL(file);
	});
}
