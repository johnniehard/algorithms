<script>
  import * as Tone from "tone";

  export let title;
  export let sort;
  export let unsorted;
  export let synth;

  sort.sort(unsorted);

  function audialize(s) {
    const now = Tone.now();
    s.forEach((trace, i) => {
      showTraces = [...showTraces, trace]
      trace.forEach((v, j) => {
        const lastNote = j === trace.length - 1 && i === s.length - 1;
        synth.triggerAttackRelease(
          v * 80,
          lastNote ? "4n" : "32n",
          now + 1 * i + 0.05 * j
        );
      });
    });
  }

  let showTraces = [];
</script>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>

<h1 on:click={() => audialize(sort.trace)}>{title}</h1>
<div>
  {#each showTraces as trace}{trace} <br />{/each}
</div>
