var canvas = document.getElementById('Canvas')
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height-300;
var dx = -1*(Math.random(2,4));
var dy = -5;
var bx = 0;
var tapX = 0;
var hit =0;
var ballRadius = 50;
var paddleHeight = 10;
var paddleWidth = 200;
var paddleX = (canvas.width-paddleWidth)/2;

function drawBall1(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();
}
function drawPaddle(){
	ctx.beginPath();
	ctx.rect(tapX-(paddleWidth/2), canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();
}
function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawPaddle();
	drawBall1();
	if(x+dx<ballRadius || x+dx >canvas.width-ballRadius){
		dx=-dx;
	}
	if (y+dy<ballRadius){
		dy=-dy;
	}
    else if(y+dy >canvas.height-ballRadius){
		if (x>tapX-(paddleWidth/2) && x<tapX-(paddleWidth/2)+paddleWidth){
			dy = -dy*1.1;
			hit += 1;
		}
		else {
	        document.location.reload();
	        clearInterval(interval);
	        alert("デデドン！(失格)");
	    }
	}
	tapX = bx+paddleX;
	x += dx;
	y += dy;
}
function touchHandler(e){
    if (e.touches) {
        bx = e.touches[0].clientX-paddleX;
    } else if (e.changedTouches[0]) {
        bx = e.changedTouches[0].clientX-paddleX;
    } else if (event.clientX) {
        bx = event.clientX-paddleX;
    }
}
document.addEventListener("touchstart", touchHandler, false);
document.addEventListener("touchmove", touchHandler, false);
document.addEventListener("touchend", touchHandler, false);
var interval = setInterval(draw, 10);
