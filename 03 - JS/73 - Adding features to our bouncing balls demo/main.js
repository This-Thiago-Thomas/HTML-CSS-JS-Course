const para = document.querySelector('p');
let count = 0;

// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Shape(x, y, velX, velY, exists) {
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);

  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
	//Verificar sobre a largura da tela
	if ((this.x + this.size) >= width) {
		this.velX = -(this.velX);
	}

	if ((this.x - this.size) <= 0) {
		this.velX = -(this.velX);
	}

	//Verificar sobre a altura da tela
	if ((this.y + this.size) >= height) {
		this.velY = -(this.velY);
	}

	if ((this.y - this.size) <= 0) {
		this.velY = -(this.velY);
	}

	this.x += this.velX;
	this.y += this.velY;

}

Ball.prototype.collisionDetect = function (){
	for (let j = 0; j < balls.length; j++) {
		if (!(this === balls[j])) {
			const dx = this.x - balls[j].x;
			const dy = this.y - balls[j].y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if(distance < this.size + balls[j].size) {
				balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')'; 
			}
		}
	}
}

function EvilCircle(x, y, exists) {
	Shape.call(this, x, y, 20, 20, exists);

	this.color = 'white';
	this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;


EvilCircle.prototype.draw = function() {
	ctx.beginPath();
	ctx.strokeStyle = this.color;
	ctx.lineWidth = 3;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.stroke();
};

EvilCircle.prototype.checkBounds = function() {
	if ((this.x + this.size) >= width) {
		this.x -= this.size;
	}

	if ((this.x - this.size) <= 0) {
		this.x += this.size;
	}

	if ((this.y + this.size) >= height) {
		this.y -= this.size;
	}

	if ((this.y - this.size) <= 0) {
		this.y += this.size;
	}
};

EvilCircle.prototype.setControls = function() {
	var _this = this;
	window.onkeydown = function(e) {
		if(e.key === 'a') {
			_this.x -= _this.velX;
		} else if(e.key === 'd') {
			_this.x += _this.velX;
		} else if(e.key === 'w') {
			_this.y -= _this.velY;
		} else if(e.key === 's') {
			_this.y += _this.velY;
		}
	}
}

EvilCircle.prototype.collisionDetect = function() {
	for (let j = 0; j < balls.length; j++) {
		if (balls[j].exists) {
			let dx = this.x - balls[j].x;
			let dy = this.y - balls[j].y;
			let distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < this.size + balls[j].size) {
				balls[j].exists = false;
				count--;
				para.textContent = 'Ball count: ' + count;
			}
		}
		
	}
}

let balls = [];

while (balls.length < 5) {
	let size = random(10, 20);
	let ball = new Ball(
		//posição da bola sempre desenhada com pelo menos uma largura da bola
		//longe da borda da tela, para evitar erros de desenho
		random(0 + size, width - size),
		random(0 + size, height - size),
		random(-7, 7),
		random(-7, 7),
		'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')',
		size 
	);
	balls.push(ball);
	count++;
	para.textContent = 'Ball count: ' +count;
}

let evil = new EvilCircle(random(0,width), random(0,height));
evil.setControls();

function loop() {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
	ctx.fillRect(0, 0, width, height);

	for (let i = 0; i < balls.length; i++) {
		if(balls[i].exists) {
			balls[i].draw();
			balls[i].update();
			balls[i].collisionDetect();
		}
	}
	evil.draw();
	evil.checkBounds();
	evil.collisionDetect();

	requestAnimationFrame(loop);
}

loop();