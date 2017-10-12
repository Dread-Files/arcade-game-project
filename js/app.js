// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.reset();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug-GIMP.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed;
    this.y = 75 * this.row;
    if (this.x > 500) {
      this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
  this.x = -100;
  this.y = 30 * this.row;
  this.row = Math.floor((Math.random() * 3) + 2);
  this.speed = Math.floor((Math.random() * 4) + 3);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
  this.sprite = "images/char-boy-GIMP.png";
  this.x = 218;
  this.y = 470;
};

Player.prototype.update = function(dt) {
  this.checkCollisions();
  var wins = 0;
  if(this.y == 55) {
    this.reset();
    wins++;
    console.log("wins " + wins);
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
  this.x = 218;
  this.y = 470;
  this.moveable = true;
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case "right":
      this.x = this.x + 101;
      break;
    case "left":
      this.x = this.x - 101;
      break;
    case "up":
      this.y = this.y - 83;
      break;
    case "down":
      this.y = this.y + 83;
      break;
  }
  if (this.x < 16) this.x = 16;
  if (this.x > 420) this.x = 420;
  if (this.y < 55) this.y = 55;
  if (this.y > 470) this.y = 470;
};

Player.prototype.checkCollisions = function() {
  for (i = 0; i < 4 ; i++) {
    if (allEnemies[i].x < this.x + 50 && allEnemies[i].x + 50 > this.x &&
        allEnemies[i].y < this.y + 55 && 55 + allEnemies[i].y > this.y) {
          console.log("Collision");
        this.reset();
      }
  }
};
// Now instantiate your objects.
var enemyA = new Enemy();
var enemyB = new Enemy();
var enemyC = new Enemy();
var enemyD = new Enemy();
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [enemyA, enemyB, enemyC, enemyD];

var player = new Player();

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
