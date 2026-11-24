<script lang="ts">
	import { onMount } from 'svelte';
	import Trainer from '#lib/components/Trainer.svelte';
	import { play, preload } from '#lib/audio.ts';
	import { REFERENCE, chordPitches, randomPitch, samePitchClass, type Chord } from '#lib/music.ts';

	const reference: Chord = { root: REFERENCE, variant: 'major' };
	// A low minor chord doubles as the "wrong" buzzer, as in the original.
	const buzz: Chord = { root: 20, variant: 'minor' };

	let mystery: Chord | null = null;

	onMount(() => preload('chords'));

	function next() {
		// Only major chords are asked, as in the original. The answer is the
		// root, in any octave.
		let root = randomPitch(mystery?.root ?? null);
		while (mystery && samePitchClass(root, mystery.root)) {
			root = randomPitch(mystery.root);
		}
		mystery = { root, variant: 'major' };
	}

	function playChord(chord: Chord, duration: number, auto = false) {
		play('chords', chordPitches(chord), duration, { auto });
	}
</script>

<svelte:head>
	<title>Chords · Pitch.io</title>
</svelte:head>

<Trainer
	{next}
	playReference={() => playChord(reference, 2)}
	playMystery={(auto) => mystery && playChord(mystery, 2, auto)}
	playWrong={() => playChord(buzz, 1)}
	isCorrect={(pitch) => mystery !== null && samePitchClass(pitch, mystery.root)}
/>
