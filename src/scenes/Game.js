import Phaser from 'phaser';
import Countdown from './Countdown';
import Maze from '/lib/maze';

export default class Game extends Phaser.Scene {

    level;
    countdown;
    stopwatchLabel; 
    countdownLabel;
    ended;
    seconds;
    formattedTime;
    timesPlayed;
    timeRecord;
    timeRecordLabel;
    difficulty;
    countdownTime;
    level0;
    mazeEntranceX;
    mazeEntranceY;
    mazeExitX;
    mazeExitY;
    rapidFire;
    started = false;
    startTime = 0;
    playerRadius = 10;
    playerSpeed = 200;
    scopeSpeed = 50;
    scopeStrokeWidth = 0;
    blue = 0x0abff7;
    green = 0x2feb1a;
    orange = 0xebac1a;
    red = 0xd61806;
    purple = 0xd925f5;
    black = 0x000000;

    RFSumTime;
    RFTimeTaken;
    RFCountdown;
    RFCountdownTime = 60;
    RFCountdownLabel;
    
    scopeTargetShrinkSize = 1800;

    constructor()
	{
		super('game')
	}

    init(data)
    {
        this.difficulty = data.difficulty;
        this.rapidFire = data.rapidFire;
    }

    create(data) {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.rapidFire = data.rapidFire;

        // Take data from the last game to set up the number of times played variable (set it to 0 if there is no incoming data)
        this.timesPlayed = data.timesPlayed || 0;

        // Way to control the countdown time or scope (or rlly anything) based on which button is pushed and thus what the difficulty is
        // (countdown times are just fillers for now, will have to tweak them)
        if (this.difficulty == 0) {
            this.level0 = true;
            this.countdownTime = 10;
        } else {
            this.mazeEntranceX = 680;
            this.mazeEntranceY = 115;
            this.mazeExitX = 740;
            this.mazeExitY = 715;
            this.level0 = false;
            if(this.difficulty == 1) {
                this.countdownTime = 10;
            } else if(this.difficulty == 2) {
                this.countdownTime = 7;
            } else if(this.difficulty == 3) {
                this.countdownTime = 5;
            } else if(this.difficulty == 4) {
                this.countdownTime = 3;
            }
        }

        this.ended = false;

        const mymaze = new Maze(10, 10);
        mymaze.gateway(4, 0);
        mymaze.gateway(5, 9);
        const mazeMap = mymaze.tiles();

        // Need to flip all the 0s and 1s because of the way the algorithm works (Paul has easier way to do this! ask him)
        for (var i = 0; i <= 20; i++) {
            for (var j = 0; j <= 20; j++) {
                if (mazeMap[i][j] == 0) {
                    mazeMap[i][j] = 1;
                } else if (mazeMap[i][j] == 1) {
                    mazeMap[i][j] = 0;
                }
            }
        }

        var level0Tiles = [
            [1, 1, 1, 0, 1, 1, 1], 
            [1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1], 
            [1, 0, 0, 0, 0, 0, 1], 
            [1, 0, 1, 1, 1, 0, 1], 
            [1, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 1]
        ]

        // Make maze tilemap
        const map = this.make.tilemap({ key: 'maze' });
        const tileset = map.addTilesetImage('wallTile', 'wallTile');
        const layer = map.createBlankLayer('maze', tileset, 60, 100);

        if (this.level0) {
            // Level 0
            this.mazeEntranceY = 215;
            this.mazeEntranceX = 710;
            this.mazeExitY = 395;
            this.mazeExitX = 710;

            layer.putTilesAt(level0Tiles, 0, 0);
            layer.setY(200);
            layer.setX(screenCenterX - 105);
            
            // Add arrow (only for level 0)
            this.arrow = this.add.image(this.mazeEntranceX, this.mazeEntranceY - 35, 'arrow');
            this.arrow.rotation = 1.6;
        } else {
            // Regular maze
            layer.putTilesAt(mazeMap, 0, 0);
            layer.setX(screenCenterX - layer.width / 2);
        }

        // Add dotted line at exit (need to make this a more clear image)
        this.dottedLine = this.add.image(this.mazeExitX, this.mazeExitY - 14, 'dottedLine');

        // Add line at the beginning to keep the player from going outside of the maze
        var boundaryLine = this.add.rectangle(this.mazeEntranceX, this.mazeEntranceY - 16, 30, 1, 0xffffff);
        this.physics.add.existing(boundaryLine, true);

        // Create scope
        this.scope = this.add.circle(this.mazeEntranceX, this.mazeEntranceY, 1000);

        // Add arrow key image (not visible unless it's level 0 and game is started)
        this.arrowKeys = this.add.image(1225, screenCenterY, 'arrowKeys').setOrigin(0.5);
        this.arrowKeys.setVisible(false);

        // Create player (same blue as the blue in the maze screen concepts)
        this.player = this.add.circle(this.mazeEntranceX, this.mazeEntranceY, this.playerRadius, this.blue, 1);
        this.physics.add.existing(this.player);
        this.player.body.setCircle(10);

        // Add a rectangle at the location of each tile for collision purposes
        layer.forEachTile(tile => {
            if(tile.index == 1) {
                let tilePos = map.tileToWorldXY(tile.x, tile.y);
                var rectangle = this.add.rectangle(
                    tilePos.x + tile.width / 2,
                    tilePos.y + tile.height / 2,
                    tile.width,
                    tile.height);
                this.physics.add.existing(rectangle, true);
                this.physics.add.collider(this.player, rectangle);
            }
        });

        // Add collisions
        this.physics.add.collider(this.player, layer);
        this.physics.add.collider(this.player, boundaryLine);

        // Set up cursors variable
        this.cursors = this.input.keyboard.createCursorKeys();

        // Set up rapid fire countdown
        if(this.timesPlayed == 0) {
            this.RFSumTime = 0;
            this.timeTaken = 0;
        } else {
            this.RFSumTime = data.sumTime;
            this.timeTaken = Math.ceil(data.timeTaken / 1000);
        }

        if (this.rapidFire) {
            this.RFSumTime = this.RFSumTime + this.timeTaken;
            this.RFCountdownLabel = this.add.text(screenCenterX * 0.25, screenCenterY, '', { fontSize: 80, color: '0x000000' }).setOrigin(0.5);
            this.RFCountdown = new Countdown(this, this.RFCountdownLabel, this.RFCountdownTime - this.RFSumTime);
            this.RFCountdown.start(this.handleRapidFireCountdownFinished.bind(this));
            this.RFCountdown.timerEvent.paused = true;
        }

        // Initialize countdown and stopwatch
        this.countdownLabel = this.add.text(screenCenterX * 1.35, 45, '', { fontSize: 80, color: '0x000000' }).setOrigin(0.5);
        this.textLabel = this.add.text(screenCenterX * 0.85, 45, "Memorize for ", { fontSize: 65, color: '0x000000'}).setOrigin(0.5);
        this.stopwatchLabel = this.add.text(screenCenterX * 1.25, 45, '', { fontSize: 80, color: '0x000000' }).setOrigin(0.5);
        this.countdown = new Countdown(this, this.countdownLabel, this.countdownTime);
		this.countdown.start(this.handleCountdownFinished.bind(this));
        
        // Update time record for normal levels or mazes played for rapid fire game play
        if (!this.level0 && !this.rapidFire) {
            // If this is the first time the game is played
            if (this.timesPlayed == 0)
            {
                this.timeRecord = 1000 * 1000;
                this.timeRecordLabel = this.add.text(screenCenterX * 1.75, 45, '', { fontSize: 50, color: '0x000000'}).setOrigin(0.5);
            }
            else 
            {
                this.timeRecord = data.timeRecord;
                this.formatTimeRecordLabel(this.timeRecord);
            }
        } else if (this.rapidFire) {
            this.timeRecordLabel = this.add.text(screenCenterX * 1.75, 45, '' + this.timesPlayed, { fontSize: 30, color: '0x000000'}).setOrigin(0.5);
            this.timeRecordLabel.setText('Mazes played: ' + this.timesPlayed);
        }

        // home button to get back to titlescene
        var homeButton = this.add.image(screenCenterX * 0.2, 125, 'homeIcon');
        homeButton.setScale(.75);
        var homeOutline = this.add.rectangle(screenCenterX * 0.2, 48, 56, 56); // y offset by 59 px
        homeOutline.setInteractive({ useHandCursor: true });
        homeOutline.setInteractive()
                    .on('pointerdown', () => this.handleHomeButton());

        //this.scale.displaySize.setAspectRatio( width/height );
        //this.scale.refresh();
    }

