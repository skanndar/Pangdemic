'use strict'

// Creating different views and starting and ending the game

let game
let splashScreen // start game screen element
let gameScreen
let gameOverScreen // game over screen element
let rank

// used to create HTML elements
function buildDom (htmlString) {
  const div = document.createElement('div') // temporary container
  div.innerHTML = htmlString

  return div.children[0]
}

buildDom()

// splash screen
function createSplashScreen () {
  splashScreen = buildDom(`
  <main id='startscreen'>
  <nav>
    <a href="index.html"><img src="img/img/iconMask.png" alt="logo"></a>
    <audio 
    controls='true' 
    autoplay="autoplay"
    src="audio/Alpha.mp3"
    >
    If stream does not start automatically press the play button
  </audio >
  </nav>

  <h1 class='startscreen'>PANGDEMIC</h1>
  <section>      
  <h2>Controls:</h2>
  <p>Move: Push <b>Left</b> and <b>Right</b> arrows &#9664  --  &#9654 </p>
  <p>Shoot: Push <b>Spacebar &#9644&#9644&#9644&#9644 </b></p>
  </section>
  <div class='button'>
    <button id='start'>Start Game</button>
    <button id='ranking'>Ranking</button>
  </div>
</main> 
 `)

  document.body.appendChild(splashScreen)

  const audioVol = splashScreen.querySelector('audio')
  audioVol.volume = 0.2

  const startButton = splashScreen.querySelector('#start')
  startButton.addEventListener('click', function () {
    startGame()
  })
  const rankingButton = splashScreen.querySelector('#ranking')
  rankingButton.addEventListener('click', function () {
    ranking()
  })
}

// game screen
function createGameScreen () {
  gameScreen = buildDom(`
  <main class="game container">
  <nav>
    <a href="index.html"><img src="img/img/iconMask.png" alt="logo" /></a>
  </nav>
  <audio
    controls="true"
    autoplay="autoplay"
    src="audio/Plains of Passage.mp3">
    If stream does not start automatically press the play button
  </audio>

  <div class="canvas-container">
    <canvas></canvas>
  </div>
  <footer>
    <div class="time"></div>
    <div class="lives-score">
    <div class="lives">
      <span class="label">Lives:</span>
      <span class="value"></span>
    </div>
    <div class="score">
      <span class="label">Score:</span>
      <span class="value"></span>
    </div>
    </div>
  </footer>
</main>
  `)

  document.body.appendChild(gameScreen)
  const audioVol = gameScreen.querySelector('audio')
  audioVol.volume = 0.05
}

function removeScreen () {
  document.body.innerHTML = ''
}

// game over screen
function createGameOverScreen (score, time) {
  gameOverScreen = buildDom(`
  <main class="end-game">
  <nav>
    <a href="index.html"><img src="img/img/iconMask.png" alt="logo" /></a>
    <audio
      controls="true"
      autoplay="autoplay"
      src="audio/Way.mp3"
    >
      If stream does not start automatically press the play button
    </audio>
  </nav>

  <h1 class="game-over">Game over</h1>
  <p class="score">Your score: <span> ${score} </span></p>
  <button>Restart</button>
</main>
  `)
  if (time === 0) {
    const timeOver = gameOverScreen.querySelector('h1')
    timeOver.innerHTML = 'Game Over <br>time is up!!!'
  }

  document.body.appendChild(gameOverScreen)

  const audioVol = gameOverScreen.querySelector('audio')
  audioVol.volume = 0.1
  const restartButton = gameOverScreen.querySelector('button')
  restartButton.addEventListener('click', startGame)
}

function rankingScreen (name, score) {
  removeScreen()
  safeNameScore(name, score)
  rank = buildDom(`
  <main class="ranking">
  <nav>
    <a href="index.html"><img src="img/img/iconMask.png" alt="logo" /></a>
    <audio
      controls="true"
      autoplay="autoplay"
      src="audio/High Score.mp3"
    >
      If stream does not start automatically press the play button
    </audio>
  </nav>

  <h1 class="ranking">Ranking</h1>
  <ol class="rank-list">
    <li>${name}  ${score}</li>
    <li>${name}  ${score}</li>
    <li>${name}  ${score}</li>
    <li>${name}  ${score}</li>
    <li>${name}  ${score}</li>
    <li>${name}  ${score}</li>
    <li>${name}  ${score}</li>
    <li>${name}  ${score}</li>
    <li>${name}  ${score}</li>
  </ol>
  <button>Restart</button>
</main>
  `)

  document.body.appendChild(rank)

  const audioVol = rank.querySelector('audio')
  audioVol.volume = 0.05

  const restartButton = rank.querySelector('button')
  restartButton.addEventListener('click', startGame)
}

// start the game , end the game
function startGame () {
  removeScreen()
  createGameScreen()

  game = new Game()
  game.gameScreen = gameScreen

  // Start the game
  game.start(5)
}

function endGame (name, score, time) {
  removeScreen()
  createGameOverScreen(score, time)
  safeNameScore(name, score)
}

function safeNameScore (name, score) {

}

// Run the function   `createSplashScreen` once all the resources are loaded
window.addEventListener('load', createSplashScreen)

// autoplay="autoplay"
