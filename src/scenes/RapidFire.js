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
            longestStreak.setVisible(false);
            longestStreakText.setVisible(false);
        });

        var screenOutline = this.add.rectangle(750, 380, screen.width - 15, screen.height - 15);
        screenOutline.setStrokeStyle(2);

        // fill between screen and screen inner outline
        var screenOutlineFill = this.add.rectangle(750, 380, screen.width - 8, screen.height - 8);
        screenOutlineFill.setStrokeStyle(5, 0x0abff7);

        var easy;
        var medium;
        var hard;
        var insane;

        var easyToInsaneArray = [easy, medium, hard, insane];
        var imageArray = ['easyButton', 'mediumButton', 'hardButton', 'insaneButton'];
        var colorsArray = [this.green, this.orange, this.red, this.purple];
        var widthsArray = [112, 192, 108, 192];

        easyToInsaneArray.forEach((numberImage, index) => {
            numberImage = this.add.image(750, 280 + 65 * index, imageArray[index]);
            numberImage.setScale(.55);
            var outline = this.add.rectangle(750, 280 + 65 * index, widthsArray[index], 42);
            outline.setInteractive({ useHandCursor: true });
            outline.on('pointerup', () => this.scene.start('game', {difficulty: index + 1, rapidFire: true}));
            outline.on("pointerover", () => {
                numberImage.setScale(.6);
                screenOutlineFill.setStrokeStyle(5, colorsArray[index]);
                longestStreak.setVisible(true);
                longestStreakText.setVisible(true);
                longestStreakText.setText(getRecordForRapidFire(index + 1));
            });
            screen.on('pointerover', () => {
                numberImage.setScale(.55);
            });
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
}