<script>
  import * as Tone from "tone";
  import { interpolateRainbow, interpolateYlGnBu } from "d3-scale-chromatic";
  import { scaleOrdinal } from "d3-scale";

  const interpolate = interpolateYlGnBu;
  const notes = scaleOrdinal().range([
    "A3",
    "A#3",
    "B3",
    "C3",
    "C#3",
    "D3",
    "E#3",
    "E3",
    "F3",
    "F#3",
    "G3",
    "G#3",
    "A4",
    "A#4",
    "B4",
    "C4",
    "C#4",
    "D4",
    "E#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
  ]);

  export let title;
  export let sort;
  export let unsorted;
  export let synth;

  sort.sort(unsorted);

  let showTraces = [];

  console.log('NOTES', notes(3))

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

          synth.triggerAttackRelease(
            notes(v + 1 / 10),
            lastNote ? "4n" : "32n"
          );
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
