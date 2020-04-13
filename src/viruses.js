'use strict'

class Virus {
// class Enemy {
  constructor (canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')

    this.size = 50
    this.y = 100
    this.x = this.canvas.width / 2 - this.size / 2

    this.bounce = 0.93
    this.xSpeed = 9
    this.ySpeed = 3
    this.gravity = 3
  }

  draw () {
    this.ctx.fillStyle = 'red'
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false)
    this.ctx.fill()
    this.ctx.lineWidth = 5
    this.ctx.strokeStyle = '#003300'
    this.ctx.closePath()
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
    // Ball hits the top or floor
    if (this.y + this.size > this.canvas.height) {
      // Re-positioning on the base
      this.y = this.canvas.height - this.size
      // bounce the ball
      this.ySpeed *= -this.bounce
      // //do this otherwise, ball never stops bouncing
      //   if(this.ySpeed<0 && this.ySpeed>-2.1)
      //              this.ySpeed=0;
      // //do this otherwise ball never stops on xaxis
      //  if(Math.abs(this.xSpeed)<1.1)
      //      this.xSpeed=0;

      //  xF();
    } else if (this.y < 50) {
      this.y = 50
      this.ySpeed *= -this.bounce/3
    }
  }

  // isInsideScreen () {
  //   const playerRight = this.y + this.size
  //   return playerRight > 0
  // }

  // isOutsideScreen () {
  //   const playerRight = this.y + this.size
  //   return playerRight < 0
  // }

  startPosition () {
    this.y = 100
    this.x = this.canvas.width / 2 - this.size / 2
    this.draw()
  }
}
