import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {

    constructor() {
        super({key:'titleScene'});
    }

    create(){

        var title = this.add.image(765, 220, 'memoryMaze');
        title.setScale(.75);

        var brain = this.add.image(750, 400, 'brainMaze');
        brain.setScale(.75);

        var start = this.add.image(750, 365, 'startButton');
        start.setScale(.75);

        var levelSelect = this.add.image(750, 445, 'levelSelectButton');
        levelSelect.setScale(.75);

        var survival = this.add.image(750, 439, 'survivalButton');
        survival.setScale(.54);
        
        var screen = this.add.rectangle(750, 380, 550, 700);
        screen.setStrokeStyle(5);

        var screenOutline = this.add.rectangle(750, 380, screen.width - 15, screen.height - 15);
        screenOutline.setStrokeStyle(2);

        // fill between screen and screen inner outline
        var screenOutlineFill = this.add.rectangle(750, 380, screen.width - 8, screen.height - 8);
        screenOutlineFill.setStrokeStyle(5, 0x0abff7);

        var startOutline = this.add.rectangle(750, 311, 140, 40);
        startOutline.setInteractive({ useHandCursor: true });
        startOutline.on('pointerup', () => this.startButton());

        var levelSelectOutline = this.add.rectangle(750, 374, 305, 40);
        levelSelectOutline.setInteractive({ useHandCursor: true });
        levelSelectOutline.on('pointerup', () => this.levelSelectButton());

        var survivalOutline = this.add.rectangle(750, 439, 204, 40);
        survivalOutline.setInteractive({ useHandCursor: true });
        survivalOutline.on('pointerup', () => this.survivalButton());
    }

    // right now this runs 
    startButton() {
        this.scene.start('game', {difficulty: 0});
    }

    levelSelectButton() {
        this.scene.start('levelScene');
    }

    survivalButton() {
        this.scene.start('rapid');
    }
}


