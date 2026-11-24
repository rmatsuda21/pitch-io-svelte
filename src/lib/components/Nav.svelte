<script lang="ts">
	import clef from '#lib/assets/clef.svg';
</script>

<header class="nav">
	<div class="stripes" aria-hidden="true">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
	<img class="clef" src={clef} alt="" />
	<a class="title" href="/">Pitch.io</a>
</header>

<style>
	.nav {
		position: relative;
		height: 165px;
		flex: none;
	}

	.stripes {
		position: absolute;
		top: 55px;
		left: 0;
		right: 0;
		height: 88px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.stripes div {
		height: 5px;
		background-color: var(--bittersweet);
	}

	.clef {
		position: absolute;
		left: 25px;
		top: 8px;
		height: 155px;
	}

	.title {
		position: absolute;
		top: 99px;
		left: 200px;
		transform: translate(-50%, -50%);
		color: var(--french-sky-blue);
		font-size: 52px;
		text-decoration: none;
		white-space: nowrap;
		text-shadow:
			-6px -6px 0 var(--royal-blue-dark),
			0 -6px 0 var(--royal-blue-dark),
			6px -6px 0 var(--royal-blue-dark),
			6px 0 0 var(--royal-blue-dark),
			6px 6px 0 var(--royal-blue-dark),
			0 6px 0 var(--royal-blue-dark),
			-6px 6px 0 var(--royal-blue-dark),
			-6px 0 0 var(--royal-blue-dark);
	}

	.title:focus-visible {
		outline: 3px solid white;
		outline-offset: 4px;
	}
</style>
