<script>
    import { userId } from '../store';
    export let navigate;
    let inputId = '';
  
    function confirmId() {
      userId.set(inputId);
      navigate('/single-player-timer');
    }
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
  
    .input-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }
  
    .input-group input {
      padding: 10px;
      font-size: 1rem;
      margin-bottom: 10px;
      border-radius: 5px;
      border: 1px solid #3498db;
    }
  
    .button {
      padding: 10px 20px;
      font-size: 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: #3498db;
    }
  
    .button-back {
      position: fixed;
      top: 20px;
      left: 20px;
      cursor: pointer;
      color: white;
      font-size: 1.2rem;
    }
  </style>
  
  <div class="container">
    <div class="background"></div>
    <div class="button-back" on:click={() => navigate('/')}>返回</div>
    <div class="header">
      <h1>昵称</h1>
      <p>无需注册就能玩~</p>
    </div>
    <div class="input-group">
      <input type="text" placeholder="中英日2-10位" bind:value={inputId} />
      <button class="button" on:click={confirmId}>确认</button>
    </div>
    <div>
      <p>已注册？ 直接登录</p>
    </div>
  </div>
  