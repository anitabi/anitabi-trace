<script>
  export let navigate;

  import { userId } from '../store';
  let id;

  userId.subscribe(value => {
    id = value;
  });
</script>

<style>
  .container {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    overflow: hidden;
  }

  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://images.saymedia-content.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTkwNzQ3Njk4ODU1NDIxNTg2/anime-review-k-on-season-1-2009.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
  }

  .header {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
  }

  .buttons {
    display: flex;
    gap: 20px;
  }

  .button {
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .single {
    background-color: #3498db;
  }

  .online {
    background-color: #e67e22;
  }
</style>

<div class="container">
  <div class="background"></div>
  <div class="header">
    <p>欢迎 {id}</p>
    <h1>anitabi 巡礼对决</h1>
  </div>
  <div class="buttons">
    <button class="button single" on:click={() => navigate('/single-player')}>单人计时</button>
    <button class="button online">线上对战</button>
  </div>
</div>
