
class MainScene extends Phaser.Scene {
    constructor() {
      super({ key: 'MainScene' });
    }
  
    preload() {
    
      this.load.image('logo', 'assets/enchanted-forest.jpg');
    }
  
    create() {
 
      this.logo = this.add.image(400, 300, 'logo');
      this.logo.setScale(1.4)
    }
  
    update() {
     
    }
  }
  
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: MainScene,
  };
  

  const game = new Phaser.Game(config);
  