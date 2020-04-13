'use strict'
class Player {
  constructor (canvas, lives) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.lives = lives

    this.sizeX = 32 * 1.5
    this.sizeY = 64 * 1.5
    this.spriteWidth = 32
    this.spriteHeight = 64
    this.sourceWidth = 0
    this.sourceHeight = 0
    this.currentFrame = 0
    this.totalSpriteWidth = 128
    this.totalSpriteHeight = 256
    this.frames = 4
    this.columns = 4
    this.framesCounter = 0

    this.x = this.canvas.width / 2 - this.sizeX / 2
    this.y = this.canvas.height - this.sizeY
    this.direction = 0 //  0 not moving  // -1 moving left   // 1 moving right
    this.speed = 15

    this.playerLeft = this.x
    this.playerRight = this.x + this.sizeX

    this.screenLeft = 0 //  y = 0
    this.screenRigth = this.canvas.width
    this.character = new Image(); this.character.src = 'img/img/Sally.png' // 128 x 256 (4x4)
  }

  moveLeft () {
    this.sourceWidth = Math.floor(this.currentFrame % this.columns) * this.spriteWidth
    this.sourceHeight = 0
    this.currentFrame = (this.currentFrame + 1) % this.frames
  }

  moveRight () {
    this.sourceWidth = Math.floor(this.currentFrame % this.columns) * this.spriteWidth
    this.sourceHeight = 128
    this.currentFrame = (this.currentFrame + 1) % this.frames
  }

  iddle () {
    this.sourceWidth = Math.floor(this.currentFrame % this.columns) * this.spriteWidth
    this.sourceHeight = 64
    this.currentFrame = (this.currentFrame + 1) % this.frames
  }

  draw () {
    this.framesCounter++
    if (this.framesCounter % 3 === 0) {
      if (this.direction === -1) {
        this.moveLeft()
      } else if (this.direction === 0) {
        this.iddle()
      } else {
        this.moveRight()
      }
    }
    this.ctx.drawImage(
      this.character, // image source
      this.sourceWidth, this.sourceHeight, this.spriteWidth, this.spriteHeight, // source coordinates
      this.x, this.y, this.sizeX, this.sizeY // destination coordinates
    )
  }

  setDirection (direction) {
    if (direction === 'left') this.direction = -1
    else if (direction === 'right') this.direction = 1
    else { this.direction = 0 }
  }

  handleScreenCollision () {
    const { playerRight, screenRigth, playerLeft, screenLeft } = this // If the player touched the wall

    if (playerRight >= screenRigth) {
      this.setDirection('left')
    } else if (playerLeft <= screenLeft) {
      this.setDirection('right')
    }
  }

  updatePosition () { // update the player position
    this.x = this.x + this.direction * this.speed
    this.playerLeft = this.x
    this.playerRight = this.x + this.sizeX
  }

  removeLife () {
    this.lives -= 1 // game.liveTaken = false
  }

  didCollide (enemy) { // true or false if player hit an enemy -- ARE THE PLAYER LEFT AND RIGHT NEEDED HERE? THEY EXIST ON THE TOP
    const playerLeft = this.x
    const playerRight = this.x + this.sizeX
    const playerTop = this.y
    const playerBottom = this.y + this.sizeY

    const enemyLeft = enemy.x
    const enemyRight = enemy.x + enemy.size
    const enemyTop = enemy.y
    const enemyBottom = enemy.y + enemy.size

    const crossLeft = enemyLeft <= playerRight && enemyLeft >= playerLeft
    const crossRight = enemyRight >= playerLeft && enemyRight <= playerRight
    const crossTop = enemyTop <= playerBottom && enemyTop >= playerTop
    const crossBottom = enemyBottom >= playerTop && enemyBottom <= playerBottom

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true
    } else {
      return false
    }
  }

  startPosition () {
    this.x = this.canvas.width / 2 - this.sizeX / 2
    this.y = this.canvas.height - this.sizeY
  }
}
