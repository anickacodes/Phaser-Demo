class PlayerInput {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
      this.player.setScale(-0.1, 0.1);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
      this.player.setScale(0.1, 0.1);
    } else {
      this.player.setVelocityX(0);
    }
  }
}

class CharacterSelection extends Phaser.Scene {
  constructor() {
    super({ key: "CharacterSelection" });
    this.selectedCharacterIndex = 0;
  }
  preload() {
    this.load.image("characterSelectionBackground", "assets/forestHut.png");
    this.load.image("fairyCSBackground", "assets/fairyonflowersblue.png");
    this.load.image("leftArrow", "assets/556_arrowright.png");
    this.load.image(
      "character1",
      "assets/imgbin-fairy-K5AWMkUD4R8vRHWWT0RKLtAV2.png"
    );
    this.load.image(
      "character2",
      "assets/forest_fairy_9__png_overlay__by_lewis4721_dfe1plt-fullview.png"
    );
    this.load.image(
      "startButton",
      "assets/jungle-play-or-start-button-with-stone-and-leaves-vector-43177304.png"
    );
  }
  create() {
    this.background = this.add.image(400, 300, "characterSelectionBackground");
    this.background.setScale(2);

    const fairybackground = this.add.image(700, 400, "fairyCSBackground");
    // fairybackground.setScale(.3);

    const leftArrow = this.add
      .image(50, 300, "leftArrow")
      .setInteractive()
      .setScale(0.2);
    const rightArrow = this.add
      .image(750, 300, "rightArrow")
      .setInteractive()
      .setScale(0.2);

    leftArrow.on("pointerup", () => this.selectCharacter(-1));
    rightArrow.on("pointerup", () => this.selectCharacter(1));

    this.input.keyboard.on("keydown-LEFT", () => this.selectCharacter(-1));
    this.input.keyboard.on("keydown-RIGHT", () => this.selectCharacter(1));

    const character1Button = this.add
      .image(100, 300, "character1")
      .setInteractive()
      .setScale(0.4);
    const character2Button = this.add
      .image(300, 350, "character2")
      .setInteractive()
      .setScale(0.1);

    character1Button.on("pointerup", () => this.selectCharacter(0));
    character2Button.on("pointerup", () => this.selectCharacter(1));

    this.input.keyboard.on("keydown-LEFT", () => this.selectCharacter(-1));
    this.input.keyboard.on("keydown-RIGHT", () => this.selectCharacter(1));
  }
  selectCharacter(offset) {
    this.selectedCharacterIndex += offset;

    if (this.selectedCharacterIndex < 0) {
      this.selectedCharacterIndex = 1;
    } else if (this.selectedCharacterIndex > 1) {
      this.selectedCharacterIndex = 0;
    }
    const characterKey = `character${this.selectedCharacterIndex + 1}`;
    this.background.setTexture(characterKey);
    this.background.setScale(0.2);

    const startButton = this.add
      .image(400, 500, "startButton")
      .setInteractive()
      .setScale(0.2);
    startButton.on("pointerup", () => this.startGame());
  }

  startGame() {
    const selectedCharacter = `character${this.selectedCharacterIndex + 1}`;

    this.scene.start("MainScene", { character: selectedCharacter });
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    const selectedCharacter = this.registry.get("character");

    this.load.image("personWithBasket", `path/to/${selectedCharacter}.png`);

    this.load.image("apple", "assets/eamerla.jpeg");
    this.load.image("background", "assets/enchanted-forest.jpg");
  }

  create() {
    this.background = this.add.image(400, 300, "background");
    this.background.setScale(1.4);

    this.personWithBasket = this.physics.add
      .image(40, 52, "personWithBasket")
      .setScale(0.1);
    this.personWithBasket.setCollideWorldBounds(true);

    this.apples = this.physics.add.group({
      key: "apple",
      repeat: 9,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.apples.children.iterate((apple) => {
      apple.setBounceY(Phaser.Math.FloatBetween(0.2, 0.8));
      apple.setCollideWorldBounds(true);
    });

    this.physics.add.collider(this.apples, this.apples);
    this.physics.add.collider(
      this.apples,
      this.personWithBasket,
      this.collectApple,
      null,
      this
    );

    this.playerInput = new PlayerInput(this, this.personWithBasket);
  }

  update() {
    this.playerInput.update();
  }

  collectApple(personWithBasket, apple) {
    apple.disableBody(true, true);
    //  scoring logic here
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 600,
  scene: [CharacterSelection, MainScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  title: "Apple Pickin",
  banner: {
    text: "#ffffff",
    background: ["#fff200", "#38f0e8", "#00bff3", "#ec008c"],
    hidePhaser: true,
  },
  version: "0.0.3g",
};

const game = new Phaser.Game(config);
