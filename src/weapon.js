'use strict'

class Weapon {
  constructor (canvas, player) {
    this.didCollideBound = Player.prototype.didCollide.bind(this)

    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    // image properties
    this.totalSpriteWidth = 390
    this.totalSpriteHeight = 512
    this.spriteHeight = Number((this.totalSpriteHeight / 12).toFixed(2))
    this.spriteWidth = Number((this.totalSpriteWidth / 9).toFixed(2))
    this.sizeY = this.spriteHeight / 2
    this.sizeX = this.spriteWidth / 2
    this.sourceWidth = 0
    this.sourceHeight = 0
    this.currentFrame = 0
    this.frames = 106
    this.columns = 9
    this.framesCounter = 0

    this.x = (player.x + player.sizeX / 2) - this.sizeX / 2
    this.y = canvas.height - player.sizeY / 2

    this.speed = -20
    this.shoot = false

    this.bulletTop = this.y
    this.bulletBottom = this.y + this.sizeY

    this.screenTop = 0 //  y = 0
    this.screenBottom = this.canvas.height
    this.weapon = new Image(); this.weapon.src = 'img/img/mixWeapons.png' // 390 x 512 (9x12) last two positions are blank
  }

  shooting () {
    this.sourceWidth = 42 // Math.floor(this.currentFrame % this.columns) * this.spriteWidth
    this.sourceHeight = 43 // Math.floor(Math.random() * 12) * this.spriteHeight
    this.currentFrame = (this.currentFrame + 1) % this.frames
  }

  draw () {
    // if (this.shoot === true) {
    this.shooting()
    //   console.log(this.x, this.y, this.sizeX, this.sizeY)
    //   // this.ctx.fillStyle = 'red'
    // this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY)

    this.ctx.drawImage(
      this.weapon, // image source
      this.sourceWidth, this.sourceHeight, this.spriteWidth, this.spriteHeight, // source coordinates
      this.x, this.y, this.sizeX, this.sizeY // destination coordinates
    )
    // }
  }

  updatePosition () {
    // update the bullet position
    // if (this.shoot === true) {
    this.y = this.y + this.speed

    this.bulletTop = this.y
    this.bulletBottom = this.y + this.sizeY
    // }
  }

  didCollide (virus) { // How can I bind this function? It exists in player.js
    // true or false if player hit an virus
    const bulletLeft = this.x
    const bulletRight = this.x + this.sizeX
    const bulletTop = this.y
    const bulletBottom = this.y + this.sizeY

    const virusLeft = virus.x
    const virusRight = virus.x + virus.size
    const virusTop = virus.y
    const virusBottom = virus.y + virus.size

    const crossLeft = virusLeft <= bulletRight && virusLeft >= bulletLeft
    const crossRight = virusRight >= bulletLeft && virusRight <= bulletRight
    const crossTop = virusTop <= bulletBottom && virusTop >= bulletTop
    const crossBottom = virusBottom >= bulletTop && virusBottom <= bulletBottom

    if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
      return true
    } else {
      return false
    }
  }

  isInsideScreen () {
    return this.y > 0
  }
}
