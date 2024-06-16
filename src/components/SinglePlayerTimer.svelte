<script>
  export let navigate;
  let selectedGame = null;

  function selectGame(game) {
    selectedGame = game;
  }

  function startGame() {
    if (selectedGame) {
      navigate('/countdown');
    }
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

  .games {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 800px;
    margin-bottom: 20px;
    gap: 30px; /* 增加按钮之间的距离 */
  }

  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s, opacity 0.3s;
  }

  .game img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin-bottom: 10px;
    transition: transform 0.3s;
  }

  .game.selected {
    transform: scale(1.1);
  }

  .game.selected img {
    border: 3px solid #3498db;
  }

  .game:not(.selected) {
    opacity: 1; /* 默认状态下不透明 */
  }

  .games[data-selected='true'] .game:not(.selected) {
    opacity: 0.3; /* 选中一个按钮后，其他按钮透明 */
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
    <h1>单人计时</h1>
    <p>选择进行游戏的作品</p>
  </div>
  <div class="games" data-selected={selectedGame !== null}>
    <div class="game" class:selected={selectedGame === 'game1'} on:click={() => selectGame('game1')}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iDatrtMEPxs2iAtKGPo0uQfyQ29WCKXr6Q&s" alt="游戏1">
      <p>热门综合</p>
    </div>
    <div class="game" class:selected={selectedGame === 'game2'} on:click={() => selectGame('game2')}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iDatrtMEPxs2iAtKGPo0uQfyQ29WCKXr6Q&s" alt="游戏2">
      <p>青春猪头</p>
    </div>
    <div class="game" class:selected={selectedGame === 'game3'} on:click={() => selectGame('game3')}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iDatrtMEPxs2iAtKGPo0uQfyQ29WCKXr6Q&s" alt="游戏3">
      <p>孤独摇滚</p>
    </div>
    <div class="game" class:selected={selectedGame === 'game4'} on:click={() => selectGame('game4')}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_iDatrtMEPxs2iAtKGPo0uQfyQ29WCKXr6Q&s" alt="游戏4">
      <p>想哭的我戴上...</p>
    </div>
  </div>
  <button class="button" on:click={startGame}>立即开始</button>
</div>
