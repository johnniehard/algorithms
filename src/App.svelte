<script lang="ts">
  import shuffle from "lodash.shuffle";
  import range from "lodash.range";

  import { Selection } from "./Sorting/Selection";
  import { Insertion } from "./Sorting/Insertion";
  import { Shell } from "./Sorting/Shell";

  import Sort from "./Sort.svelte";

  import * as Tone from "tone";

  const selection = new Selection();
  const insertion = new Insertion();
  const shell = new Shell();

  const unsorted: number[] = shuffle(range(10));

  const synth = new Tone.Synth().toDestination();
  Tone.Transport.start();
</script>

<style>
  :global(body) {
    /* background: rgba(50, 50, 50, 1); */
  }
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: rgba(255, 255, 255, 0.8);
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

<svelte:body />
<main>
  <Sort {...{ title: 'Selection sort', unsorted, sort: selection, synth }} />

  <Sort {...{ title: 'Insertion sort', unsorted, sort: insertion, synth }} />

  <Sort {...{ title: 'Shellsort', unsorted, sort: shell, synth }} />
</main>
