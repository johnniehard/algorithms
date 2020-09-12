<script>
  import * as Tone from "tone";

  export let title;
  export let sort;
  export let unsorted;
  export let synth;

  sort.sort(unsorted);

  let showTraces = [];

  function audialize(traces) {
    Tone.Transport.start();
    const now = Tone.now();
    traces.forEach((trace, i) => {
      trace.forEach((v, j) => {
        const lastNote = j === trace.length - 1 && i === traces.length - 1;

        Tone.Transport.scheduleOnce((time) => {
          const newTraces = [...showTraces];

          if (!newTraces[i]) newTraces.push([]);
          newTraces[i].push(v);
          showTraces = newTraces

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
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .sort-trace{
      display: grid;
      grid-auto-rows: auto;
      grid-auto-columns: auto;
  }
</style>

<h1 on:click={() => audialize(sort.trace)}>{title}</h1>
<div>
  {#each showTraces as trace}{trace} <br />{/each}
</div>
