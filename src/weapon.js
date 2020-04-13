'use strict'

class Weapon {
  constructor (canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    //image properties
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
    this.weapon = new Image(); this.character.src = '../img/img/Sally.png' // 128 x 256 (4x4)
  }
}


