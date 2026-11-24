<script lang="ts">
	// The screen shared by Relative Pitch and Chords: play the reference,
	// play the mystery sound, pick a key, submit.
	import { onMount } from 'svelte';
	import Keyboard from './Keyboard.svelte';
	import questionIcon from '#lib/assets/question.svg';
	import volumeIcon from '#lib/assets/volume.svg';
	import { REFERENCE, noteName } from '#lib/music.ts';

	interface Props {
		/** Move on to a new mystery sound. */
		next: () => void;
		playReference: () => void;
		/** `auto` is true when the sound was not asked for by a click. */
		playMystery: (auto: boolean) => void;
		playWrong: () => void;
		/** Whether the picked MIDI pitch answers the current mystery. */
		isCorrect: (pitch: number) => boolean;
	}

	let { next, playReference, playMystery, playWrong, isCorrect }: Props = $props();

	let keyboard = $state<Keyboard>();
	let score = $state(0);
	let selected = $state<number | null>(null);
	let wrong = $state(false);

	const picked = $derived(selected === null ? null : noteName(REFERENCE + selected));

	onMount(() => {
		next();
		playMystery(true);
	});

	function press(offset: number) {
		// Clicking the highlighted key again clears it.
		selected = selected === offset ? null : offset;
		wrong = false;
	}

	function reference() {
		playReference();
		keyboard?.blink(0);
	}

	function submit() {
		if (selected === null) return;
		if (isCorrect(REFERENCE + selected)) {
			score += 1;
			selected = null;
			wrong = false;
			next();
			playMystery(false);
		} else {
			wrong = true;
			playWrong();
		}
	}
</script>

<div class="actions">
	<button class="action" onclick={reference}>
		<img src={volumeIcon} alt="" />
		<span>Play Reference</span>
	</button>
	<button class="action" onclick={() => playMystery(false)}>
		<img src={questionIcon} alt="" />
		<span>Play Mystery</span>
	</button>
</div>

<Keyboard bind:this={keyboard} {selected} {wrong} onpress={press} />

<div class="answer">
	<div class="score" aria-live="polite">Correct: {score}</div>
	<div class="boards" aria-label="Selected note">
		<div class="board">{picked?.name ?? ''}</div>
		<div class="board">{picked?.octave ?? ''}</div>
	</div>
	<button class="submit" onclick={submit}>Submit</button>
</div>

<style>
	.actions {
		display: flex;
		justify-content: space-between;
		gap: 24px;
		width: min(600px, 100%);
	}

	.action {
		width: min(200px, 44vw);
		aspect-ratio: 1;
		border-radius: 15%;
		background-color: var(--french-sky-blue);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transition: transform 0.25s linear;
	}

	.action:hover {
		transform: scale(1.01);
	}

	.action img {
		margin: 15px;
		max-height: 45%;
	}

	.action span {
		font-size: clamp(18px, 5vw, 25px);
		color: black;
	}

	.answer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 20px 40px;
		width: min(802px, 100%);
	}

	.score {
		font-size: clamp(36px, 6vw, 55px);
		color: var(--beau-blue);
		white-space: nowrap;
	}

	.boards {
		display: flex;
		gap: 30px;
	}

	.board {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 48px;
		width: 80px;
		height: 80px;
		border-radius: 5%;
		background-color: var(--beau-blue);
		color: black;
	}

	.submit {
		font-size: 50px;
		width: 190px;
		height: 80px;
		border-radius: 5%;
		background-color: var(--bittersweet);
		color: black;
		transition: filter 0.25s ease-out;
	}

	.submit:hover {
		filter: brightness(1.1);
	}
</style>