    handleHomeButton() {
        var thisGame = this;

        var homeTextBox = this.add.rectangle(710, 375, 500, 350, '0xffffff'); // need to change x and y to constants 
        
        homeTextBox.setStrokeStyle(1, '0x000000');
        var homeText = this.add.text(710, 320, "Go back?\nYour progress\nwon't be saved", { fontSize: 50, color: '0x000000'}).setAlign('center').setOrigin(0.5); 

        var yesButton = this.add.text(600, 475, "yes", { fontSize: 50, color: '0x000000'}).setAlign('center').setOrigin(0.5);
        yesButton.setInteractive({ useHandCursor: true });


        var noButton = this.add.text(820, 475, "no", { fontSize: 50, color: '0x000000'}).setAlign('center').setOrigin(0.5);
        noButton.setInteractive({ useHandCursor: true });

            function fun1() {
                thisGame.started = false;
                // expands scope
                thisGame.animateScope();
                thisGame.scopeStrokeWidth = 0;

                // if (this.ended) {
                //     this.timesPlayed = this.timesPlayed + 1;
                // }

                thisGame.scene.start('titleScene');
                // does not handle when a person finishes the maze with a new record and then clicks 'home' instead of 'play again'
            }

            function fun2() {
                homeText.destroy();
                yesButton.destroy();
                noButton.destroy();
                homeTextBox.destroy();
            }
             
        yesButton.setInteractive() 
                    .on('pointerdown', () => fun1());

        noButton.setInteractive() 
                    .on('pointerdown', () => fun2());

    }

