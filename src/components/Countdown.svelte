<script>
  import { onMount } from 'svelte';
  export let navigate;
  let countdown = 3;
  const countdownTexts = ['3', '2', '1', 'START'];
  let displayText = countdownTexts[countdown];

  function startCountdown() {
    let index = 0;
    displayText = countdownTexts[index];
    const interval = setInterval(() => {
      index += 1;
      if (index < countdownTexts.length) {
        displayText = countdownTexts[index];
      }
      if (index === countdownTexts.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/game'); // 假设这是游戏开始的页面
        }, 1000);
      }
    }, 1000);
  }

  onMount(() => {
    startCountdown();
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
      background-image: url('https://p0.itc.cn/images01/20200902/c768e1601ddd421fb831270bac744567.jpeg');
      background-size: cover;
      background-position: center;
      z-index: -1;
    }
  
    .header {
      font-size: 2rem;
      margin-bottom: 20px;
      text-align: center;
    }
  
    .countdown {
      font-size: 6rem;
      font-weight: bold;
    }
  </style>
  
  <div class="container">
    <div class="background"></div>
    <div class="header">
      <h1>单人计时</h1>
      <p>60秒内标尽可能标准更多点!</p>
    </div>
    <div class="countdown">
      {displayText}
    </div>
  </div>
  