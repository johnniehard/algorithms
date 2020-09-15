<script lang="ts">
  import shuffle from "lodash.shuffle";
  import range from "lodash.range";

  import {
    interpolateRainbow,
    interpolateYlGnBu,
    interpolateYlOrBr,
    interpolateCool,
  } from "d3-scale-chromatic";

  import { Selection } from "./Sorting/Selection";
  import { Insertion } from "./Sorting/Insertion";
  import { Shell } from "./Sorting/Shell";
  import { Merge } from "./Sorting/Merge";

  import Sort from "./Sort.svelte";

  import * as Tone from "tone";

  const selection = new Selection();
  const insertion = new Insertion();
  const shell = new Shell();
  const merge = new Merge();

  const colorScales = [
    interpolateRainbow,
    interpolateYlGnBu,
    interpolateYlOrBr,
    interpolateCool,
  ];

  let currentColor = new Date().getTime() % colorScales.length;

  const changeColor = () => {
    currentColor = (currentColor + 1) % colorScales.length;
  };

  $: colorScale = colorScales[currentColor];
  $: nextColorScale = colorScales[(currentColor + 1) % colorScales.length];

  const unsorted: number[] = shuffle(range(100));

  const synth = new Tone.Synth().toDestination();
  Tone.Transport.start();
</script>

<style>
  :global(body) {
    background: rgb(252, 252, 252);
    padding: 0;
    margin: 0;
    /* background: rgba(50, 50, 50, 1); */
  }

  :global(*){
    box-sizing: border-box;
  }

  main {
    text-align: center;
    padding: 1em;
    display: grid;
    justify-content: center;
    grid-gap: 10px;
    margin-bottom: 200px;

  }

  main p {
    max-width: 500px;
  }

  .menu {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: flex-end;
  }

  .menu button {
    margin: 0;
    cursor: pointer;
    border: none;
    background: none;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<svelte:body />
<main>
  <div class="menu">
    <button on:click={changeColor}>
      <svg width="40" height="40">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color={nextColorScale(0)} />
            <stop offset="25%" stop-color={nextColorScale(0.25)} />
            <stop offset="50%" stop-color={nextColorScale(0.5)} />
            <stop offset="75%" stop-color={nextColorScale(0.75)} />
            <stop offset="100%" stop-color={nextColorScale(0)} />
          </linearGradient>
        </defs>
        <rect width="40" height="40" fill="url(#gradient)" stroke="none" rx="10"/>
      </svg>
    </button>
  </div>

  <Sort
    {...{ title: 'Selection sort', unsorted, sort: selection, synth, colorScale }} />

  <Sort
    {...{ title: 'Insertion sort', unsorted, sort: insertion, synth, colorScale }} />

  <Sort {...{ title: 'Shellsort', unsorted, sort: shell, synth, colorScale }} />

  <Sort {...{ title: 'Mergesort', unsorted, sort: merge, synth, colorScale }} />

  <p>
  </p>
</main>
