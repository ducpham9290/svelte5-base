<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	console.log('PUBLIC_API_URL', PUBLIC_API_URL);
	console.log('__APP_ENV__', __APP_ENV__);

	export let data;
	console.log('From server load:', data.dbUrl, data.port);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
