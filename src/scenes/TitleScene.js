import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({key:'titleScene'});
    }

    preload(){
       this.load.image('background', 'src/assets/graybackground.png');
       this.load.image('memoryMaze', 'src/assets/memory_maze.png');
       this.load.image('startButton', 'src/assets/start_button.png')
       this.load.image('brainMaze', 'src/assets/brain_maze.png');
       this.load.image('levelSelectButton', 'src/assets/level_select_button.png');
       this.load.image('settingsIcon', 'src/assets/settings_icon.png');
    }

    create(){
        //var bg = this.add.sprite(750,100, 'background');
        //bg.setOrigin(0,0);
        //var text = this.add.text(120, 110, "MEMORY MAZE", { fontSize: 40, fill: '#0abff7' });

        //var text = this.add.text(160,200, 'START GAME', { fontSize: 30, fill: '#0abff7' });
        //text.setInteractive({ useHandCursor: true });
        //text.on('pointerup', () => this.clickButton());

        var title = this.add.image(765, 220, 'memoryMaze');
        title.setScale(.75);

        var brain = this.add.image(750, 400, 'brainMaze');
        brain.setScale(.75);

        var start = this.add.image(750, 380, 'startButton');
        start.setScale(.75);
        //start.setInteractive({ useHandCursor: true });
        //start.on('pointerup', () => this.clickButton());

        var levelSelect = this.add.image(750, 460, 'levelSelectButton');
        levelSelect.setScale(.75);

        var settings = this.add.image(960, 720, 'settingsIcon');
        settings.setScale(.75);
        
        var screen = this.add.rectangle(750, 380, 550, 700);
        screen.setStrokeStyle(5);

        var screenOutline = this.add.rectangle(750, 380, screen.width - 15, screen.height - 15);
        screenOutline.setStrokeStyle(2);

        // fill between screen and screen inner outline
        var screenOutlineFill = this.add.rectangle(750, 380, screen.width - 8, screen.height - 8);
        screenOutlineFill.setStrokeStyle(5, 0x0abff7);

        var startOutline = this.add.rectangle(750, 326, 140, 40);
        //startOutline.setStrokeStyle(2);
        startOutline.setInteractive({ useHandCursor: true });
        startOutline.on('pointerup', () => this.clickButton());

        var levelSelectOutline = this.add.rectangle(750, 389, 305, 40);
        //levelSelectOutline.setStrokeStyle(2);
        levelSelectOutline.setInteractive({ useHandCursor: true });

        var settingsOutline = this.add.rectangle(960, 661, 56, 56);
        //settingsOutline.setStrokeStyle(2);
        settingsOutline.setInteractive({ useHandCursor: true });
    }

    clickButton() {
        this.scene.start('game');
    }
}

