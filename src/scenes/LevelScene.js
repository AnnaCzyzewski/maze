import Phaser from "phaser";

export default class LevelScene extends Phaser.Scene {
    constructor() {
        super({key:'levelScene'});
    }
    preload(){
        this.load.image('background', 'src/assets/graybackground.png');
    }
 
    create(){

        var title = this.add.image(755, 215, 'levelSelect');
        title.setScale(.75);

        var brain = this.add.image(750, 400, 'brainMaze');
        brain.setScale(.75);

        var screen = this.add.rectangle(750, 380, 550, 700);
        screen.setStrokeStyle(5);

        var screenOutline = this.add.rectangle(750, 380, screen.width - 15, screen.height - 15);
        screenOutline.setStrokeStyle(2);

        // fill between screen and screen inner outline
        var screenOutlineFill = this.add.rectangle(750, 380, screen.width - 8, screen.height - 8);
        screenOutlineFill.setStrokeStyle(5, 0x0abff7);

        var home = this.add.image(542, 738, 'homeIcon');
        home.setScale(.75);

        var homeOutline = this.add.rectangle(542, 661, 56, 56);
        //homeOutline.setStrokeStyle(2);
        homeOutline.setInteractive({ useHandCursor: true });
        homeOutline.on('pointerup', () => this.homeButton());

        var next = this.add.image(960, 682, 'nextIcon');
        next.setScale(.29);

        var nextOutline = this.add.rectangle(960, 661, 56, 56);
        //nextOutline.setStrokeStyle(2);
        nextOutline.setInteractive({ useHandCursor: true });

        var zero = this.add.image(580, 350.5, 'zero');
        zero.setScale(.9);

        var one = this.add.image(692.25, 362, 'one');
        one.setScale(.9);

        var two = this.add.image(807.75, 358, 'two');
        two.setScale(.9);

        var three = this.add.image(920, 362, 'three');
        three.setScale(.9);

        var four = this.add.image(580, 465.5, 'four');
        four.setScale(.9);

        var five = this.add.image(692.25, 457.5, 'five');
        five.setScale(.9);

        var six = this.add.image(807.75, 450, 'six');
        six.setScale(.9);

        var seven = this.add.image(920, 464, 'seven');
        seven.setScale(.9);

        var eight = this.add.image(580, 574.5, 'eight');
        eight.setScale(.9);

        var nine = this.add.image(692.25, 572, 'nine');
        nine.setScale(.9);
 
    }

    homeButton() {
        this.scene.start('titleScene');
    }

}