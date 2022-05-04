import Phaser from 'phaser';

export default class Game extends Phaser.Scene
{

    easyRecord;
    mediumRecord;
    hardRecord;
    insaneRecord;

    blue = 0x0abff7;
    green = 0x2feb1a;
    orange = 0xebac1a;
    red = 0xd61806;
    purple = 0xd925f5;
    yellow = 0xfff700;
    black = 0x000000;

    constructor()
	{
		super('rapid')
	}

    init(data) {

        // Retrieves records: Gets the value stored in localStorage, or 0 if nothing is found
        this.easyRecord = parseInt(localStorage.getItem('easyRecord')) || 0;
        this.mediumRecord = parseInt(localStorage.getItem('mediumRecord')) || 0;
        this.hardRecord = parseInt(localStorage.getItem('hardRecord')) || 0;
        this.insaneRecord = parseInt(localStorage.getItem('insaneRecord')) || 0;

        // Sets new record if applicable
        if(data.difficulty == 1) {
            if(data.mazesPlayed > this.easyRecord) {
                this.easyRecord = data.mazesPlayed;
                localStorage.setItem('easyRecord', this.easyRecord);
            }
        } else if (data.difficulty == 2) {
            if(data.mazesPlayed > this.mediumRecord) {
                this.mediumRecord = data.mazesPlayed;
                localStorage.setItem('mediumRecord', this.mediumRecord);
            }
        } else if (data.difficulty == 3) {
            if(data.mazesPlayed > this.hardRecord) {
                this.hardRecord = data.mazesPlayed;
                localStorage.setItem('hardRecord', this.hardRecord);
            }
        } else if (data.difficulty == 4) {
            if(data.mazesPlayed > this.insaneRecord) {
                this.insaneRecord = data.mazesPlayed;
                localStorage.setItem('insaneRecord', this.insaneRecord);
            }
        }
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

        var longestStreakEasy = this.add.text(843, 529, this.easyRecord, { fontSize: 40, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var longestStreakMedium = this.add.text(843, 529, this.mediumRecord, { fontSize: 40, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var longestStreakHard = this.add.text(843, 529, this.hardRecord, { fontSize: 40, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);
        var longestStreakInsane = this.add.text(843, 529, this.insaneRecord, { fontSize: 40, color: '#0abff7' }).setOrigin(0, 0).setVisible(false);

        var screen = this.add.rectangle(750, 380, 550, 700);
        screen.setStrokeStyle(5);
        screen.setInteractive();
        screen.on("pointerover", () => {
            screenOutlineFill.setStrokeStyle(5, this.blue);
            home.setTintFill(this.black);
            longestStreak.setVisible(false);
            longestStreakEasy.setVisible(false);
            longestStreakMedium.setVisible(false);
            longestStreakHard.setVisible(false);
            longestStreakInsane.setVisible(false);
         
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
        easyOutline.on('pointerup', () => this.easyButton());
        easyOutline.on("pointerover", () => {
            screenOutlineFill.setStrokeStyle(5, this.green);
            longestStreak.setVisible(true);
            longestStreakEasy.setVisible(true);
      
        });

        var medium = this.add.image(750, 345, 'mediumButton');
        medium.setScale(.55);

        var mediumOutline = this.add.rectangle(750, 345, 192, 42);
        mediumOutline.setInteractive({ useHandCursor: true });
        mediumOutline.on('pointerup', () => this.mediumButton());
        mediumOutline.on("pointerover", () => {
            screenOutlineFill.setStrokeStyle(5, this.orange);
            longestStreak.setVisible(true);
            longestStreakMedium.setVisible(true);
        });

        var hard = this.add.image(750, 410, 'hardButton');
        hard.setScale(.55);

        var hardOutline = this.add.rectangle(750, 410, 108, 42);
        hardOutline.setInteractive({ useHandCursor: true });
        hardOutline.on('pointerup', () => this.hardButton());
        hardOutline.on("pointerover", () => {
            screenOutlineFill.setStrokeStyle(5, this.red);
            longestStreak.setVisible(true);
            longestStreakHard.setVisible(true);
        });

        var insane = this.add.image(750, 475, 'insaneButton');
        insane.setScale(.55);

        var insaneOutline = this.add.rectangle(750, 475, 162, 42);
        insaneOutline.setInteractive({ useHandCursor: true });
        insaneOutline.on('pointerup', () => this.insaneButton());
        insaneOutline.on("pointerover", () => {
            screenOutlineFill.setStrokeStyle(5, this.purple);
            longestStreak.setVisible(true);
            longestStreakInsane.setVisible(true);
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