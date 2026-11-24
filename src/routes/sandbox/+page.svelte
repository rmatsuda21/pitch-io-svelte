<script lang="ts">
	import { onMount } from 'svelte';
	import Keyboard from '#lib/components/Keyboard.svelte';
	import { play, preload } from '#lib/audio.ts';
	import { REFERENCE } from '#lib/music.ts';

	// Computer keys from C3 upwards, laid out like a piano: the home row is
	// the white keys and the row above is the black keys.
	const KEY_ORDER = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', ';'];
	const KEY_TO_OFFSET = new Map(KEY_ORDER.map((key, index) => [key, index - 12]));

	let keyboard = $state<Keyboard>();

	onMount(() => preload('notes'));

	function press(offset: number) {
		keyboard?.blink(offset);
		play('notes', [REFERENCE + offset], 1);
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
		const offset = KEY_TO_OFFSET.get(event.key.toLowerCase());
		if (offset !== undefined) press(offset);
	}
</script>

<svelte:window {onkeydown} />

<svelte:head>
	<title>Sandbox · Pitch.io</title>
</svelte:head>

<div class="intro">
	<h1>Play your heart out!</h1>
	<p>Hint: your keyboard is your friend :D</p>
</div>

<Keyboard bind:this={keyboard} onpress={press} />

<style>
	.intro {
		text-align: center;
		color: var(--glaucous);
	}

	h1 {
		font-size: clamp(44px, 9vw, 100px);
		line-height: 1.1;
	}

	p {
		font-size: clamp(18px, 3vw, 25px);
		margin-top: 15px;
	}
</style>
