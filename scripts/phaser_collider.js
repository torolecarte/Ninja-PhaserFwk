var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#fffa7d",
  parent: "colisao",
  physics: {
    default: "arcade",
    gravity: { y: 100 }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var bola1, bola2, barreira1, barreira2;
var camera;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("futebol", "assets/objetos/futebol.png");
  this.load.image("baskteball", "assets/objetos/basketball.png");
  this.load.image("tijolo", "assets/objetos/tijolo.png");
}

function create() {
  bola1 = this.add.image(100, 100, "futebol");
  bola2 = this.add.image(400, 100, "baskteball");
  barreira1 = this.add.image(150, 200, "tijolo");
  barreira2 = this.add.image(350, 200, "tijolo");

  this.physics.world.enable([bola1, bola2, barreira1, barreira2]);
  camera = this.cameras.main;
  
  barreira1.body.setAllowGravity(false);
  barreira1.body.setImmovable(true);
  barreira2.body.setAllowGravity(false);
  barreira2.body.setImmovable(true);

  bola1.body.setVelocity(550, 500).setBounce(1, 1).setCollideWorldBounds(true);
  bola2.body.setVelocity(550, 500).setBounce(1, 1).setCollideWorldBounds(true);
}

function update() {
  this.physics.world.collide(bola1, bola2);
  this.physics.world.collide([bola1, bola2], [barreira1, barreira2], function () {
    var color = generateRandomColor();
    console.log(`${color}`);
    camera.setBackgroundColor(color);
  });
}


function generateRandomColor() {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}