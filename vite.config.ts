import { paraglideVitePlugin } from '@inlang/paraglide-js';
import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';
import { svelteChecker } from 'vite-plugin-svelte-checker';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), 'VITE_');
	return {
		plugins: [
			svelteChecker({
				typescript: true
			}),
			tailwindcss(),
			sveltekit(),
			devtoolsJson(),
			paraglideVitePlugin({
				project: './project.inlang',
				outdir: './src/lib/paraglide'
			})
		],
		define: {
			__APP_ENV__: {
				...env
			}
		},
		test: {
			expect: { requireAssertions: true },
			projects: [
				{
					extends: './vite.config.ts',
					test: {
						name: 'client',
						environment: 'browser',
						browser: {
							enabled: true,
							provider: 'playwright',
							instances: [{ browser: 'chromium' }]
						},
						include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
						exclude: ['src/lib/server/**'],
						setupFiles: ['./vitest-setup-client.ts']
					}
				},
				{
					extends: './vite.config.ts',
					test: {
						name: 'server',
						environment: 'node',
						include: ['src/**/*.{test,spec}.{js,ts}'],
						exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
					}
				}
			]
		},
		server: {
			port: env.VITE_PORT ? parseInt(env.VITE_PORT) : 5173,
			open: true,
			cors: true,
			host: true
		}
	};
});
