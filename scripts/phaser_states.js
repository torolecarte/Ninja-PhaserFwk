var config = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);

function preload() {
  console.log("PRELOAD");
}

function create() {
  console.log("CREATE");
}

function update() {
  console.log("UPDATE");
}


