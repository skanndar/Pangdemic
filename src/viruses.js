'use strict'

class Virus {
// class Enemy {
  constructor (canvas, size, direction, strength = 0, initialX) {
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
    this.x = initialX

    this.bounce = 0.97
    this.xSpeed = xSpeed
    this.ySpeed = 0.1
    this.gravity = 0.1
    this.img1 = new Image(); this.img1.src = 'img/img/Yellow_Virus.png'
    this.wallbounce = new Audio('audio/509073__tripjazz__old-school-boing.wav')
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
    if (this.x + this.size > this.canvas.width || this.x < 0) {
      this.wallbounce.currentTime = 0
      this.wallbounce.volume = 0.2
      this.wallbounce.play()
      this.xSpeed *= -1
    }
    // Ball hits the top or bottom
    if (this.y + this.size > this.canvas.height) {
      // Re-positioning on the base
      this.wallbounce.currentTime = 0
      this.wallbounce.volume = 0.2
      this.wallbounce.play()
      this.y = this.canvas.height - this.size
      // bounce the ball
      this.ySpeed *= -this.bounce
    } else if (this.y + this.size <= this.size) {
      this.wallbounce.currentTime = 0
      this.wallbounce.volume = 0.2
      this.wallbounce.play()
      this.y = this.size
      this.ySpeed *= -this.bounce // '+' makes magnetic ceiling, '-' makes higher acceleration
    }
  }

  startPosition () {
    this.y = 100
    this.x = 200
    // this.draw()
  }
}
