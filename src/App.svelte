<script lang="ts">
	import { Sort } from './Sorting/index.ts'

	export let name: string;

	const sort = new Sort((a, b) => a < b ? -1 : b < a ? 1 : 0)

	const unsorted = [1, 2, 4, 3, 5]

	const isLess = sort.less(1, 3)
	sort.show(unsorted)

</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<p>
		{isLess}
	</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>