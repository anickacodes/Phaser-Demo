
class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' });
    }
  
    preload() {
    
      this.load.image('background', 'assets/enchanted-forest.jpg');
    }
  
    create() {
 
      this.background = this.add.image(400, 300, 'background');
      this.background.setScale(1.4)
    }
  
    update() {
     
    }
  }
  
  const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 800,
    height: 600,
    scene: [MainScene],
  };
  

  const game = new Phaser.Game(config);
  