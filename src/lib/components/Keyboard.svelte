<script lang="ts">
	import { KEYS, KEYBOARD_HEIGHT, KEYBOARD_WIDTH } from '#lib/keys.ts';
	import { REFERENCE, noteName } from '#lib/music.ts';

	interface Props {
		/** Offset from middle C of the highlighted key, if any. */
		selected?: number | null;
		/** Show the highlighted key as a wrong answer. */
		wrong?: boolean;
		onpress: (offset: number) => void;
	}

	let { selected = null, wrong = false, onpress }: Props = $props();

	let blinking = $state<Record<number, boolean>>({});

	/** Flash a key once. */
	export function blink(offset: number) {
		blinking[offset] = true;
	}

	function label(offset: number) {
		const { name, octave } = noteName(REFERENCE + offset);
		return `${name}${octave}`;
	}

	function onkeydown(event: KeyboardEvent, offset: number) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onpress(offset);
		}
	}
</script>

<svg
	class="keyboard"
	viewBox="-4 -4 {KEYBOARD_WIDTH + 8} {KEYBOARD_HEIGHT + 8}"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	role="group"
	aria-label="Piano keyboard"
>
	{#each KEYS as key (key.offset)}
		<g
			class="key"
			class:black={key.black}
			class:active={selected === key.offset && !wrong}
			class:wrong={selected === key.offset && wrong}
			class:blink={blinking[key.offset]}
			role="button"
			tabindex="0"
			aria-label={label(key.offset)}
			aria-pressed={selected === key.offset}
			onclick={() => onpress(key.offset)}
			onkeydown={(event) => onkeydown(event, key.offset)}
			onanimationend={() => (blinking[key.offset] = false)}
		>
			<path d={key.d} />
		</g>
	{/each}
</svg>

<style>
	.keyboard {
		display: block;
		width: min(802px, 100%);
		height: auto;
		overflow: visible;
	}

	.key {
		color: var(--beau-blue);
		cursor: pointer;
		outline: none;
	}

	.key.black {
		color: var(--french-sky-blue);
	}

	.key path {
		fill: currentColor;
	}

	.key:hover path,
	.key:focus-visible path {
		fill: var(--glaucous);
	}

	.key:focus-visible path {
		stroke: white;
		stroke-width: 3px;
	}

	.key.active path {
		fill: var(--glaucous);
		stroke: var(--royal-blue-dark);
		stroke-width: 5px;
	}

	.key.wrong path {
		fill: var(--bittersweet);
		stroke: var(--royal-blue-dark);
		stroke-width: 5px;
	}

	.key.blink path {
		animation: blink 0.26s ease-in-out;
	}

	@keyframes blink {
		0%,
		100% {
			stroke: var(--royal-blue-dark);
			stroke-width: 0px;
			fill: currentColor;
		}
		50% {
			stroke: var(--royal-blue-dark);
			stroke-width: 8px;
			fill: var(--glaucous);
		}
	}
</style>
