'use strict'

class Game {
  constructor () {
    this.player = null
    this.virusSizes = [100, 50]
    this.gameIsOver = false
    this.score = 0
    this.gameScreen = null
    this.canvas = null
    this.ctx = null
    this.lives = 10
    this.bullets = []
    this.shoot = false
    this.virus = []
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
    this.newVirus = new Virus(this.canvas, this.virusSizes[0])
    if (this.virus.length < 1) {
      this.virus.push(this.newVirus)
    }

    // Event listener for moving the player
    function handleKeyDown (event) {
      if (event.key === 'ArrowLeft') {
        this.player.setDirection('left')
      } else if (event.key === 'ArrowRight') {
        this.player.setDirection('right')
      } else if (event.key === ' ') {
        // console.log('object :', this.weapon.shoot)
        this.shoot = true
      }
    }
    function handleKeyUp (event) {
      if (event.key === 'ArrowLeft') {
        this.player.setDirection('stop')
      } else if (event.key === 'ArrowRight') {
        this.player.setDirection('stop')
      } else if (event.key === ' ') {
        // this.shoot = false
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
      this.virus.forEach(v => v.updatePosition())

      if (this.shoot) {
        this.shoot = false

        const newbullet = new Weapon(this.canvas, this.player)

        if (this.bullets.length < 1) {
          this.bullets.push(newbullet)
        }
      }

      const bulletsOnScreen = this.bullets.filter(function (bullet) {
        bullet.updatePosition()
        const isInsideScreen = bullet.isInsideScreen()
        return isInsideScreen // true or false
      })
      this.bullets = bulletsOnScreen

      // const isInsideScreen = virus.isInsideScreen()

      // return isInsideScreen // true false

      // this.viruses = enemiesOnScreen

      // 2. CLEAR THE CANVAS
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // 3. PAINT THE CANVAS
      // 3.1 Draw player
      this.bullets.forEach(bullet => {
        bullet.draw()
      })
      this.player.draw()

      // 3.2 Draw all enemies
      this.virus.forEach(v => v.draw())

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
    this.virus.forEach(v => {
      if (this.player.didCollide(v)) {
        console.log('Player lives', this.player.lives)
        this.player.removeLife()

        if (this.player.lives <= 0) {
          this.gameOver()
        } else {
          // restart the game positions with the new live count
          this.restartPositions()
        }
      }
      this.bullets.forEach(bullet => {
        if (bullet.didCollide(v)) {
          console.log('virus must divide')
          bullet.y = -111
          this.virus.shift()
          let virusLeft = new Virus(this.canvas, this.virusSizes[1], 'left')
          let virusRight = new Virus(this.canvas, this.virusSizes[1], 'right')

         this.virus.push(virusLeft,virusRight)
          //this.virus.push(this.newVirus)
          //this.virus.push(this.newVirus)
          
        }
      })
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

    this.virus.forEach(v => v.startPosition()) // THIS MUST BE AMMENDED
  }

  divideVirus () {

  }
}
