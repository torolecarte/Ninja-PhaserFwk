var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var player;
var coins;
var platforms;
var cursors;
var spaceBar;
var score = 0;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "assets/objetos/sky2.png");
  this.load.image("ground", "assets/objetos/plataforma.png");
  this.load.image("coin", "assets/objetos/coinGold.png");
  //this.load.image("bomb", "assets/objetos/bomb.png");
  this.load.spritesheet("ninja", "assets/player/ninja.png", { frameWidth: 45, frameHeight: 54 });

}

function create() {
  this.add.image(400, 300, "sky");

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, "ground").refreshBody();
  platforms.create(950, 400, "ground");
  platforms.create(-220, 250, "ground");
  platforms.create(-90, 430, "ground");
  platforms.create(1000, 220, "ground");

  player = this.physics.add.sprite(100, 450, "ninja");
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("ninja", { start: 21, end: 31 }),
    frameRate: 25,
    repeat: -1
  });
  this.anims.create({
    key: "turn",
    frames: this.anims.generateFrameNumbers("ninja", { start: 11, end: 20 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("ninja", { start: 0, end: 10 }),
    frameRate: 25,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();
  spaceBar = this.input.keyboard.addKey("SPACE");

  coins = this.physics.add.group({
    key: "coin",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  coins.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  scoreText = this.add.text(16, 16, "score: 0", { fontSize: "32px", fill: "#000" })

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(coins, platforms);

  this.physics.add.overlap(player, coins, collectCoin, null, this);
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-260);
    player.anims.play("left", true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(260);
    player.anims.play("right", true);
  }
  else {
    player.setVelocityX(0);
    player.anims.play("turn", true);
  }

  if ((cursors.up.isDown || spaceBar.isDown) && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

function collectCoin(player, coin) {
  coin.disableBody(true, true);
  score += 10;
  scoreText.setText(`Score: ${score}`);
}