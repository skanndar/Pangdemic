'use strict'

// Creating different views and starting and ending the game

let game
let splashScreen // start game screen element
let gameScreen
let gameOverScreen // game over screen element
let rank
let scoreArray
let name = ''

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
  
  <div id="register-name">
    <form>
      <label>Your name:</label>
      <input id="username" type="text" placeholder="My name" value="" />
    </form>
  </div>
  <div class='button'>
    <button id='start'>Start Game</button>
    <button id='ranking'>Ranking</button>
  </div>
  <section>      
  <h2>Controls:</h2>
  <p>Move: Push <b>Left</b> and <b>Right</b> arrows &#9664  --  &#9654 </p>
  <p>Shoot: Push <b>Spacebar &#9644&#9644&#9644&#9644 </b></p>
  </section>
</main> 
 `)

  document.body.appendChild(splashScreen)

  const audioVol = splashScreen.querySelector('audio')
  audioVol.volume = 0.2

  const startButton = splashScreen.querySelector('#start')
  startButton.addEventListener('click', function () {
    name = splashScreen.querySelector('#username').value
    if (name === '') {
      name = 'ANONYMOUS'
    }
    startGame(name)
  })
  const rankingButton = splashScreen.querySelector('#ranking')
  rankingButton.addEventListener('click', function () {
    rankingScreen()
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
  restartButton.addEventListener('click', function () {
    name = 'ANONYMOUS'
    startGame(name)
  }
  )
}

function rankingScreen (name, score) {
  removeScreen()
  if (name && score) {
    safeNameScore(name, score)
  }
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
  <div id="scores">
  <p>Your score: <span></span></p>
  <table id="scoretable">
    <thead>
      <tr>
        <th>Name</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td id="name1"></td>
        <td id="score1"></td>
      </tr>
      <tr>
        <td id="name2"></td>
        <td id="score2"></td>
      </tr>
      <tr>
        <td id="name3"></td>
        <td id="score3"></td>
      </tr>
      <tr>
        <td id="name4"></td>
        <td id="score4"></td>
      </tr>
      <tr>
        <td id="name5"></td>
        <td id="score5"></td>
      </tr>
      <tr>
        <td id="name6"></td>
        <td id="score6"></td>
      </tr>
      <tr>
        <td id="name7"></td>
        <td id="score7"></td>
      </tr>
      <tr>
        <td id="name8"></td>
        <td id="score8"></td>
      </tr>
      <tr>
        <td id="name9"></td>
        <td id="score9"></td>
      </tr>
      <tr>
        <td id="name10"></td>
        <td id="score10"></td>
      </tr>
    </tbody>
  </table>
</div>
  <button>Restart</button>
</main>
  `)

  // convert it back into an array in order to get data from local storage
  const scoreBoard = JSON.parse(localStorage.getItem('scoreArray'))
  scoreBoard.sort(function (a, b) {
    return b.score - a.score
  })
  console.log('SCOREBOARD', scoreBoard)

  // print the best 5 scores into a table
  for (let i = 0; i < 10; i++) {
    const playersName = rank.querySelector('#name' + (i + 1))
    const playerScore = rank.querySelector('#score' + (i + 1))
    if (scoreBoard[i]) {
      playersName.innerHTML = scoreBoard[i].name
      playerScore.innerHTML = scoreBoard[i].score + ' points'
    } else {
      playersName.innerHTML = ''
      playerScore.innerHTML = ''
    }
  }

  // print the score to the screen
  if (score) {
    const span = rank.querySelector('span')
    span.innerText = score + ' points'
  } else {
    const span = rank.querySelector('span')
    span.innerText = 'Play to set a RECORD'
  }

  // append the rank to the DOM
  document.body.appendChild(rank)

  // document.body.appendChild(rank)

  const audioVol = rank.querySelector('audio')
  audioVol.volume = 0.05

  const restartButton = rank.querySelector('button')
  restartButton.addEventListener('click', function () {
    name = 'ANONYMOUS'
    startGame(name)
  })
}

function safeNameScore (name, score) {
  if (localStorage.getItem('scoreArray') === null) {
    scoreArray = []
  } else {
    scoreArray = JSON.parse(localStorage.getItem('scoreArray'))
  }
  console.log('name :', name)
  // store player's name and score into an object that is pushed into the scoreArray
  const newPlayer = {
    name: name.toUpperCase(),
    score: score
  }
  scoreArray.push(newPlayer)

  // stringify the array in order to add it to local storage
  localStorage.setItem('scoreArray', JSON.stringify(scoreArray))
}
// start the game , end the game
function startGame (name) {
  removeScreen()
  createGameScreen()

  game = new Game(name)
  game.gameScreen = gameScreen

  // Start the game
  game.start(3)
}

function endGame (name, score, time) {
  removeScreen()
  createGameOverScreen(score, time)
  safeNameScore(name, score)
}

// Run the function   `createSplashScreen` once all the resources are loaded
window.addEventListener('load', createSplashScreen)

// autoplay="autoplay"
