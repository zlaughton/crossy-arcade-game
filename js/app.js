class Character {
  constructor() {
    this.sprite = 'images/';
    this.x = 0;
    this.y = 0;
  }

  update(dt){
    this.isOutOfBoundsUp = this.y < -1;
    this.isOutOfBoundsRight = this.x > 5;
    this.isOutOfBoundsDown = this.y > 5;
    this.isOutOfBoundsLeft = this.x < -1;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y * 83) - 10);
  }
}

class Player extends Character {
  constructor() {
    super();
    this.sprite += 'char-cat-girl.png';
    this.x = 2;
    this.y = 5;
  }

  update(dt){
    super.update();
  }

  handleInput(input) {
    switch (input) {
      case 'up':
        if (this.y > 0) { this.y = this.y - 1 }
        break;
      case 'right':
        if (this.x < 4) { this.x = this.x + 1 }
        break;
      case 'down':
        if (this.y < 5) { this.y = this.y + 1 }
        break;
      case 'left':
        if (this.x > 0) { this.x = this.x - 1 }
        break;
    }
  }

  checkCollisions() {
    allEnemies.forEach(function(enemy) {
      if (enemy.y === player.y) {
        if (enemy.x - 0.5 < player.x && enemy.x + 0.5 > player.x ) {
          player.reset();
        }
      }
    })
  }

  reset() {
    this.x = 2;
    this.y = 5;
  }
}

class Bug extends Character {
  constructor(x, y, direction) {
    super();
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.sprite += `enemy-bug-${this.direction}.png`;
    this.startingX = this.direction === 'right' ? -1 : 5;
    this.speed = (Math.random() * 2 + 1);
  }

  update(dt){
    super.update();
    if (this.isOutOfBoundsRight || this.isOutOfBoundsLeft) {
      this.reset()
    } else {
      this.x += (dt * this.speed);
    }
  }

  reset(){
    let newSpeed = (Math.random() * 2 + 1);
    if (this.direction === 'left') { newSpeed *= -1}
    this.speed = newSpeed;
    this.x = this.startingX;
  }
}

const player = new Player();
const allEnemies = [new Bug(0, 1, 'right'), new Bug(5, 2, 'left'), new Bug(0, 3, 'right')]

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
