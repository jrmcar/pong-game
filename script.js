var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var startBtn = document.getElementById('startBtn')
var restartBtn = document.getElementById('restartBtn')

startBtn.onclick = function(){
    startBtn.style.display = "none"

    paddle1 = new Paddle(10)
    paddle2 = new Paddle(970)

    ball = new Ball()

    window.requestAnimationFrame(draw)
}

function Paddle(x){
    this.color = "tomato"
    this.x = x
    this.y = canvas.height / 2
    this.width = 20
    this.height = 120
    this.up = false
    this.down = false
}

function Ball(){
    this.color = "green"
    this.x = canvas.width / 2
    this.y = canvas.height / 2
    this.ballRadius = 10

    //responsible for the speed and direction
    this.dy = 5.5
    this.dx = 5.5
}

Paddle.prototype.drawPaddle = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height)
}

Ball.prototype.drawBall = function(){
    ctx.fillStyle = this.color;
    ctx.beginPath()
    // x, y, radius, 0, radian/pi
    ctx.arc(this.x, this.y, this.ballRadius, 0, toRadians(360))
    ctx.fill()
}

Ball.prototype.checkBorder = function(){
    if(this.y + ball.dy > canvas.height - this.ballRadius ||
       this.y + ball.dy < this.ballRadius){
        this.dy = - this.dy
    }
}

Paddle.prototype.hitPaddleOne = function(){
    if( ball.x < paddle1.x + paddle1.width &&
        ball.x + ball.dx > paddle1.x &&
        ball.y < paddle1.y + paddle1.height &&
        ball.y + ball.dy > paddle1.y){
        ball.dx = - ball.dx
    }
}

Paddle.prototype.hitPaddleTwo = function(){
    if( ball.x > paddle2.x &&
        ball.x + ball.dx > paddle2.x &&
        ball.y < paddle2.y + paddle2.height &&
        ball.y + ball.dy > paddle2.y){
        ball.dx = - ball.dx
    }
}

Ball.prototype.checkLeftAndRight = function(){
    if( ball.x > canvas.width + 2 * ball.ballRadius ||
        ball.x < -2 * ball.ballRadius){
        // return true
        window.location.reload()
    }
}

function toRadians(degrees){
    return degrees * (Math.PI/180)
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if(paddle1.up){
        paddle1.y -= 5
    }
    if(paddle1.down){
        paddle1.y += 5
    }
    if(paddle2.up){
        paddle2.y -= 5
    }
    if(paddle2.down){
        paddle2.y += 5
    }

    //movement of the ball
    ball.x += ball.dx
    ball.y += ball.dy
    ball.checkBorder()
    if(ball.checkLeftAndRight()){
        restartBtn.style.display = "inline"
    }

    paddle1.drawPaddle()
    paddle2.drawPaddle()
    ball.drawBall()
    ball.checkBorder()
    paddle1.hitPaddleOne()
    paddle2.hitPaddleTwo()
    ball.checkLeftAndRight()

    window.requestAnimationFrame(draw)
}

document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 90: // Z
        paddle1.up = true;
        break;
      case 83: // S
        paddle1.down = true;
        break;
      case 38: // ArrowUp
        paddle2.up = true;
        break;
      case 40: // ArrowDown
        paddle2.down = true;
        break;
    }
  });

  document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
        case 90: // Z
          paddle1.up = false;
          break;
        case 83: // S
          paddle1.down = false;
          break;
        case 38: // ArrowUp
          paddle2.up = false;
          break;
      case 40: // ArrowDown
        paddle2.down = false;
        break;
    }
  });

// function keyDownHandler(event){
//     if(event.key === "z"){
//         paddle1.y -= 5
//     }else if(event.key === "s"){
//         paddle1.y += 5
//     }else if(event.key === "ArrowUp"){
//         paddle2.y -= 5
//     }else if(event.key === "ArrowDown"){
//         paddle2.y += 5
//     }
// }

// document.onkeydown = keyDownHandler