    handleRapidFireCountdownFinished() {
        console.log('rapid fire countdown finished function called');
        this.scene.start('levelScene');
    }

    handleCountdownFinished()
	{
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        this.started = true;
        this.startTime = this.game.getTime();

        this.countdown.label.setText('');
        this.textLabel.setText('Go!');
        this.textLabel.setStyle({ fontSize: 100});
	}

    trackPlayer() 
    {
       this.scope.setPosition(this.player.x, this.player.y)
    }

    animateScope()
    {
        var scopeTargetExpandSize = 0;
        // shrink condition
        if (this.scopeStrokeWidth < this.scopeTargetShrinkSize && this.started) {
            this.scopeStrokeWidth = Math.min(this.scopeStrokeWidth + this.scopeSpeed, this.scopeTargetShrinkSize);
            this.scope.setStrokeStyle(this.scopeStrokeWidth, this.blue);

        }
        // expand condition
        else if (this.scopeStrokeWidth > scopeTargetExpandSize && !this.started) {
            this.scopeStrokeWidth = Math.max(this.scopeStrokeWidth - this.scopeSpeed, scopeTargetExpandSize);
            this.scope.setStrokeStyle(this.scopeStrokeWidth, this.blue);
        }
    }

    startGame(body, speed)
    {
        if(this.rapidFire) {
            if(this.RFCountdown.timerEvent) {
                this.RFCountdown.timerEvent.paused = false;
            }
        }

        // Add the arrow keys and get rid of the arrow image
        if (this.level0) {
            this.arrowKeys.setVisible(true);
            this.arrow.setVisible(false);
        }

        // Animate the scope
        this.animateScope();
                    
        // Control the player movement
        if (this.cursors.left.isDown)
        {
            body.setVelocityX(-speed);
            this.trackPlayer();
        }
        else if (this.cursors.right.isDown)
        {
            body.setVelocityX(speed);
            this.trackPlayer();
        }
        else if (this.cursors.up.isDown)
        {
            body.setVelocityY(-speed)
            this.trackPlayer();
        }
        else if (this.cursors.down.isDown)
        {
            body.setVelocityY(speed)
            this.trackPlayer();
        } 
        else 
        {
            body.setVelocity(0, 0)
            this.trackPlayer();
        }

        // Control the stopwatch
        this.milliseconds = this.game.getTime() - this.startTime;
        this.controlStopwatch(this.milliseconds);
    }

