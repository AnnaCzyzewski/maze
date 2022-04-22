import Phaser from 'phaser';

export default class Game extends Phaser.Scene
{

    blue = 0x0abff7;
    green = 0x2feb1a;
    orange = 0xebac1a;
    red = 0xd61806;
    purple = 0xd925f5;
    black = 0x000000;

    constructor()
	{
		super('rapid')
	}
    init(data)
    {
        this.difficulty = data.difficulty;
    }
    create() 
    {
        var title = this.add.image(750, 110, 'survival');
        title.setScale(1.1);
        var chooseDifficulty = this.add.image(750, 200, 'chooseDifficulty');
        chooseDifficulty.setScale(.6);
        var brain = this.add.image(750, 400, 'brainMaze');
        brain.setScale(.75);

        var screen = this.add.rectangle(750, 380, 550, 700);
        screen.setStrokeStyle(5);
        screen.setInteractive();
        screen.on("pointerover", () => {
            screenOutlineFill.setStrokeStyle(5, this.blue);
            //title.setTintFill(this.black);
            //brain.setTintFill(this.black);
        });

        var screenOutline = this.add.rectangle(750, 380, screen.width - 15, screen.height - 15);
        screenOutline.setStrokeStyle(2);
        // fill between screen and screen inner outline
        var screenOutlineFill = this.add.rectangle(750, 380, screen.width - 8, screen.height - 8);
        screenOutlineFill.setStrokeStyle(5, 0x0abff7);
        var easy = this.add.image(750, 280, 'easyButton');
        easy.setScale(.55);
        var easyOutline = this.add.rectangle(750, 280, 112, 42);
        //easyOutline.setStrokeStyle(2);
        easyOutline.setInteractive({ useHandCursor: true });
        easyOutline.on("pointerover", () => {
            screenOutlineFill.setStrokeStyle(5, this.green);
            //title.setTintFill(this.green);
            //brain.setTintFill(this.green);
        });

        var medium = this.add.image(750, 345, 'mediumButton');
        medium.setScale(.55);

        var mediumOutline = this.add.rectangle(750, 345, 192, 42);
        //mediumOutline.setStrokeStyle(2);
        mediumOutline.setInteractive({ useHandCursor: true });
        mediumOutline.on("pointerover", () => {
            screenOutlineFill.setStrokeStyle(5, this.orange);
            //title.setTintFill(this.orange);
            //brain.setTintFill(this.orange);
        });

        var hard = this.add.image(750, 410, 'hardButton');
        hard.setScale(.55);

        var hardOutline = this.add.rectangle(750, 410, 108, 42);
        //hardOutline.setStrokeStyle(2);
        hardOutline.setInteractive({ useHandCursor: true });
        hardOutline.on("pointerover", () => {
            screenOutlineFill.setStrokeStyle(5, this.red);
            //title.setTintFill(this.red);
            //brain.setTintFill(this.red);
        });

        var insane = this.add.image(750, 475, 'insaneButton');
        insane.setScale(.55);

        var insaneOutline = this.add.rectangle(750, 475, 162, 42);
        //insaneOutline.setStrokeStyle(2);
        insaneOutline.setInteractive({ useHandCursor: true });
        insaneOutline.on("pointerover", () => {
            screenOutlineFill.setStrokeStyle(5, this.purple);
            //title.setTintFill(this.purple);
            //brain.setTintFill(this.purple);
        });

        var home = this.add.image(542, 738, 'homeIcon');
        home.setScale(.75);
        var homeOutline = this.add.rectangle(542, 661, 56, 56);
        //homeOutline.setStrokeStyle(2);
        homeOutline.setInteractive({ useHandCursor: true });
        homeOutline.on('pointerup', () => this.homeButton());
        
    }
    homeButton() {
        this.scene.start('titleScene');
    }
}