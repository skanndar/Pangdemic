'use strict'
class Player {
  constructor (canvas, lives) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.lives = lives

    this.size = 100
    this.x = this.canvas.width / 2 - this.size / 2
    this.y = this.canvas.height - this.size
    this.direction = 0 //  0 not moving  // -1 moving up   // 1 moving down
    this.speed = 15

    this.playerLeft = this.y
    this.playerRight = this.y + this.size

    this.screenTop = 0 //  y = 0
    this.screenBottom = this.canvas.height
  }

  setDirection (direction) {
    if (direction === 'left') this.direction = -1
    else if (direction === 'right') this.direction = 1
  }

  handleScreenCollision () {
    const { playerRight, screenBottom, playerLeft, screenTop } = this

    // If the player touched the bottom

    if (playerRight >= screenBottom) {
      this.setDirection('left')
    } else if (playerLeft <= screenTop) {
      this.setDirection('right')
    }
  }

  updatePosition () {
    // update the player position
    this.x = this.x + this.direction * this.speed

    this.playerLeft = this.x
    this.playerRight = this.x + this.size

    this.screenTop = 0 //  y = 0
    this.screenBottom = this.canvas.width
  }

  removeLife () {
    this.lives -= 1
  }

  draw () {
    this.ctx.fillStyle = 'magenta'
    // ctx.fillRect(x, y, width, height)

    this.ctx.fillRect(this.x, this.y, this.size, this.size)
  }

  didCollide (enemy) {
    // true or false if player hit an enemy
    const playerLeft = this.x
    const playerRight = this.x + this.size
    const playerTop = this.y
    const playerBottom = this.y + this.size

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
      false
    }
  }
}
