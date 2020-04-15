'use strict'

// Creating different views and starting and ending the game

let game
let splashScreen // start game screen element
let gameScreen
let gameOverScreen // game over screen element

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
    <audio controls='true' width="150px" height="25" allow=”autoplay” autoplay="autoplay" src="audio/PANG Mt Fuji.mp3">If stream does not start automatically press the play button</audio >


    </nav>

      <h1 class='startscreen'>PANGDEMIC</h1>
      <section>      
      <h2>Controls:</h2>
      <p>Move: Push <b>Left</b> and <b>Right</b> arrows <--  --> </p>
      <p>Shoot: Push <b>Spacebar ⎵⎵⎵⎵ </b></p>
      </section>
      <div class='button'>
        <button>Start Game</button>
      </div>
    </main>
 `)

  document.body.appendChild(splashScreen)

  const startButton = splashScreen.querySelector('button')
  startButton.addEventListener('click', function () {
    startGame()
  })
}

// game screen
function createGameScreen () {
  gameScreen = buildDom(`
    <main class="game container">
    <nav><a href="index.html"><img src="img/img/iconMask.png" alt="logo"></a></nav>
    <audio controls='true' width="150px" height="25" allow=”autoplay” autoplay="autoplay" src="audio/PANG - Barcelona.mp3">If stream does not start automatically press the play button</audio >


    <div class="canvas-container">
      <canvas></canvas>
    </div>
    <footer>
      <div class="lives">
        <span class="label">Lives:</span>
        <span class="value"></span>
      </div>
      <div class="score">
        <span class="label">Score:</span>
        <span class="value"></span>

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

  var restartButton = gameOverScreen.querySelector('button')
  restartButton.addEventListener('click', startGame)

  document.body.appendChild(gameOverScreen)
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

// Run the function   `createSplashScreen` once all the resources are loaded
window.addEventListener('load', createSplashScreen)
