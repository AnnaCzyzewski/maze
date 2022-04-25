import Phaser from "phaser";

export default class LevelScene extends Phaser.Scene {

    blue = 0x0abff7;
    green = 0x2feb1a;
    orange = 0xebac1a;
    red = 0xd61806;
    purple = 0xd925f5;
    yellow = 0xfff700;
    black = 0x000000;

    constructor() {
        super({key:'levelScene'});
    }
    preload(){
        this.load.image('background', 'src/assets/graybackground.png');
    }
 
    create(){

        console.log("went to level scene");

        var title = this.add.image(755, 215, 'levelSelect');
        title.setScale(.75);

        var brain = this.add.image(750, 400, 'brainMaze');
        brain.setScale(.75);

        var screen = this.add.rectangle(750, 380, 550, 700);
        screen.setStrokeStyle(5);
        screen.setInteractive();
        screen.on("pointerover", () => {
            zero.setTintFill(this.black);
            one.setTintFill(this.black);
            two.setTintFill(this.black);
            three.setTintFill(this.black);
            four.setTintFill(this.black);
            home.setTintFill(this.black);
            next.setTintFill(this.black);
            bestTime.setVisible(false);
        });

        var screenOutline = this.add.rectangle(750, 380, screen.width - 15, screen.height - 15);
        screenOutline.setStrokeStyle(2);

        // fill between screen and screen inner outline
        var screenOutlineFill = this.add.rectangle(750, 380, screen.width - 8, screen.height - 8);
        screenOutlineFill.setStrokeStyle(5, 0x0abff7);

        var bestTime = this.add.image(750, 175, 'bestTime');
        bestTime.setScale(.3);

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
        nextOutline.on('pointerup', () => this.nextButton());
        nextOutline.on("pointerover", () => {
            next.setTintFill(this.yellow);
        });

        var zero = this.add.image(580, 350.5, 'zero');
        zero.setScale(.9);
        var zeroOutline = this.add.rectangle(581, 259, 80, 90);
        // zeroOutline.setStrokeStyle(2, '0x0abff7');
        zeroOutline.setInteractive({ useHandCursor: true });
        zeroOutline.on('pointerup', () => this.level0Button());
        zeroOutline.on("pointerover", () => {
            zero.setTintFill(this.blue);
            bestTime.setVisible(true);
        });

        var one = this.add.image(692.25, 362, 'one');
        one.setScale(.9);
        var oneOutline = this.add.rectangle(692.25, 259, 80, 90);
        // oneOutline.setStrokeStyle(2, '0x0abff7');
        oneOutline.setInteractive({ useHandCursor: true });
        oneOutline.on('pointerup', () => this.level1Button());
        oneOutline.on("pointerover", () => {
            one.setTintFill(this.green);
            bestTime.setVisible(true);
        });

        var two = this.add.image(807.75, 358, 'two');
        two.setScale(.9);
        var twoOutline = this.add.rectangle(808, 260, 80, 90);
        // twoOutline.setStrokeStyle(2, '0x0abff7');
        twoOutline.setInteractive({ useHandCursor: true });
        twoOutline.on('pointerup', () => this.level2Button());
        twoOutline.on("pointerover", () => {
            two.setTintFill(this.orange);
            bestTime.setVisible(true);
        });

        var three = this.add.image(920, 362, 'three');
        three.setScale(.9);
        var threeOutline = this.add.rectangle(920.25, 260, 80, 90);
        // threeOutline.setStrokeStyle(2, '0x0abff7');
        threeOutline.setInteractive({ useHandCursor: true });
        threeOutline.on('pointerup', () => this.level3Button());
        threeOutline.on("pointerover", () => {
            three.setTintFill(this.red);
            bestTime.setVisible(true);
        });

        var four = this.add.image(580, 465.5, 'four');
        four.setScale(.9);
        var fourOutline = this.add.rectangle(580, 380, 80, 90);
        // fourOutline.setStrokeStyle(2, '0x0abff7');
        fourOutline.setInteractive({ useHandCursor: true });
        fourOutline.on('pointerup', () => this.level4Button());
        fourOutline.on("pointerover", () => {
            four.setTintFill(this.purple);
            bestTime.setVisible(true);
        });

        var five = this.add.image(692.25, 457.5, 'five');
        five.setScale(.9);
        var fiveOutline = this.add.rectangle(692.25, 380, 80, 90);
        //fiveOutline.setStrokeStyle(2, '0x0abff7');
        fiveOutline.setInteractive({ useHandCursor: true });

        var six = this.add.image(807.75, 450, 'six');
        six.setScale(.9);
        var sixOutline = this.add.rectangle(807.75, 380, 80, 90);
        //sixOutline.setStrokeStyle(2, '0x0abff7');
        sixOutline.setInteractive({ useHandCursor: true });

        var seven = this.add.image(920, 464, 'seven');
        seven.setScale(.9);
        var sevenOutline = this.add.rectangle(920, 380, 80, 90);
        //sevenOutline.setStrokeStyle(2, '0x0abff7');
        sevenOutline.setInteractive({ useHandCursor: true });

        var eight = this.add.image(580, 574.5, 'eight');
        eight.setScale(.9);
        var eightOutline = this.add.rectangle(580, 501, 80, 90);
        //eightOutline.setStrokeStyle(2, '0x0abff7');
        eightOutline.setInteractive({ useHandCursor: true });

        var nine = this.add.image(692.25, 572, 'nine');
        nine.setScale(.9);
        var nineOutline = this.add.rectangle(692.25, 501, 80, 90);
        //nineOutline.setStrokeStyle(2, '0x0abff7');
        nineOutline.setInteractive({ useHandCursor: true });
        
        var ten = this.add.image(807, 502, 'ten');
        ten.setScale(.9);
        var tenOutline = this.add.rectangle(807, 502, 80, 91);
        //tenOutline.setStrokeStyle(2, '0x0abff7');
        tenOutline.setInteractive({ useHandCursor: true });

        var eleven = this.add.image(920, 502, 'eleven');
        eleven.setScale(.9);
        var elevenOutline = this.add.rectangle(920, 502, 80, 91);
        //elevenOutline.setStrokeStyle(2, '0x0abff7');
        elevenOutline.setInteractive({ useHandCursor: true });
 
    }

