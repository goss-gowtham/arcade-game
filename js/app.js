// Enemies our player must avoid
class Enemy
{ //modified from ES5 to ES6
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor(x, y, speed)
  {
    this.x = x;
    this.y = y + 60;
    this.width = 101;
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt)
  { //modified function to ES6
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < this.width * 5)
    {
      this.x += dt * this.speed;
    }
    else
    {
      this.x = 0;
    }
  }
  // Draw the enemy on the screen, required method for game
  render()
  { //modified from ES5 ClassName.prototype.methodName function to ES6 class method
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
} //End of class
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Hero
{
  constructor()
  {
    this.width = 101; //got from for loop of drawImage()
    this.height = 83; //width - left/right, height - up/down moves
    this.sprite = 'images/char-boy.png';
    this.startX = this.width * 2;
    this.startY = (this.height * 4) + 60;
    this.x = this.startX;
    this.y = this.startY;
  }
  update()
  {
    for (let enemy of allEnemies)
    { //Found this upon discussion with GIS slack community
      if (this.y == enemy.y && (enemy.x + this.width / 3 > this.x && enemy.x <
          this.x + this.width / 3))
      {
        alert("Oh God! You killed the bug");
        this.x = this.startX;
        this.y = this.startY;
      }
    }
    if (this.y < 0)
    {
      setTimeout(() =>
      { //timeout function is used from ES6 specs
        this.x = this.startX;
        this.y = this.startY;
        alert("You win! All bugs are safe now");
      }, 5); //set very 5ms to enable user to play again faster
    }
  }
  render()
  {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(input)
  {
    if (input == 'left' && this.x > 0)
    {
      this.x -= this.width; //moves player from one box to other box left with width measure
    }
    else if (input == 'right' && this.x < this.width * 4)
    {
      this.x += this.width; //moves to right
    }
    else if (input == 'up' && this.y > 0)
    {
      this.y -= this.height; //moves to up
    }
    else if (input == 'down' && this.y < this.height * 4)
    {
      this.y += this.height; //moves to down
    }
  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Hero(); //instantiating Hero object
random = Math.floor(Math.random() * 300)
const bug = new Enemy(-101, 0, 90 + Math.floor(Math.random() * 300));
const bug1 = new Enemy(-201, 0, 90 + Math.floor(Math.random() * 300));
const bug2 = new Enemy(-81, 83, 110 + random);
const bug3 = new Enemy(201, 83, 110 + random);
const allEnemies = []; //allEnemies defined
allEnemies.push(bug, bug1, bug2, bug3); //adding bugs to arrays by push()
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e)
{
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