    update() 
    {
        const body = this.player.body;

        // x and y represent the position of the middle of the player
        var x = body.position.x + this.playerRadius;
        var y = body.position.y + this.playerRadius;

        if (this.started)
        {
            // Start the game
            this.startGame(body, this.playerSpeed);
        }
        else
        {
            // Player can't move
            body.setVelocity(0, 0);

            // Shake the camera a bit if the user tries to move too early
            if (!this.ended && (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown))
            {
                this.cameras.main.shake(20, 0.002);
            } 
        }

        // Check for maze completion
        if (y >= (this.mazeExitY - 15) && (x >= (this.mazeExitX - 15) && x <= (this.mazeExitX + 15)))
        {
            this.handleWinGame();
        }

        // Handle countdown updating
        this.countdown.update();
        if(this.rapidFire) {
            this.RFCountdown.update();
        }
    }

    controlStopwatch(milliseconds) 
    {

        // Milliseconds to one digit (idk what unit that is)
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
            this.formattedTime =`${minutes}:${partInSeconds}.${partInOneDigitMils}`;
        } else 
        {
            this.formattedTime =`${partInSeconds}.${partInOneDigitMils}`;
        }

        // Sets the stopwatch label
        this.stopwatchLabel.text = this.formattedTime;
    }

    formatTimeRecordLabel(milliseconds)
    {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        // Milliseconds to one digit (idk what unit that is)
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

        // Sets the time record label to formatted time
        this.timeRecordLabel = this.add.text(screenCenterX * 1.75, 45, 'Record ' + formattedTime, { fontSize: 50, color: '0x000000'}).setOrigin(0.5);
    }

    handleWinGame() 
    {
        // Handle booleans
        this.started = false;
        this.ended = true;

        // expands scope
        this.animateScope();

        if (this.rapidFire) {
            // pause for a sec? have something happen between mazes... something visual. but not something where you have to click on,
            // cuz it should feel quick and rushed and stuff!! right now i'm just animating the scope back out
            this.RFCountdown.timerEvent.paused = true;
            this.scene.restart({ rapidFire: true, sumTime: this.RFSumTime, timeTaken: this.milliseconds, timesPlayed: this.timesPlayed + 1 });
        } else {
            // Normal / old stuff

            // Get rid of "Go!" and countdown label
            this.textLabel.setText('');
            this.countdown.label.setText('');

            // Update time record
            if (this.milliseconds < this.timeRecord) {
                this.timeRecord = this.milliseconds;
                this.timeRecordLabel.text = 'Record ' + this.formattedTime;            
            }

            // Level 0
            if (this.level0) { 
                this.arrowKeys.setVisible(false);
                this.stopwatchLabel.setVisible(false);
                const toLevelsButton = this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 2, 
                                                    this.cameras.main.worldView.y + this.cameras.main.height / 2, 
                                                    'Got it!', 
                                                    { fontSize: 60, fill: '#0abff7' }).setOrigin(0.5);
                toLevelsButton.setInteractive()
                            .on('pointerdown', () => this.scene.start('levelScene')); 
            // Not Level 0        
            } else {
                // moves time to center of screen
                this.stopwatchLabel.setPosition(this.cameras.main.worldView.x + this.cameras.main.width / 2, 300);
                this.stopwatchLabel.setColor('#0abff7');

                // button with "Play Again" that resets scene 
                const resetButton = this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 2, 400, 'Play Again', { fontSize: 60, fill: '#0abff7' }).setOrigin(0.5);
                resetButton.setInteractive()
                            .on('pointerdown', () => this.scene.restart({ timeRecord: this.timeRecord, timesPlayed: this.timesPlayed + 1 })); 

                // button with "Next Level" that moves to next level (right now it only works up to level 4 / insane level)
                const nextLevelButton = this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 2, 500, 'Next Level', { fontSize: 60, fill: '#0abff7' }).setOrigin(0.5);
                nextLevelButton.setInteractive()
                            .on('pointerdown', () => this.scene.start('game', {difficulty: this.difficulty + 1}));
            }
        }


    }
}