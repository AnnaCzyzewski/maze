import Phaser from 'phaser';
import { getRecordForRapidFire } from '../RecordTracker';

export default class Game extends Phaser.Scene {

    blue = 0x0abff7;
    green = 0x2feb1a;
    orange = 0xebac1a;
    red = 0xd61806;
    purple = 0xd925f5;
    yellow = 0xfff700;
    black = 0x000000;

    constructor() {
		super('rapid')
	}  

    create() {
        var title = this.add.image(750, 110, 'survival');
        title.setScale(1.1);
        var chooseDifficulty = this.add.image(750, 200, 'chooseDifficulty');
        chooseDifficulty.setScale(.6);
        var brain = this.add.image(750, 400, 'brainMaze');
        brain.setScale(.75);

        var longestStreak = this.add.image(750, 550, 'longestStreak').setVisible(false);
        longestStreak.setScale(.3);

        var longestStreakText = this.add.text(843, 529, "", { fontSize: 40, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);

        var screen = this.add.rectangle(750, 380, 550, 700);
        screen.setStrokeStyle(5);
        screen.setInteractive();
        screen.on("pointerover", () => {
            screenOutlineFill.setStrokeStyle(5, this.blue);
            home.setTintFill(this.black);
            easy.setScale(.55);
            medium.setScale(.55);
            hard.setScale(.55);
            insane.setScale(.55);
            longestStreak.setVisible(false);
            longestStreakText.setVisible(false);
        });

        var screenOutline = this.add.rectangle(750, 380, screen.width - 15, screen.height - 15);
        screenOutline.setStrokeStyle(2);

        // fill between screen and screen inner outline
        var screenOutlineFill = this.add.rectangle(750, 380, screen.width - 8, screen.height - 8);
        screenOutlineFill.setStrokeStyle(5, 0x0abff7);

        // var easy;
        // var medium;
        // var hard;
        // var insane;

        // var easyToInsaneArray = [easy, medium, hard, insane];
        // var imageArray = ['easyButton', 'mediumButton', 'hardButton', 'insaneButton'];

        // easyToInsaneArray.forEach((image, index) => {
        //     image = this.add.image(750, 280 + 65 * index, imageArray[index]);
        //     image.setScale(.55);
        // });

        var easy = this.add.image(750, 280, 'easyButton');
        easy.setScale(.55);

        var easyOutline = this.add.rectangle(750, 280, 112, 42);
        easyOutline.setInteractive({ useHandCursor: true });
        easyOutline.on('pointerup', () => this.easyButton());
        easyOutline.on("pointerover", () => {
            easy.setScale(.6);
            screenOutlineFill.setStrokeStyle(5, this.green);
            longestStreak.setVisible(true);
            longestStreakText.setVisible(true);
            longestStreakText.setText(getRecordForRapidFire(1));
        });

        var medium = this.add.image(750, 345, 'mediumButton');
        medium.setScale(.55);

        var mediumOutline = this.add.rectangle(750, 345, 192, 42);
        mediumOutline.setInteractive({ useHandCursor: true });
        mediumOutline.on('pointerup', () => this.mediumButton());
        mediumOutline.on("pointerover", () => {
            medium.setScale(.6);
            screenOutlineFill.setStrokeStyle(5, this.orange);
            longestStreak.setVisible(true);
            longestStreakText.setVisible(true);
            longestStreakText.setText(getRecordForRapidFire(2));
        });

        var hard = this.add.image(750, 410, 'hardButton');
        hard.setScale(.55);

        var hardOutline = this.add.rectangle(750, 410, 108, 42);
        hardOutline.setInteractive({ useHandCursor: true });
        hardOutline.on('pointerup', () => this.hardButton());
        hardOutline.on("pointerover", () => {
            hard.setScale(.6);
            screenOutlineFill.setStrokeStyle(5, this.red);
            longestStreak.setVisible(true);
            longestStreakText.setVisible(true);
            longestStreakText.setText(getRecordForRapidFire(3));
        });

        var insane = this.add.image(750, 475, 'insaneButton');
        insane.setScale(.55);

        var insaneOutline = this.add.rectangle(750, 475, 162, 42);
        insaneOutline.setInteractive({ useHandCursor: true });
        insaneOutline.on('pointerup', () => this.insaneButton());
        insaneOutline.on("pointerover", () => {
            insane.setScale(.6);
            screenOutlineFill.setStrokeStyle(5, this.purple);
            longestStreak.setVisible(true);
            longestStreakText.setVisible(true);
            longestStreakText.setText(getRecordForRapidFire(4));
        });

        var home = this.add.image(542, 738, 'homeIcon');
        home.setScale(.75);
        var homeOutline = this.add.rectangle(542, 661, 56, 56);
        homeOutline.setInteractive({ useHandCursor: true });
        homeOutline.on('pointerup', () => this.homeButton());
        homeOutline.on("pointerover", () => {
            home.setTintFill(this.yellow);
        });  
    }

    homeButton() {
        this.scene.start('titleScene');
    }

    easyButton() {
        this.scene.start('game', {difficulty: 1, rapidFire: true});
    }

    mediumButton() {
        this.scene.start('game', {difficulty: 2, rapidFire: true});
    }

    hardButton() {
        this.scene.start('game', {difficulty: 3, rapidFire: true});
    }

    insaneButton() {
        this.scene.start('game', {difficulty: 4, rapidFire: true});
    }
}