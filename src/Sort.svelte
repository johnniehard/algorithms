<script lang="typescript">
  // import * as Tone from "tone";
  import { scaleLinear } from "d3-scale";
  import { extent } from "d3-array";

  const W = 400;
  const H = 60;

  export let colorScale;

  const notes = scaleLinear().range([100, 800]);
  const yScale = scaleLinear().range([1, H]);
  const valueScale = scaleLinear().range([0, 1]);

  export let title;
  export let sort;
  export let unsorted;
  // export let synth;

  const n = unsorted.length;
  const aExtent = extent(unsorted);

  valueScale.domain(aExtent);
  notes.domain(aExtent);
  yScale.domain(aExtent);

  // const traceTime = 16.6;
  // const noteTime = (traceTime - 0.1) / n;

  sort.sort(unsorted);

  // let showTraces = [];
  let currentTrace = sort.trace[0];

  let frame = 0;
  // let start;
  let playing = false;

  function step(timestamp) {
    // if (start === undefined) start = timestamp;
    // const elapsed = timestamp - start;

    // if (elapsed > traceTime) {
    frame += 1;
    // start = timestamp;
    // }

    currentTrace = sort.trace[frame];

    if (frame < sort.trace.length - 1) {
      requestAnimationFrame(step);
    } else {
      playing = false;
    }
  }

  // function audialize(traces) {
  //   Tone.start();
  //   const now = Tone.now();
  //   traces.forEach((trace, i) => {
  //     trace.forEach((v, j) => {
  //       const lastNote = j === trace.length - 1 && i === traces.length - 1;

  //       Tone.Transport.scheduleOnce((time) => {
  //         synth.triggerAttackRelease(notes(v), noteTime);
  //         Tone.Draw.schedule(() => {
  //           const newTraces = [...showTraces];
  //           if (!newTraces[i]) newTraces.push([]);
  //           newTraces[i].push(v);
  //           showTraces = newTraces;
  //         }, time);
  //       }, now + traceTime * i + noteTime * j);
  //     });
  //   });
  // }
</script>

<style>
  h1 {
    color: gray;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin-top: 0;
  }

  .container {
    background: rgb(252, 252, 252);
    cursor: pointer;
    padding: 5px;
    transition: background 0.2s ease;
    border-radius: 10px;
  }

  .container:hover,
  .playing {
    background: white;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1),
      -5px -5px 10px rgba(0, 0, 0, 0.01);
  }

  .playing h1 {
    color: black;
  }

  svg {
    width: 100%;
    height: auto;
  }
</style>

<div
  class={`container ${playing ? 'playing' : ''}`}
  on:click={() => {
    playing = true;
    frame = 0;
    window.requestAnimationFrame(step);
  }}>
  <h1>{title}</h1>
  <svg viewBox={`0 0 ${W} ${H}`}>
    {#each currentTrace as value, i}
      <rect
        x={W * (i / n)}
        height={yScale(value)}
        width={W / n}
        y={H - yScale(value)}
        fill={colorScale(valueScale(value))}>
        <text>{notes(value)}</text>
      </rect>
    {/each}
  </svg>
</div>
