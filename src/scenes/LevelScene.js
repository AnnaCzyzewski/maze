import Phaser from "phaser";

export default class LevelScene extends Phaser.Scene {
    constructor() {
        super({key:'levelScene'});
    }
    preload(){
        this.load.image('background', 'src/assets/graybackground.png');
     }
 
     create(){
         var bg = this.add.sprite(100,100, 'background');
         bg.setOrigin(0,0);
 
         var text = this.add.text(100,150, 'Level One', { fontSize: 10, fill: '#0abff7' });
         text.setInteractive({ useHandCursor: true });
         text.on('pointerup', () => this.clickButton());


         
         var text = this.add.text(70,150, 'Level Two', { fontSize: 10, fill: '#0abff7' });
         text.setInteractive({ useHandCursor: true });
         text.on('pointerup', () => this.clickButton());

         
         var text = this.add.text(130,150, 'Level Three', { fontSize: 10, fill: '#0abff7' });
         text.setInteractive({ useHandCursor: true });
         text.on('pointerup', () => this.clickButton());
         
     }
 
     clickButton() {
         this.scene.start('game');
     }

}