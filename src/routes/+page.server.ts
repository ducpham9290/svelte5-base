import { DATABASE_URL, VITE_PORT } from '$env/static/private';

export function load() {
	console.log('DATABASE_URL', DATABASE_URL, VITE_PORT);
	return {
		dbUrl: DATABASE_URL,
		port: VITE_PORT
	};
}
