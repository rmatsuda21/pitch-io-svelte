<script lang="ts">
	import favicon from '#lib/assets/singleTreble.svg';
	import Nav from '#lib/components/Nav.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta
		name="description"
		content="Train your relative pitch and chord identification, or just play."
	/>
</svelte:head>

<div class="app">
	<Nav />
	<main>
		{@render children()}
	</main>
</div>

<style>
	:global(:root) {
		--royal-blue-dark: #001c55;
		--glaucous: #5e7ce2;
		--french-sky-blue: #92b4f4;
		--beau-blue: #cfdee7;
		--bittersweet: #ff6b6b;
	}

	:global(*) {
		margin: 0;
		padding: 0;
		font-family: 'Rowdies', cursive;
		font-weight: 400;
	}

	:global(body) {
		background-color: var(--royal-blue-dark);
	}

	:global(button) {
		border: none;
		cursor: pointer;
		font-size: inherit;
	}

	:global(button:focus-visible) {
		outline: 3px solid white;
		outline-offset: 3px;
	}

	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 50px;
		padding: 35px 16px 48px;
	}
</style>
