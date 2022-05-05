import Phaser from "phaser";
import { getRecordForLevel } from '../RecordTracker';

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
 
    create() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var title = this.add.image(screenCenterX, 200, 'levelSelect');
        title.setScale(.75);

        var brain = this.add.image(screenCenterX, 400, 'brainMaze');
        brain.setScale(.75);

        var screen = this.add.rectangle(screenCenterX, screenCenterY, 550, 700);
        screen.setStrokeStyle(5);
        screen.setInteractive();
        screen.on("pointerover", () => {
            intro.setTintFill(this.black);
            introOutline.setStrokeStyle(3.5, this.black);
            home.setTintFill(this.black);
            bestTime.setVisible(false);
        });

        var screenOutline = this.add.rectangle(screenCenterX, screenCenterY, screen.width - 15, screen.height - 15);
        screenOutline.setStrokeStyle(2);

        // fill between screen and screen inner outline
        var screenOutlineFill = this.add.rectangle(screenCenterX, screenCenterY, screen.width - 8, screen.height - 8);
        screenOutlineFill.setStrokeStyle(5, 0x0abff7);

        var bestTime = this.add.image(screenCenterX - 35, 150, 'bestTime');
        bestTime.setScale(.3);

        var recordText = this.add.text(screenCenterX + 35, 137, "", { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);

        var home = this.add.image(500, 738, 'homeIcon');
        home.setScale(.75);

        var homeOutline = this.add.rectangle(500, 661, 56, 56);
        homeOutline.setInteractive({ useHandCursor: true });
        homeOutline.on('pointerup', () => this.homeButton());
        homeOutline.on("pointerover", () => {
            home.setTintFill(this.yellow);
        });

        var intro = this.add.image(screenCenterX, 195, 'introBar');
        intro.setScale(.4);
        var introOutline = this.add.rectangle(screenCenterX, 195, 416, 40);
        introOutline.setStrokeStyle(3.5);
        introOutline.setInteractive({ useHandCursor: true });
        introOutline.on('pointerup', () => this.introButton());
        introOutline.on("pointerover", () => {
            intro.setTintFill(this.blue);
            introOutline.setStrokeStyle(3.5, this.blue);
        });

        var one;
        var two;
        var three;
        var four;
        var five;
        var six;
        var seven;
        var eight;
        var nine;
        var ten;
        var eleven;
        var twelve;

        var oneToTwelveArray = [one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve];
        var difficultyArray = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3];
        var addToX = [-120, 0, 120, -120, 0, 120, -120, 0, 120, -120, 0, 120];
        var imageArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
        var colorsArray = [this.green, this.green, this.green, 
            this.orange, this.orange, this.orange, 
            this.red, this.red, this.red, 
            this.purple, this.purple, this.purple];
        var differencesX = [1, 0, 0.25, 0.25, 0, 0, 0, 0, 0, 0, 0, 0];
        var differencesY = [103, 99, 102, 84, 77.5, 70, 84, 74, 71, 1, 0, 0];

        oneToTwelveArray.forEach((numberImage, index) => {
            numberImage = this.add.image(
                screenCenterX + addToX[index] + differencesX[index],
                289 + 118 * difficultyArray[index] + differencesY[index],
                imageArray[index]);
            numberImage.setScale(.9);
            var outline = this.add.rectangle(
                screenCenterX + addToX[index],
                289 + 118 * difficultyArray[index],
                80,
                90);
            outline.setInteractive({ useHandCursor: true });
            outline.on('pointerup', () => this.scene.start('game', {level: index + 1, rapidFire: false}));
            outline.on("pointerover", () => {
                numberImage.setTintFill(colorsArray[index]);
                bestTime.setVisible(true);
                recordText.setVisible(true);
                recordText.setText(
                    this.formatTime(
                        getRecordForLevel(index + 1)));
            });
            screen.on("pointerover", () => {
                numberImage.setTintFill(this.black);
                recordText.setVisible(false);
            });
        });
    }

    formatTime(milliseconds) {

        if(milliseconds == null) {
            return;
        }

        // Milliseconds to one digit
        var oneDigitMil = Math.ceil(milliseconds / 100);
        // OneDigitMil to seconds
        var seconds = Math.floor(oneDigitMil / 10);
        // Remainder back to OneDigitMil
        var partInOneDigitMils = oneDigitMil%10;
        // Seconds to minutes
        var minutes = Math.floor(seconds/60);
        // Remainder back to seconds
        var partInSeconds = seconds%60;

        if(minutes >= 1) 
        {
            // Adds left zeros to seconds
            partInSeconds = partInSeconds.toString().padStart(2,'0');
            // Formats time
            var formattedTime =`${minutes}:${partInSeconds}.${partInOneDigitMils}`;
        } else 
        {
            var formattedTime =`${partInSeconds}.${partInOneDigitMils}`;
        }

        return formattedTime;
    }

    homeButton() {
        this.scene.start('titleScene');
    }

    introButton() {
        this.scene.start('game', {level: 0, rapidFire: false});
    }
}