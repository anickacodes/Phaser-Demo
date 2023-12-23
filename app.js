class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image(
      "basket",
      "assets/pngtree-wood-basket-decoration-illustration-image_1389803.jpg"
    );
    this.load.image("background", "assets/enchanted-forest.jpg");
  }

  create() {
    this.background = this.add.image(400, 300, "background");
    this.background.setScale(1.4);
    this.basket = this.add.image(400, -100, 'basket');
  this.basket.setScale(0.5);

    this.tweens.add({
      targets: this.basket,
      y: 500,
      duration: 1800,
      ease: 'Power2',
      yoyo: true, // This makes the basket move back to its initial position
      repeat: -1, // This makes the animation repeat indefinitely
    });
  }

  update() {}
}

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 600,
  scene: [MainScene],
};

const game = new Phaser.Game(config);

// console.log(game)
