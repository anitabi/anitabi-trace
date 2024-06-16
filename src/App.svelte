<script>
  import Main from './components/Main.svelte';
  import SinglePlayer from './components/SinglePlayer.svelte';
  import SinglePlayerTimer from './components/SinglePlayerTimer.svelte';
  import Countdown from './components/Countdown.svelte';

  let currentPage = '/';

  function navigate(page) {
    currentPage = page;
  }
</script>

{#if currentPage === '/'}
  <Main {navigate} />
{:else if currentPage === '/single-player'}
  <SinglePlayer {navigate} />
{:else if currentPage === '/single-player-timer'}
  <SinglePlayerTimer {navigate} />
{:else if currentPage === '/countdown'}
  <Countdown {navigate} />
{/if}
