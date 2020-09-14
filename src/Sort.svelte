<script lang="typescript">
  import * as Tone from "tone";
  import {
    interpolateRainbow,
    interpolateYlGnBu,
    interpolateYlOrBr,
    interpolateCool,
  } from "d3-scale-chromatic";
  import { scaleLinear } from "d3-scale";
  import { extent } from "d3-array";

  const W = 400;
  const H = 60;

  const interpolate = interpolateCool;

  const notes = scaleLinear().range([100, 800]);
  const yScale = scaleLinear().range([1, H])

  export let title;
  export let sort;
  export let unsorted;
  export let synth;

 
  const n = unsorted.length;
  const aExtent = extent(unsorted);

  notes.domain(aExtent);
  yScale.domain(aExtent)

  const traceTime = .6;
  const noteTime = (traceTime - 0.1) / n;

  sort.sort(unsorted);

  let showTraces = [];

  function audialize(traces) {
    Tone.start();
    const now = Tone.now();
    traces.forEach((trace, i) => {
      trace.forEach((v, j) => {
        const lastNote = j === trace.length - 1 && i === traces.length - 1;

        Tone.Transport.scheduleOnce((time) => {
          synth.triggerAttackRelease(notes(v), noteTime);
          Tone.Draw.schedule(() => {
            const newTraces = [...showTraces];
            if (!newTraces[i]) newTraces.push([]);
            newTraces[i].push(v);
            showTraces = newTraces;
          }, time);
        }, now + traceTime * i + noteTime * j);
      });
    });
  }
</script>

<style>
  h1 {
    cursor: pointer;
    user-select: none;
    /* color: #ff3e00; */
    color: black;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .sort-trace {
    margin: 0 auto;
    justify-content: center;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    /* grid-gap: 5px; */
  }

  .container {
    display: grid;
    justify-content: center;
    align-items: center;
  }

  svg {
    margin-bottom: 4px;
  }
</style>

<h1 on:click={() => audialize(sort.trace)}>{title}</h1>
<div class="container">
  <div class="sort-trace">
    {#each showTraces as trace}
      <svg width={W} height={H}>
        {#each trace as value, i}
          <rect
            x={W * (i / n)}
            height={yScale(value)}
            width={W / n}
            y={H - yScale(value)}
            fill={interpolate(value / aExtent[1])}>
            <text>{notes(value)}</text>
          </rect>
        {/each}
      </svg>
    {/each}
  </div>
</div>
