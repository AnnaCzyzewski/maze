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

    color;
    blue = 0x0abff7;
    green = 0x2feb1a;
    orange = 0xebac1a;
    red = 0xd61806;
    purple = 0xd925f5;
    black = 0x000000;
    pauseTime = 0;

    RFTimesPlayedEasy;
    RFTimesPlayedMedium;
    RFTimesPlayedHard;
    RFTimesPlayedInsane;
    RFSumTime;
    RFTimeTaken;
    RFCountdown;
    RFCountdownTime = 60;
    RFCountdownLabel;
    
    scopeTargetShrinkSize = 1800;

    constructor() {
		super('game')
	}

    init(data) {
        this.difficulty = data.difficulty;
        this.rapidFire = data.rapidFire;
    }

    create(data) {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.scopeStrokeWidth = 0;
    
        // Take data from the last game to set up the number of times played variable (set it to 0 if there is no incoming data)
        this.timesPlayed = data.timesPlayed || 0;
        this.rapidFire = data.rapidFire;
        this.difficulty = data.difficulty;

        this.started = false;
        this.ended = false;

        const mymaze = new Maze(10, 10);
        mymaze.gateway(4, 0);
        mymaze.gateway(5, 9);
        const mazeMap = mymaze.tiles();
        const route = mymaze.getRoute(mazeMap, 4, 0, 5, 9);

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

        var timeMultiplier = 0.012195 * route.length + 0.17074;

        // Way to control the countdown time or scope (or rlly anything) based on which button is pushed and thus what the difficulty is
        // (countdown times are just fillers for now, will have to tweak them)
        if (this.difficulty == 0) {
            this.level0 = true;
            this.countdownTime = 10;
            this.color = this.blue;
        } else {
            this.mazeEntranceX = 680;
            this.mazeEntranceY = 115;
            this.mazeExitX = 740;
            this.mazeExitY = 715;
            this.level0 = false;
            if(this.difficulty == 1) {
                this.countdownTime = Math.ceil(10 * timeMultiplier);
                this.color = this.green;
            } else if(this.difficulty == 2) {
                this.countdownTime = Math.ceil(7 * timeMultiplier);
                this.color = this.orange;
            } else if(this.difficulty == 3) {
                this.countdownTime = Math.ceil(5 * timeMultiplier);
                this.color = this.red;
            } else if(this.difficulty == 4) {
                this.countdownTime = Math.ceil(3 * timeMultiplier);
                this.color = this.purple;
            }
        }

        // Add white over scope
        // var rec1 = this.add.rectangle(0, 0, screenCenterX - layer.width / 2, 750, 0xffffff).setOrigin(0, 0);
        // var rec2 = this.add.rectangle(screenCenterX - layer.width / 2, 0, layer.width, 100, 0xffffff).setOrigin(0, 0);
        // var rec3 = this.add.rectangle(screenCenterX + layer.width / 2, 0, screenCenterX - layer.width / 2, 750, 0xffffff).setOrigin(0, 0);
        // var rec4 = this.add.rectangle(screenCenterX - layer.width / 2, layer.height + 100, layer.width, 750 - (100 + layer.height), 0xffffff).setOrigin(0,0);
        
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
        this.player = this.add.circle(this.mazeEntranceX, this.mazeEntranceY, this.playerRadius, this.color, 1);
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
        if(this.level0) {
            this.countdownLabel = this.add.text(screenCenterX * 1.35, 45, '', { fontSize: 80, color: '0x000000' }).setOrigin(0.5);
            this.textLabel = this.add.text(screenCenterX * 0.85, 45, "Memorize for ", { fontSize: 65, color: '0x000000'}).setOrigin(0.5);
        } else {
            this.countdownLabel = this.add.text(screenCenterX, 45, '', { fontSize: 80, color: '0x000000' }).setOrigin(0.5);
        }

        this.stopwatchLabel = this.add.text(screenCenterX * 1.25, 45, '', { fontSize: 80, color: '0x000000' }).setOrigin(0.5);
        this.countdown = new Countdown(this, this.countdownLabel, this.countdownTime);
		this.countdown.start(this.handleCountdownFinished.bind(this));
        
        // Update time record for normal levels or mazes played for rapid fire game play
        if (!this.rapidFire) {
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

        // if during countdown phase, set countdown as paused 
        if (!thisGame.started && !thisGame.ended) {
            thisGame.countdown.timerEvent.paused = true;
        }
        // if during game phase, pauses game and gets a variable with the time at the beginning of the pause 
        else if (thisGame.started && !thisGame.ended) {
            thisGame.started = false;
            var stopTime = thisGame.game.getTime();
            if(thisGame.rapidFire) {
                thisGame.RFCountdown.timerEvent.paused = true;
            }
        // button doesn't do anything if the game is ended 
        } else if (thisGame.ended) {
            return
        }

        var homeTextBox = this.add.rectangle(710, 365, 525, 350, '0xffffff'); // need to change x and y to constants 
        
        homeTextBox.setStrokeStyle(1, '0x000000');    
        var homeText = this.add.image(710, 400, "goHomePrompt").setOrigin(0.5).setScale(0.75);

        var yesButton = this.add.image(600, 475, "yesButton").setOrigin(0.5).setScale(0.75);
        var yesOutline = this.add.rectangle(600, 475, 125, 60);
        yesOutline.setInteractive({ useHandCursor: true });

        
        var noButton = this.add.image(820, 475, "noButton").setOrigin(0.5).setScale(0.75);
        var noOutline = this.add.rectangle(820, 475, 90, 60);
        noOutline.setInteractive({ useHandCursor: true });

            function fun1() {
                // expands scope
                thisGame.animateScope();
                thisGame.scopeStrokeWidth = 0;
                thisGame.scene.start('titleScene');
            }

            function fun2() {
                homeText.destroy();
                yesButton.destroy();
                yesOutline.destroy();
                noButton.destroy();
                noOutline.destroy();
                homeTextBox.destroy();
                // If in the countdown phase, resets pause boolean 
                if (thisGame.countdown.timerEvent) {
                    thisGame.countdown.timerEvent.paused = false;
                }
                // If in game phase, gets elapsed time and adds it to the pause time variables 
                else {                 
                    thisGame.started = true;
                    var newTime = thisGame.game.getTime() - stopTime;
                    thisGame.pauseTime += newTime; 
                    if (thisGame.rapidFire) {
                        thisGame.RFCountdown.timerEvent.paused = false;
                    }
                }
            }
             
        yesOutline.setInteractive() 
                    .on('pointerdown', () => fun1());

        noOutline.setInteractive() 
                    .on('pointerdown', () => fun2());
    }

    handleRapidFireCountdownFinished() {
        this.scene.start('rapid', { difficulty: this.difficulty, mazesPlayed: this.timesPlayed });
    }

    handleCountdownFinished() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        this.started = true;
        this.startTime = this.game.getTime();
        this.pauseTime = 0;

        this.countdown.label.setText('');

        if(this.level0) {
            this.textLabel.setText('Go!');
            this.textLabel.setStyle({ fontSize: 100});
        }
	}

    trackPlayer() {
       this.scope.setPosition(this.player.x, this.player.y)
    }

    animateScope() {
        var scopeTargetExpandSize = 0;
        // shrink condition
        if (this.scopeStrokeWidth < this.scopeTargetShrinkSize && this.started) {
            this.scopeStrokeWidth = Math.min(this.scopeStrokeWidth + this.scopeSpeed, this.scopeTargetShrinkSize);
            this.scope.setStrokeStyle(this.scopeStrokeWidth, this.color);
        }
        // expand condition
        else if (this.scopeStrokeWidth > scopeTargetExpandSize && !this.started) {
            this.scopeStrokeWidth = Math.max(this.scopeStrokeWidth - this.scopeSpeed, scopeTargetExpandSize);
            this.scope.setStrokeStyle(this.scopeStrokeWidth, this.color);
        }
    }

    startGame(body, speed) {
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
        this.milliseconds = this.game.getTime() - this.startTime - this.pauseTime;
        this.controlStopwatch(this.milliseconds);
    }

    update() {
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
            if (!this.ended 
                &&
                (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown)
                &&
                ((this.rapidFire && this.timesPlayed == 0) || (!this.rapidFire)))
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

    controlStopwatch(milliseconds) {

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

    formatTimeRecordLabel(milliseconds) {
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

    handleWinGame() {
        // Handle booleans
        this.started = false;
        this.ended = true;

        // expands scope
        this.animateScope();

        if (this.rapidFire) {
            this.RFCountdown.timerEvent.paused = true;
            if(this.scopeStrokeWidth == 0) {
                this.scene.restart({ rapidFire: true, difficulty: this.difficulty, sumTime: this.RFSumTime, timeTaken: this.milliseconds, timesPlayed: this.timesPlayed + 1 });
            }
        } else {
            // Normal level stuff

            // Get rid of "Go!" and countdown label
            if(this.level0) {
                this.textLabel.setText('');
            }
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
                this.timeRecordLabel.setText("");
                const toTitleButton = this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 2, 
                                                    this.cameras.main.worldView.y + this.cameras.main.height / 2 + 100, 
                                                    'Got it!', 
                                                    { fontSize: 60, fill: '#0abff7' }).setOrigin(0.5);
                toTitleButton.setInteractive()
                            .on('pointerdown', () => this.scene.start('titleScene')); 
            // Not Level 0        
            } else {
                var rectanglePopUp = this.add.rectangle(710, 350, 450, 500, '0xffffff')
                rectanglePopUp.setStrokeStyle(5, '0x000000');

                // moves time to center of screen
                // this.stopwatchLabel.setPosition(this.cameras.main.worldView.x + this.cameras.main.width / 2, 300);
                var stopwatchlabel = this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 2, 250, "", { fontSize: 80, color: '#0abff7'});
                stopwatchlabel.text = this.stopwatchLabel.text;
                this.stopwatchLabel.destroy();
                stopwatchlabel.setOrigin(0.5);

                // when two buttons are made, the second one is the only one that shows
                // when one button is made, the button shows 
                // when three buttons are made, only the second one shows 

                // button with "Next Level" that moves to next level (right now it only works up to level 4 / insane level)
                const nextLevelButton = this.add.image(this.cameras.main.worldView.x + this.cameras.main.width / 2, 500, 'nextLevelButton').setOrigin(0.5).setScale(.75);
                var nextOutline = this.add.rectangle(this.cameras.main.worldView.x + this.cameras.main.width / 2, 500, 360, 60);  
                nextOutline.setInteractive({ useHandCursor: true });
                nextOutline.setInteractive()
                            .on('pointerdown', () => this.scene.start('game', {difficulty: this.difficulty + 1}));
                
                // button with "Play Again" that resets scene 
                const resetButton = this.add.image(this.cameras.main.worldView.x + this.cameras.main.width / 2, 400, 'playAgainButton').setOrigin(0.5).setScale(.75);
                var resetOutline = this.add.rectangle(this.cameras.main.worldView.x + this.cameras.main.width / 2, 400, 393, 60); 
                resetOutline.setInteractive({ useHandCursor: true });
                resetOutline.setInteractive()
                            .on('pointerdown', () => this.scene.restart({ timeRecord: this.timeRecord, timesPlayed: this.timesPlayed + 1 }));            
            }
        }
    }
}