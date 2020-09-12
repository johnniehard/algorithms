<script>
  import * as Tone from "tone";

  export let title;
  export let sort;
  export let unsorted;
  export let synth

  sort.sort(unsorted)

  function audialize(s) {
    const now = Tone.now();
    s.forEach((trace, i) => {
      trace.forEach((v, j) => {
        const lastNote = j === trace.length - 1 && i === s.length - 1;
        synth.triggerAttackRelease(
          v * 80,
          lastNote ? "4n" : "16n",
          now + 1 * i + 0.05 * j
        );
      });
    });
  }
</script>

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>

<h1>{title}</h1>
<div on:click={() => audialize(sort.trace)}>
  {#each sort.showTrace() as trace}{trace} <br />{/each}
</div>
