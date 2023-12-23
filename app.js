class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image("personWithBasket", "assets/forest_fairy_9__png_overlay__by_lewis4721_dfe1plt-fullview.png");
    this.load.image("apple", "assets/eamerla5.jpeg");
    this.load.image("background", "assets/enchanted-forest.jpg");
  }

  create() {
    this.background = this.add.image(400, 300, "background");
    this.background.setScale(1.4);

    this.personWithBasket = this.physics.add.image(40, 52, "personWithBasket").setScale(.1);
    this.personWithBasket.setCollideWorldBounds(true);

    this.apples = this.physics.add.group({
      key: "apple",
      repeat: 9,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.apples.children.iterate((apple) => {
      apple.setBounceY(Phaser.Math.FloatBetween(0.2, 0.8));
      apple.setCollideWorldBounds(true);
    });

    this.physics.add.collider(this.apples, this.apples);
    this.physics.add.collider(this.apples, this.personWithBasket, this.collectApple, null, this);

    // Allow keyboard input for moving the person
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Move the person left and right based on keyboard input
    if (this.cursors.left.isDown) {
      this.personWithBasket.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.personWithBasket.setVelocityX(200);
    } else {
      this.personWithBasket.setVelocityX(0);
    }
  }

  collectApple(personWithBasket, apple) {
    apple.disableBody(true, true);
    // Add your scoring logic here
    // Increment the score or perform other actions
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 600,
  scene: [MainScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  title: "Apple Pickin",
  banner: {
    text: "#ffffff",
    background: ["#fff200", "#38f0e8", "#00bff3", "#ec008c"],
    hidePhaser: true
  },
  version: "0.0.3g"
};

const game = new Phaser.Game(config);
