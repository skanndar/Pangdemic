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
        <audio controls='true' width="150px" height="25" allow=”autoplay”  src="audio/PANG Mt Fuji.mp3">If stream does not start automatically press the play button</audio >


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
    width="150px"
    height="25"
    src="audio/PANG - Barcelona.mp3"
  >
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
}

function removeScreen () {
  document.body.innerHTML = ''
}

// game over screen
function createGameOverScreen (score) {
  gameOverScreen = buildDom(`
  <main class='end-game'>
  <nav><a href="index.html"><img src="img/img/iconMask.png" alt="logo"></a>
  <audio controls='true' width="150px" height="25" allow=”autoplay” autoplay="autoplay" src="audio/PANG Angkor wat.mp3">If stream does not start automatically press the play button</audio >
  </nav>

    <h1 class='game-over'>Game over</h1>
    <p class='score'>Your score: <span> ${score} </span></p>
    <button>Restart</button>
  </main>
  `)

  const restartButton = gameOverScreen.querySelector('button')
  restartButton.addEventListener('click', startGame)

  document.body.appendChild(gameOverScreen)
}

function rankingScreen (name, score) {
  removeScreen()
  rank = buildDom(`
  <main class='ranking'>

  <nav>
  <a href="index.html"><img src="img/img/iconMask.png" alt="logo"></a>
  <audio controls='true' width="150px" height="25" allow=”autoplay”  src="audio/PANG Angkor wat.mp3">If stream does not start automatically press the play button</audio >
  
  </nav>

    <h1 class='ranking'>Ranking</h1>
    <ol class='rank-list'>
      <li>${name}${score}</li>
      <li>${name}${score}</li>
      <li>${name}${score}</li>
      <li>${name}${score}</li>
      <li>${name}${score}</li>
      <li>${name}${score}</li>
      <li>${name}${score}</li>
      <li>${name}${score}</li>
      <li>${name}${score}</li>
    </ol>
    <button>Restart</button>
  </main>
  `)

  const restartButton = rank.querySelector('button')
  restartButton.addEventListener('click', startGame)

  document.body.appendChild(rank)
}

// start the game , end the game
function startGame () {
  removeScreen()
  createGameScreen()

  game = new Game()
  game.gameScreen = gameScreen

  // Start the game
  game.start(1)
}

function endGame (score) {
  removeScreen()
  createGameOverScreen(score)
}

function ranking () {
  removeScreen()
  rankingScreen()
}

// Run the function   `createSplashScreen` once all the resources are loaded
window.addEventListener('load', createSplashScreen)

//autoplay="autoplay"