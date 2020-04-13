'use strict'

class Game {
  constructor () {
    this.player = null
    this.viruses = []
    this.gameIsOver = false
    this.score = 0
    this.gameScreen = null
    this.canvas = null
    this.ctx = null
    this.lives = 10
    this.bullet = []
  }

  start (lives) { // instantiate the player, set the canvas ,and start the canvas loop
    // Save reference to canvas and container, create ctx
    const canvasContainer = document.querySelector('.canvas-container')
    this.canvas = this.gameScreen.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    // Save the reference to lives and score elements
    this.livesElement = this.gameScreen.querySelector('.lives .value')
    this.scoreElement = this.gameScreen.querySelector('.score .value')

    // Set the canvas dimenisons
    this.containerWidth = canvasContainer.clientWidth
    this.containerHeight = canvasContainer.clientHeight

    this.canvas.width = this.containerWidth
    this.canvas.height = this.containerHeight

    // instantiate Player and Viruses
    this.player = new Player(this.canvas, lives)
    this.virus = new Virus(this.canvas)

    // Event listener for moving the player
    function handleKeyDown (event) {
      if (event.key === 'ArrowLeft') {
        this.player.setDirection('left')
      } else if (event.key === 'ArrowRight') {
        this.player.setDirection('right')
      } else if (event.key === ' ') {
        // console.log('object :', this.weapon.shoot)

        this.bullet[0].shoot = true
      }
    }
    function handleKeyUp (event) {
      if (event.key === 'ArrowLeft') {
        this.player.setDirection('stop')
      } else if (event.key === 'ArrowRight') {
        this.player.setDirection('stop')
      // } else if (event.key === ' ') {
      //   console.log('object :', this.weapon.shoot)
      //   this.weapon.shoot = false
      }
    }

    const boundHandleKeyDown = handleKeyDown.bind(this)
    document.addEventListener('keydown', boundHandleKeyDown)

    const boundHandleKeyUp = handleKeyUp.bind(this)
    document.addEventListener('keyup', boundHandleKeyUp)

    // Start the canvas requestAnimationFrame loop
    this.startLoop()
  }

  startLoop () {
    const loop = function () {
      // 1. UPDATE THE STATE OF PLAYER, VIRUSES AND BULLETS
      // 1.2. Check if player had hit any Virus
      this.checkCollisons()

      // 1.3. Update the player positon
      this.player.handleScreenCollision()
      this.player.updatePosition()

      // const enemiesOnScreen = this.viruses.filter(function (virus) {
      this.virus.updatePosition()
      const newbullet = new Weapon(this.canvas, this.player)
      if (this.bullet.length < 1) {
        this.bullet.push(newbullet)
      }

      const bulletsOnScreen = this.bullet.filter(function (bullet) {
        bullet.updatePosition()
        const isInsideScreen = bullet.isInsideScreen()
        return isInsideScreen // true or false
      })
      this.bullet = bulletsOnScreen

      // const isInsideScreen = virus.isInsideScreen()

      // return isInsideScreen // true false

      // this.viruses = enemiesOnScreen

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // 3. PAINT THE CANVAS
      // 3.1 Draw player
      this.player.draw()

      // 3.2 Draw all enemies
      this.virus.draw()
      this.bullet.forEach(bullet => {
        bullet.draw()
        bullet.handleScreenCollision()
      })

      // 3.3 Draw bullets
      // if (this.weapon.isInsideScreen) {
      //   this.bullet.forEach(bullet => bullet.draw())
      // } else {
      //   this.bullet.shoot = false
      //   this.bullet.pop()
      // }

      // 4. TERMINATE LOOP IF GAME IS OVER
      if (this.gameIsOver === false) {
        requestAnimationFrame(loop) // animation loop
      }

      // 5. UPDATE GAME STATS
      this.updateGameStats()
    }.bind(this)

    loop() // initial invocation
  }

  checkCollisons () {
    if (this.player.didCollide(this.virus)) {
      console.log('Player lives', this.player.lives)
      this.player.removeLife()

      if (this.player.lives <= 0) {
        this.gameOver()
      } else {
        // restart the game positions with the new live count
        this.restartPositions()
      }
    }
    this.bullet.forEach(bullet => {
      if (bullet.didCollide(this.virus)) {
        console.log('virus must divide')
      }
    })
  }

  gameOver () {
    this.gameIsOver = true
    endGame(this.score)
  }

  updateGameStats () {
    this.score++
    this.livesElement.innerHTML = this.player.lives
    this.scoreElement.innerHTML = this.score
  }

  restartPositions () {
    this.player.startPosition()
    this.virus.startPosition()
  }
}
