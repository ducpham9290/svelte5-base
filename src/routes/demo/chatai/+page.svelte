<script lang="ts">
	let userInput = '';
	let messages: { role: 'user' | 'assistant'; text: string }[] = [];

	async function sendMessage() {
		if (!userInput.trim()) return;

		// Thêm tin nhắn của user
		messages = [...messages, { role: 'user', text: userInput }];

		// Tạo khung tin nhắn assistant rỗng để append từng chunk
		const assistantMsg: { role: 'assistant'; text: string } = { role: 'assistant', text: '' };
		messages = [...messages, assistantMsg];

		// Gửi request tới endpoint stream
		const res = await fetch('/api/openai', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ message: userInput })
		});

		// Đọc từng chunk
		const reader = res.body?.getReader();
		const decoder = new TextDecoder();
		if (!reader) return;

		while (true) {
			const { value, done } = await reader.read();
			if (done) break;

			// Giải mã chunk thành text
			const chunk = decoder.decode(value, { stream: true });

			// SSE gửi nhiều dòng, tách theo \n
			for (const line of chunk.split('\n')) {
				const trimmed = line.trim();
				if (!trimmed || !trimmed.startsWith('data:')) continue;
				const dataStr = trimmed.replace(/^data:\s*/, '');
				if (dataStr === '[DONE]') break;

				try {
					const json = JSON.parse(dataStr);
					const delta = json.choices?.[0]?.delta?.content;
					if (delta) {
						assistantMsg.text += delta;
						messages = [...messages]; // trigger re-render
					}
				} catch (err) {
					console.error('JSON parse error', err);
				}
			}
		}

		userInput = '';
	}
</script>

<h1 class="text-xl font-bold">SvelteKit AI Chatbot</h1>

<div class="chat-window">
	{#each messages as m}
		<p class={m.role}>{m.role}: {m.text}</p>
	{/each}
</div>

<input
	bind:value={userInput}
	placeholder="Nhập tin nhắn..."
	on:keydown={(e) => e.key === 'Enter' && sendMessage()}
/>
<button on:click={sendMessage}>Gửi</button>

<style>
	.chat-window {
		max-height: 400px;
		overflow-y: auto;
		margin-bottom: 1rem;
	}
	.user {
		color: blue;
	}
	.assistant {
		color: green;
	}
</style>
