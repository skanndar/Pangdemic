'use strict'

class Virus {
// class Enemy {
  constructor (canvas, size, direction, strength = 0) {
    let xSpeed
    if (direction === 'left') {
      xSpeed = -4
    } else {
      xSpeed = 4
    }
    this.strength = strength

    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.size = size
    this.y = 100
    this.x = this.canvas.width / 2 - this.size / 2

    this.bounce = 0.96
    this.xSpeed = xSpeed
    this.ySpeed = 0.1
    this.gravity = 0.1
    this.img1 = new Image(); this.img1.src = 'img/img/Infected.png'
  }

  draw () {
    // this.ctx.fillStyle = 'red'
    // this.ctx.fillRect(this.x, this.y, this.size, this.size)
    this.ctx.drawImage(this.img1, this.x, this.y, this.size, this.size)
  }

  updatePosition () {
    // both axis

    this.x += this.xSpeed
    this.y += this.ySpeed
    this.ySpeed += this.gravity

    // If either wall is hit, change direction on x axis
    if (this.x + this.size > this.canvas.width || this.x - this.size < 0) {
      this.xSpeed *= -1
    }
    // Ball hits the top or bottom
    if (this.y + this.size > this.canvas.height) {
      // Re-positioning on the base
      this.y = this.canvas.height - this.size
      // bounce the ball
      this.ySpeed *= -this.bounce
    } else if (this.y <= this.size) {
      this.y = this.size
      this.ySpeed *= +this.bounce // '+' makes magnetic ceiling, '-' makes higher acceleration
    }
  }

  startPosition () {
    this.y = 500
    this.x = 200
    // this.draw()
  }
}
