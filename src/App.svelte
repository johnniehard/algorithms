<script lang="ts">
	import { Selection } from './Sorting/Selection'

	export let name: string;

	const sort = new Selection((a, b) => {
		if(a < b){
			return -1
		}
		if(b < a){
			return 1
		}
		return 0
	})

	const unsorted: number[] = [8, 100, 2,5, 7, 4, 3, 5, 11, 8]

</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<p>
		{sort.show(unsorted)}
	</p>
	<p>
		{sort.show(sort.sort(unsorted))}
	</p>
	<p>
		{sort.show(unsorted)}
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