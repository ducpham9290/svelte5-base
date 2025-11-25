import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { message } = await request.json();

	const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${__APP_ENV__.VITE_ROUTERAI_KEY as string}`
		},
		body: JSON.stringify({
			model: 'openai/gpt-3.5-turbo',
			stream: true,
			messages: [{ role: 'user', content: message }]
		})
	});

	// Trả nguyên stream cho client
	return new Response(upstream.body, {
		headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' }
	});
};
