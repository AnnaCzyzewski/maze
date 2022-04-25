import Phaser from "phaser";
import LevelScene from "./LevelScene";

export default class LevelSceneP2 extends Phaser.Scene {

    blue = 0x0abff7;
    green = 0x2feb1a;
    orange = 0xebac1a;
    red = 0xd61806;
    purple = 0xd925f5;
    yellow = 0xfff700;
    black = 0x000000;

    constructor() 
    {
        super('levelSceneP2');
    }

    create()
    {
        var title = this.add.image(755, 215, 'levelSelect');
        title.setScale(.75);

        var brain = this.add.image(750, 400, 'brainMaze');
        brain.setScale(.75);

        var screen = this.add.rectangle(750, 380, 550, 700);
        screen.setStrokeStyle(5);
        screen.setInteractive();
        screen.on("pointerover", () => {
            home.setTintFill(this.black);
            next.setTintFill(this.black);
            back.setTintFill(this.black);
        });

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
        homeOutline.on("pointerover", () => {
            home.setTintFill(this.yellow);
        });

        var next = this.add.image(960, 682, 'nextIcon');
        next.setScale(.29);

        var nextOutline = this.add.rectangle(960, 661, 56, 56);
        //nextOutline.setStrokeStyle(2);
        nextOutline.setInteractive({ useHandCursor: true });
        //nextOutline.on('pointerup', () => this.nextButton());
        nextOutline.on("pointerover", () => {
            next.setTintFill(this.yellow);
        });

        var back = this.add.image(890, 682, 'nextIcon');
        back.setScale(.29);
        back.setFlipX(true);

        var backOutline = this.add.rectangle(890, 661, 56, 56);
        //backOutline.setStrokeStyle(2);
        backOutline.setInteractive({ useHandCursor: true });
        backOutline.on('pointerup', () => this.backButton());
        backOutline.on("pointerover", () => {
            back.setTintFill(this.yellow);
        });

        var twelve = this.add.image(580, 260, 'twelve');
        twelve.setScale(.9);
        var twelveOutline = this.add.rectangle(581, 259, 80, 90);
        //twelveOutline.setStrokeStyle(2, '0x0abff7');
        twelveOutline.setInteractive({ useHandCursor: true });
        
        var thirteen = this.add.image(692.25, 260, 'thirteen');
        thirteen.setScale(.9);
        var thirteenOutline = this.add.rectangle(692.25, 259, 80, 90);
        //thirteenOutline.setStrokeStyle(2, '0x0abff7');
        thirteenOutline.setInteractive({ useHandCursor: true });

        var fourteen = this.add.image(807.75, 260, 'fourteen');
        fourteen.setScale(.9);
        var fourteenOutline = this.add.rectangle(808, 260, 80, 90);
        //fourteenOutline.setStrokeStyle(2, '0x0abff7');
        fourteenOutline.setInteractive({ useHandCursor: true });

        var fifteen = this.add.image(920, 260, 'fifteen');
        fifteen.setScale(.9);
        var fifteenOutline = this.add.rectangle(920.25, 260, 80, 90);
        //fifteenOutline.setStrokeStyle(2, '0x0abff7');
        fifteenOutline.setInteractive({ useHandCursor: true });
    }

    homeButton() {
        this.scene.start('titleScene');
    }

    // nextButton() {
    //     this.scene.start('levelSceneP2');
    // }

    backButton() {
        this.scene.start('levelScene');
    }



}