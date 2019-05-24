var cnv, alive=true;

// Enemies our player must avoid
var Enemy = function(x,y,s,n) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
    this.name = n;
    this.startPos = -125;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (alive){this.x += this.speed*dt}

    // Dectect if sprite is off canvas
    if(this.x>505){
      this.x = this.startPos;
    }

    // Stagger y Positions
    if (this === allEnemies[0]){
      this.speed = Math.floor(Math.random() * (500 - 5) )+100;
    }
    if (this === allEnemies[1]){
      this.speed = Math.floor(Math.random() * (450 - 50) )+100;
    }
    if (this === allEnemies[2]){
      this.speed = Math.floor(Math.random() * (350 - 25) )+25;
    }
    if (this === allEnemies[3]){
      this.speed = Math.floor(Math.random() * (250 - 5) )+5;
    }

    //Collision Detect
    let xDistance = player.x - this.x;
    let yDistance = player.y - this.y;
    if ( CollisionDetect(xDistance,yDistance) <= player.width/2 ){
      ResetPlayer();
    };
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const playerIMG = new Image();
      playerIMG.src = 'images/char-boy.png';
      playerIMG.setAttribute('id','PLYR');

var Player = function(x, y){
  this.sprite = playerIMG;
  this.x = x;
  this.y = y;
  this.width = 101;
  this.height = 171;
};
Player.prototype.update = function(dt) {
};
Player.prototype.render = function() {
    ctx.drawImage(playerIMG, this.x, this.y, this.width, this.height);
};
Player.prototype.handleInput = function(whichkey) {
    if (alive){
      if (whichkey==='up' && this.y >= 0){ this.y += -80; }
      if (whichkey==='down' && this.y < cnv.offsetHeight-Math.floor(this.height*1.5)){ this.y += 80; }
      if (whichkey==='left' && this.x >= 25){ this.x += -100; }
      if (whichkey==='right' && this.x < cnv.offsetWidth-Math.floor(this.width*1.5)){ this.x += 100; }
    }
    // Win Detection
    if (this.y<0){
      let winDelay = setTimeout(function(){ alive = false; alert('You won the game!'); ResetPlayer(); },500);
      setTimeout(windDelay);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200,380);

const enemyStart = [60,145,225,310];
enemyStart.forEach(function(yStart){
  let en = new Enemy(-125, yStart, 100, 'enm'+yStart);
  allEnemies.push(en);
});

// LOAD ENGINE
const enginescript = document.createElement('script');
enginescript.onload = function () {
  if(document.querySelector('canvas')!=null){
    cnv = document.querySelector('canvas');
  }
};
enginescript.src = 'js/engine.js';
document.body.appendChild(enginescript);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Detect collision with any enemy
function CollisionDetect(xd,yd){
  return Math.sqrt(Math.pow(xd,2) + Math.pow(yd,2));
}

// Reset after Win or Death
function ResetPlayer(){
  // Enemy delay
  allEnemies.forEach(function(i){ dt=0; });
  alive = false;
  let deadDelay = setTimeout(function(){ player.x=200; player.y=380; alive = true; },500);
  setTimeout(deadDelay);
}
