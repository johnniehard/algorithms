<script lang="ts">
	import { Selection } from './Sorting/Selection'

	const compare = (a: number, b: number) => {
		if(a < b){
			return -1
		}
		if(b < a){
			return 1
		}
		return 0
	}

	const selection = new Selection(compare)

	const unsorted: number[] = [8, 100, 2,5, 7, 4, 3, 5, 11, 8]
	selection.sort(unsorted)

</script>

<main>
	
	<h1>Selection sort</h1>
	{#each selection.showTrace() as trace}
		{trace} <br />
	{/each}

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