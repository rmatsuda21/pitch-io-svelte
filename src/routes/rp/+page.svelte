<script lang="ts">
	import { onMount } from 'svelte';
	import Trainer from '#lib/components/Trainer.svelte';
	import { play, preload } from '#lib/audio.ts';
	import { REFERENCE, randomPitch } from '#lib/music.ts';

	// A very low note doubles as the "wrong" buzzer, as in the original.
	const BUZZ = 20;

	let mystery: number | null = null;

	onMount(() => preload('notes'));
</script>

<svelte:head>
	<title>Relative Pitch · Pitch.io</title>
</svelte:head>

<Trainer
	next={() => (mystery = randomPitch(mystery))}
	playReference={() => play('notes', [REFERENCE], 2)}
	playMystery={(auto) => mystery !== null && play('notes', [mystery], 2, { auto })}
	playWrong={() => play('notes', [BUZZ], 1)}
	isCorrect={(pitch) => pitch === mystery}
/>
