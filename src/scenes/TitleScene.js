import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({key:'titleScene'});
    }

    preload(){
       this.load.image('background', 'src/assets/graybackground.png');
    }

    create(){
        var bg = this.add.sprite(100,100, 'background');
        bg.setOrigin(0,0);
        var text = this.add.text(100, 100, "MEMORY MAZE");

        var text = this.add.text(100,150, 'START GAME');
        text.setInteractive({ useHandCursor: true });
        text.on('pointerup', () => this.clickButton());
        
    }

    clickButton() {
        this.scene.start('game');
    }
}

