<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let editingId: string | null = null;
	let editTitle: string = '';

	function startEdit(id: string, currentTitle: string) {
		editingId = id;
		editTitle = currentTitle;
	}

	function cancelEdit() {
		editingId = null;
		editTitle = '';
	}
</script>

<h1>Todo Tasks</h1>

<form method="post" action="?/create">
	<input name="title" placeholder="New task..." autocomplete="off" />
	<button type="submit">Add</button>
	<noscript><button type="submit">Create</button></noscript>
	<input type="hidden" name="noscript" value="1" />
	<!-- Progressive enhancement-friendly -->
	<!-- SvelteKit will enhance forms automatically -->
</form>

{#if data.items.length === 0}
	<p>No tasks yet.</p>
{/if}

<ul>
	{#each data.items as item}
		<li>
			<form method="post" action="?/toggle">
				<input type="hidden" name="id" value={item.id} />
				<input
					type="checkbox"
					name="completed"
					checked={item.completed === 'true'}
					on:change={(e) => (e.currentTarget.form as HTMLFormElement).requestSubmit()}
				/>
			</form>

			{#if editingId === item.id}
				<form method="post" action="?/update" style="display:inline">
					<input type="hidden" name="id" value={item.id} />
					<input name="title" bind:value={editTitle} />
					<button type="submit">Save</button>
					<button type="button" on:click={cancelEdit}>Cancel</button>
				</form>
			{:else}
				<span
					style:opacity={item.completed ? 0.6 : 1}
					style:text-decoration={item.completed ? 'line-through' : 'none'}>{item.title}</span
				>
				<button on:click={() => startEdit(item.id, item.title)}>Edit</button>
			{/if}

			<form
				method="post"
				action="?/delete"
				style="display:inline"
				on:submit={(e) => {
					if (!confirm('Delete this task?')) e.preventDefault();
				}}
			>
				<input type="hidden" name="id" value={item.id} />
				<button type="submit" aria-label="Delete">✕</button>
			</form>
		</li>
	{/each}
</ul>

<style>
	h1 {
		margin: 0 0 1rem 0;
	}
	form {
		margin: 0.25rem 0;
	}
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0;
	}
	input[name='title'] {
		padding: 0.4rem 0.5rem;
	}
	button {
		padding: 0.35rem 0.6rem;
	}
</style>