    homeButton() {
        this.scene.start('titleScene');
    }

    nextButton() {
        this.scene.start('levelSceneP2');
    }

    // Just made these functions for reference on what to do with the difficulty, they're not connected to buttons yet
    level0Button() {
        this.scene.start('game', {difficulty: 0, rapidFire: false});
    }

    level1Button() {
        // this.scene.start('rapid');
        this.scene.start('game', {difficulty: 1, rapidFire: false});
    }

    level2Button() {
        this.scene.start('game', {difficulty: 2, rapidFire: false});
    }

    level3Button() {
        this.scene.start('game', {difficulty: 3, rapidFire: false});
    }

    level4Button() {
        this.scene.start('game', {difficulty: 4, rapidFire: false});
    }

    level5Button() {
        this.scene.start('game', {difficulty: 4, rapidFire: false});
    }

    level6Button() {
        this.scene.start('game', {difficulty: 4, rapidFire: false});
    }

    level7Button() {
        this.scene.start('game', {difficulty: 4, rapidFire: false});
    }

    level8Button() {
        this.scene.start('game', {difficulty: 4, rapidFire: false});
    }

    level9Button() {
        this.scene.start('game', {difficulty: 4, rapidFire: false});
    }

    level10Button() {
        this.scene.start('game', {difficulty: 4, rapidFire: false});
    }

    level11Button() {
        this.scene.start('game', {difficulty: 4, rapidFire: false});
    }

}