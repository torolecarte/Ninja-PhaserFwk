var config = {
  type: Phaser.AUTO,
  width: 400,
  height: 400,
  backgroundColor: "#fffa7d",
  physics: {
    default: "arcade"
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var setas;
var spaceBar;
var personagem;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("alien", "assets/player/p1_stand.png");
}

function create() {
  spaceBar = this.input.keyboard.addKey("SPACE");
  setas = this.input.keyboard.createCursorKeys();
  personagem = this.physics.add.sprite(72, 92, "alien");
}

function update() {
  personagem.setVelocity(0);

  if (setas.left.isDown) {
    personagem.setVelocityX(-300);
  } else if (setas.right.isDown) {
    personagem.setVelocityX(300);
  }

  if (setas.up.isDown) {
    personagem.setVelocityY(-300);
  } else if (setas.down.isDown) {
    personagem.setVelocityY(300);
  }

  if (spaceBar.isDown) {
    personagem.setAngularVelocity(300);
  }
}