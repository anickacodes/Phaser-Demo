const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // assets (images, sprites, etc.)
    this.load.image('background', 'assets/fakesimbg.jpeg');
}

function create() {
    // (sprites, text, etc.)
    this.add.image(400, 300, 'background');
    // other game objects
}

function update() {
    // handle user input
}
