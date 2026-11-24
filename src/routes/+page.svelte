<script lang="ts">
	import relative from '#lib/assets/RP.svg';
	import chord from '#lib/assets/Chord.svg';
	import clef from '#lib/assets/singleTreble.svg';

	const modes = [
		{ href: '/rp', title: 'Relative Pitch', text: 'Train your relative pitch!', img: relative },
		{
			href: '/chords',
			title: 'Chords',
			text: 'How well can you recognize your chords?',
			img: chord
		},
		{
			href: '/sandbox',
			title: 'Sandbox',
			text: 'Learn your scales and chords in an interactive sandbox.',
			img: clef
		}
	];
</script>

<svelte:head>
	<title>Pitch.io</title>
</svelte:head>

<h1>Train your musical skills</h1>

<div class="cards">
	{#each modes as mode (mode.href)}
		<a class="card" href={mode.href}>
			<img src={mode.img} alt="" />
			<span class="name">{mode.title}</span>
			<span class="text">{mode.text}</span>
		</a>
	{/each}
</div>

<style>
	h1 {
		color: white;
		font-size: clamp(34px, 6vw, 55px);
		text-align: center;
	}

	.cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 40px;
		width: min(1300px, 100%);
	}

	.card {
		flex: 1 1 260px;
		max-width: 325px;
		min-height: 450px;
		margin: 0 auto;
		padding: 35px 20px;
		box-sizing: border-box;
		border-radius: 49px;
		background-color: var(--french-sky-blue);
		color: black;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		transition:
			transform 0.5s ease-out,
			box-shadow 0.75s ease-out;
	}

	.card:hover,
	.card:focus-visible {
		transform: scale(1.05);
		box-shadow: 0 0 25px var(--glaucous);
		outline: none;
	}

	.card img {
		height: 150px;
	}

	.name {
		font-size: 40px;
		color: var(--royal-blue-dark);
		margin-top: 25px;
	}

	.text {
		font-size: 25px;
		width: 80%;
		margin-top: 45px;
	}
</style>
