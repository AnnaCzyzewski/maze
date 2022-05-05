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

        var title = this.add.image(755, 215, 'levelSelect');
        title.setScale(.75);

        var brain = this.add.image(750, 400, 'brainMaze');
        brain.setScale(.75);

        var screen = this.add.rectangle(750, 380, 550, 700);
        screen.setStrokeStyle(5);
        screen.setInteractive();
        screen.on("pointerover", () => {
            intro.setTintFill(this.black);
            introOutline.setStrokeStyle(3.5, this.black);
            one.setTintFill(this.black);
            two.setTintFill(this.black);
            three.setTintFill(this.black);
            four.setTintFill(this.black);
            five.setTintFill(this.black);
            six.setTintFill(this.black);
            seven.setTintFill(this.black);
            eight.setTintFill(this.black);
            nine.setTintFill(this.black);
            ten.setTintFill(this.black);
            eleven.setTintFill(this.black);
            twelve.setTintFill(this.black);
            home.setTintFill(this.black);
            bestTime.setVisible(false);
            recordText.setVisible(false);
        });

        var screenOutline = this.add.rectangle(750, 380, screen.width - 15, screen.height - 15);
        screenOutline.setStrokeStyle(2);

        // fill between screen and screen inner outline
        var screenOutlineFill = this.add.rectangle(750, 380, screen.width - 8, screen.height - 8);
        screenOutlineFill.setStrokeStyle(5, 0x0abff7);

        var bestTime = this.add.image(715, 165, 'bestTime');
        bestTime.setScale(.3);

        var recordText = this.add.text(785, 152, "", { fontSize: 27, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);

        var home = this.add.image(542, 738, 'homeIcon');
        home.setScale(.75);

        var homeOutline = this.add.rectangle(542, 661, 56, 56);
        homeOutline.setInteractive({ useHandCursor: true });
        homeOutline.on('pointerup', () => this.homeButton());
        homeOutline.on("pointerover", () => {
            home.setTintFill(this.yellow);
        });

        var intro = this.add.image(750, 210, 'introBar');
        intro.setScale(.4);
        var introOutline = this.add.rectangle(750, 210, 416, 40);
        introOutline.setStrokeStyle(3.5);
        introOutline.setInteractive({ useHandCursor: true });
        introOutline.on('pointerup', () => this.introButton());
        introOutline.on("pointerover", () => {
            intro.setTintFill(this.blue);
            introOutline.setStrokeStyle(3.5, this.blue);
        });

        var one = this.add.image(580, 412, 'one');
        one.setScale(.9);
        var oneOutline = this.add.rectangle(581, 309, 80, 90);
        oneOutline.setInteractive({ useHandCursor: true });
        oneOutline.on('pointerup', () => this.level1Button());
        oneOutline.on("pointerover", () => {
            one.setTintFill(this.green);
            bestTime.setVisible(true);
            recordText.setVisible(true);
            recordText.setText(
                this.formatTime(
                    getRecordForLevel(1)));
        });

        var two = this.add.image(692.25, 408, 'two');
        two.setScale(.9);
        var twoOutline = this.add.rectangle(692.25, 309, 80, 90);
        twoOutline.setInteractive({ useHandCursor: true });
        twoOutline.on('pointerup', () => this.level2Button());
        twoOutline.on("pointerover", () => {
            two.setTintFill(this.green);
            bestTime.setVisible(true);
            recordText.setVisible(true);
            recordText.setText(
                this.formatTime(
                    getRecordForLevel(2)));
        });

        var three = this.add.image(807.75, 412, 'three');
        three.setScale(.9);
        var threeOutline = this.add.rectangle(808, 310, 80, 90);
        threeOutline.setInteractive({ useHandCursor: true });
        threeOutline.on('pointerup', () => this.level3Button());
        threeOutline.on("pointerover", () => {
            three.setTintFill(this.green);
            bestTime.setVisible(true);
            recordText.setVisible(true);
            recordText.setText(
                this.formatTime(
                    getRecordForLevel(3)));
        });

        var four = this.add.image(920, 394, 'four');
        four.setScale(.9);
        var fourOutline = this.add.rectangle(920.25, 310, 80, 90);
        fourOutline.setInteractive({ useHandCursor: true });
        fourOutline.on('pointerup', () => this.level4Button());
        fourOutline.on("pointerover", () => {
            four.setTintFill(this.orange);
            bestTime.setVisible(true);
            recordText.setVisible(true);
            recordText.setText(
                this.formatTime(
                    getRecordForLevel(4)));
        });

        var five = this.add.image(580, 507.5, 'five');
        five.setScale(.9);
        var fiveOutline = this.add.rectangle(580, 430, 80, 90);
        fiveOutline.setInteractive({ useHandCursor: true });
        fiveOutline.on('pointerup', () => this.level5Button());
        fiveOutline.on("pointerover", () => {
            five.setTintFill(this.orange);
            bestTime.setVisible(true);
            recordText.setVisible(true);
            recordText.setText(
                this.formatTime(
                    getRecordForLevel(5)));
        });

        var six = this.add.image(692.25, 500, 'six');
        six.setScale(.9);
        var sixOutline = this.add.rectangle(692.25, 430, 80, 90);
        sixOutline.setInteractive({ useHandCursor: true });
        sixOutline.on('pointerup', () => this.level6Button());
        sixOutline.on("pointerover", () => {
            six.setTintFill(this.orange);
            bestTime.setVisible(true);
            recordText.setVisible(true);
            recordText.setText(
                this.formatTime(
                    getRecordForLevel(6)));
        });

        var seven = this.add.image(807.75, 514, 'seven');
        seven.setScale(.9);
        var sevenOutline = this.add.rectangle(807.75, 430, 80, 90);
        sevenOutline.setInteractive({ useHandCursor: true });
        sevenOutline.on('pointerup', () => this.level7Button());
        sevenOutline.on("pointerover", () => {
            seven.setTintFill(this.red);
            bestTime.setVisible(true);
            recordText.setVisible(true);
            recordText.setText(
                this.formatTime(
                    getRecordForLevel(7)));
        });

        var eight = this.add.image(920, 504, 'eight');
        eight.setScale(.9);
        var eightOutline = this.add.rectangle(920, 430, 80, 90);
        eightOutline.setInteractive({ useHandCursor: true });
        eightOutline.on('pointerup', () => this.level8Button());
        eightOutline.on("pointerover", () => {
            eight.setTintFill(this.red);
            bestTime.setVisible(true);
            recordText.setVisible(true);
            recordText.setText(
                this.formatTime(
                    getRecordForLevel(8)));
        });
        

        var nine = this.add.image(580, 622, 'nine');
        nine.setScale(.9);
        var nineOutline = this.add.rectangle(580, 551, 80, 90);
        nineOutline.setInteractive({ useHandCursor: true });
        nineOutline.on('pointerup', () => this.level9Button());
        nineOutline.on("pointerover", () => {
            nine.setTintFill(this.red);
            bestTime.setVisible(true);
            recordText.setVisible(true);
            recordText.setText(
                this.formatTime(
                    getRecordForLevel(9)));
        });

        var ten = this.add.image(692.25, 552, 'ten');
        ten.setScale(.9);
        var tenOutline = this.add.rectangle(692.25, 551, 80, 90);
        tenOutline.setInteractive({ useHandCursor: true });
        tenOutline.on('pointerup', () => this.level10Button());
        tenOutline.on("pointerover", () => {
            ten.setTintFill(this.purple);
            bestTime.setVisible(true);
            recordText.setVisible(true);
            recordText.setText(
                this.formatTime(
                    getRecordForLevel(10)));
        });
        
        var eleven = this.add.image(807, 552, 'eleven');
        eleven.setScale(.9);
        var elevenOutline = this.add.rectangle(807, 552, 80, 91);
        elevenOutline.setInteractive({ useHandCursor: true });
        elevenOutline.on('pointerup', () => this.level11Button());
        elevenOutline.on("pointerover", () => {
            eleven.setTintFill(this.purple);
            bestTime.setVisible(true);
            recordText.setVisible(true);
            recordText.setText(
                this.formatTime(
                    getRecordForLevel(11)));
        });

        var twelve = this.add.image(920, 552, 'twelve');
        twelve.setScale(.9);
        var twelveOutline = this.add.rectangle(920, 552, 80, 91);
        twelveOutline.setInteractive({ useHandCursor: true });
        twelveOutline.on('pointerup', () => this.level12Button());
        twelveOutline.on("pointerover", () => {
            twelve.setTintFill(this.purple);
            bestTime.setVisible(true);
            recordText.setVisible(true);
            recordText.setText(
                this.formatTime(
                    getRecordForLevel(12)));
        });
    }

    formatTime(milliseconds) {
        // Milliseconds to one digit (idk what unit that is)

        if(milliseconds == null) {
            return;
        }

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

    level1Button() {
        this.scene.start('game', {level: 1, rapidFire: false});
    }

    level2Button() {
        this.scene.start('game', {level: 2, rapidFire: false});
    }

    level3Button() {
        this.scene.start('game', {level: 3, rapidFire: false});
    }

    level4Button() {
        this.scene.start('game', {level: 4, rapidFire: false});
    }

    level5Button() {
        this.scene.start('game', {level: 5, rapidFire: false});
    }

    level6Button() {
        this.scene.start('game', {level: 6, rapidFire: false});
    }

    level7Button() {
        this.scene.start('game', {level: 7, rapidFire: false});
    }

    level8Button() {
        this.scene.start('game', {level: 8, rapidFire: false});
    }

    level9Button() {
        this.scene.start('game', {level: 9, rapidFire: false});
    }

    level10Button() {
        this.scene.start('game', {level: 10, rapidFire: false});
    }

    level11Button() {
        this.scene.start('game', {level: 11, rapidFire: false});
    }

    level12Button() {
        this.scene.start('game', {level: 12, rapidFire: false});
    }

}