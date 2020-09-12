<script lang="ts">
  import { Selection } from "./Sorting/Selection";
  import { Insertion } from "./Sorting/Insertion";

  import Sort from './Sort.svelte'

  import * as Tone from "tone";

  const selection = new Selection();
  const insertion = new Insertion();

  const unsorted: number[] = [8, 20, 2, 5, 7, 4, 3, 5, 11, 8];

  const synth = new Tone.Synth().toDestination();

</script>

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

<main>

	<Sort
		{...{
			title: "Selection sort",
			unsorted,
			sort: selection,
			synth,
		}}
	/>

	<Sort
	{...{
		title: "Insertion sort",
		unsorted,
		sort: insertion,
		synth,
	}}
/>

 
</main>
