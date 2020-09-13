<script>
  import * as Tone from "tone";
  import { interpolateRainbow, interpolateYlGnBu } from "d3-scale-chromatic";

  const interpolate = interpolateYlGnBu

  export let title;
  export let sort;
  export let unsorted;
  export let synth;

  sort.sort(unsorted);

  let showTraces = [];

  function audialize(traces) {
    const now = Tone.now();
    traces.forEach((trace, i) => {
      trace.forEach((v, j) => {
        const lastNote = j === trace.length - 1 && i === traces.length - 1;

        Tone.Transport.scheduleOnce((time) => {
          const newTraces = [...showTraces];

          if (!newTraces[i]) newTraces.push([]);
          newTraces[i].push(v);
          showTraces = newTraces;

          synth.triggerAttackRelease(v * 80, lastNote ? "4n" : "32n");
        }, now + 1 * i + 0.05 * j);
      });
    });
  }
</script>

<style>
  h1 {
    cursor: pointer;
    user-select: none;
    /* color: #ff3e00; */
    color: white;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .sort-trace {
    margin: 0 auto;
    /* max-width: 400px; */
    justify-content: center;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-auto-rows: auto;
    /* grid-gap: 5px; */
  }

  .sort-trace > * {
    /* border: 1px solid black; */
    width: 20px;
    height: 20px;
  }

  .container {
    display: grid;
    justify-content: center;
    align-items: center;
  }
</style>

<h1 on:click={() => audialize(sort.trace)}>{title}</h1>
<div class="container">
  <div class="sort-trace">
    {#each showTraces as trace}
      {#each trace as value}
        <div style={`background: ${interpolate(value / 10)}`} />
      {/each}
    {/each}
  </div>
</div>
