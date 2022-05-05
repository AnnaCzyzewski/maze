import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {

    blue = 0x0abff7;
    green = 0x2feb1a;
    orange = 0xebac1a;
    red = 0xd61806;
    purple = 0xd925f5;
    yellow = 0xfff700;
    black = 0x000000;

    constructor() {
        super({key:'titleScene'});
    }

    create(){

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var title = this.add.image(screenCenterX + 20, 220, 'memoryMaze');
        title.setScale(.75);

        var brain = this.add.image(screenCenterX, 400, 'brainMaze');
        brain.setScale(.75);

        var start = this.add.image(screenCenterX, 365, 'startButton');
        start.setScale(.75);

        var levelSelect = this.add.image(screenCenterX, 445, 'levelSelectButton');
        levelSelect.setScale(.75);

        var survival = this.add.image(screenCenterX, 439, 'survivalButton');
        survival.setScale(.54);
        
        var screen = this.add.rectangle(screenCenterX, screenCenterY, 550, 700);
        screen.setStrokeStyle(5);

        var screenOutline = this.add.rectangle(screenCenterX, screenCenterY, screen.width - 15, screen.height - 15);
        screenOutline.setStrokeStyle(2);
        screenOutline.setInteractive();
        screenOutline.on("pointerover", () => {
            start.setScale(.75);
            levelSelect.setScale(.75);
            survival.setScale(.54);
        });

        // fill between screen and screen inner outline
        var screenOutlineFill = this.add.rectangle(screenCenterX, screenCenterY, screen.width - 8, screen.height - 8);
        screenOutlineFill.setStrokeStyle(5, this.blue);

        var startOutline = this.add.rectangle(750, 311, 141, 39);
        startOutline.setInteractive({ useHandCursor: true });
        startOutline.on('pointerup', () => this.startButton());
        startOutline.on("pointerover", () => {
            start.setScale(.8);
        });

        var levelSelectOutline = this.add.rectangle(750, 374, 303, 38);
        levelSelectOutline.setInteractive({ useHandCursor: true });
        levelSelectOutline.on('pointerup', () => this.levelSelectButton());
        levelSelectOutline.on("pointerover", () => {
            levelSelect.setScale(.8);
        });

        var survivalOutline = this.add.rectangle(750, 438.6, 202, 39);
        survivalOutline.setInteractive({ useHandCursor: true });
        survivalOutline.on('pointerup', () => this.survivalButton());
        survivalOutline.on("pointerover", () => {
            survival.setScale(.59);
        });
    }

    startButton() {
        this.scene.start('game', { level: 0 });
    }

    levelSelectButton() {
        this.scene.start('levelScene');
    }

    survivalButton() {
        this.scene.start('rapid');
    }
}


