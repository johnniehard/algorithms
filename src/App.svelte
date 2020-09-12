<script lang="ts">
  import { Selection } from "./Sorting/Selection";
  import { Insertion } from "./Sorting/Insertion";

  import * as Tone from "tone";

  const compare = (a: number, b: number) => {
    if (a < b) {
      return -1;
    }
    if (b < a) {
      return 1;
    }
    return 0;
  };

  const selection = new Selection(compare);
  const insertion = new Insertion(compare);

  const unsorted: number[] = [8, 20, 2, 5, 7, 4, 3, 5, 11, 8];
  selection.sort(unsorted);
  insertion.sort(unsorted);

  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();

  //play a middle 'C' for the duration of an 8th note
  synth.triggerAttackRelease(400, "8n");

  function audialize<T>(s : T[][]): void {
	const now = Tone.now()
	s.forEach((trace, i) => {
		trace.forEach((v: T, j) => {
			console.log(v)
			const lastNote : boolean = j === trace.length - 1 && i === s.length -1
			synth.triggerAttackRelease(v * 80, lastNote ? "4n" : "16n", now + 1 * i + 0.05 * j)
		})	
	});
  }
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
  <h1>Selection sort</h1>
  <div on:click={() => audialize(selection.trace)}>
    {#each selection.showTrace() as trace}{trace} <br />{/each}
  </div>

  <h1>Insertion sort</h1>
  <div>
    {#each insertion.showTrace() as trace}{trace} <br />{/each}
  </div>
</main>
