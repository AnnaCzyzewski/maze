import Phaser from 'phaser';
import Countdown from './Countdown';
import Levels from './Levels';
import Maze from '/lib/maze';
import { getRecordForLevel } from '../RecordTracker';
import { updateRecordForLevel, updateRecordForRapidFire } from '../RecordTracker';

export default class Game extends Phaser.Scene {

    level;
    countdown;
    stopwatchLabel; 
    countdownLabel;
    ended;
    seconds;
    formattedTime;
    timesPlayed;
    timeRecordLabel;
    timeRecordImage;
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
    playerSpeed;
    scopeSpeed = 50;
    scopeStrokeWidth = 0;

    color;
    blue = 0x0abff7;
    green = 0x2feb1a;
    orange = 0xebac1a;
    red = 0xd61806;
    purple = 0xd925f5;
    yellow = 0xfff700;
    black = 0x000000;
    pauseTime = 0;

    RFTimesPlayed;
    RFSumTime;
    RFTimeTaken;
    RFCountdown;
    RFCountdownTime;
    RFCountdownLabel;

    homeOutline;
    homeButton;

    skipCountdownOutline;
    skipCountdownButton;

    mazeWidth;
    mazeHeight;
    mazeJSON;
    mazeTile;
    tileSize;
    finishLineImage;

    timeMultiplier;
    flippedMazeMap;
    route;

    levelsData;
    
    scopeTargetShrinkSize;

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

        this.started = false;
        this.ended = false;
    
        this.rapidFire = data.rapidFire;

        // Take data from the last game to set up the number of times played variable (set it to 0 if there is no incoming data)
        this.timesPlayed = data.timesPlayed || 0;

        if(this.rapidFire) {
            this.RFTimesPlayed = data.RFTimesPlayed || 0;
        }

        this.level = data.level;

        if(this.level != 0 && !this.rapidFire) {
            var levelsObject = new Levels(this.level);
            levelsObject.setData();
            this.levelsData = levelsObject.data;
            this.scopeTargetShrinkSize = levelsObject.scopeSize;
            this.countdownTime = levelsObject.countdownTime;
        } else if (this.rapidFire) {
            this.scopeTargetShrinkSize = 1800;
        }

        if(this.level == 0) {
            this.difficulty = 0;
        } else if(this.level > 0 & this.level < 4) {
            this.difficulty = 1;
        } else if(this.level > 3 & this.level < 7) {
            this.difficulty = 2;
        } else if(this.level > 6 & this.level < 10) {
            this.difficulty = 3;
        } else if(this.level > 9 & this.level < 13) {
            this.difficulty = 4;
        }

        if(this.difficulty == 0) {
            this.playerSpeed = 200;
            this.countdownTime = 10;
            this.scopeTargetShrinkSize = 1800;
            this.color = this.blue;
            this.playerRadius = 10;
            this.mazeJSON = 'maze2';
            this.mazeTile = 'wallTile2';
            this.finishLineImage = 'finishLine2';
        } else if(this.difficulty == 1) {
            this.RFCountdownTime = 45;
            this.playerSpeed = 246.67;
            this.color = this.green;
            this.playerRadius = 12.3;
            this.mazeWidth = 8;
            this.mazeHeight = 8;
            this.mazeJSON = 'maze1';
            this.mazeTile = 'wallTile1';
            this.finishLineImage = 'finishLine1';
        } else if(this.difficulty == 2) {
            this.RFCountdownTime = 60;
            this.playerSpeed = 200;
            this.color = this.orange;
            this.playerRadius = 10;
            this.mazeWidth = 10;
            this.mazeHeight = 10;
            this.mazeJSON = 'maze2';
            this.mazeTile = 'wallTile2';
            this.finishLineImage = 'finishLine2';
        } else if(this.difficulty == 3) {
            this.RFCountdownTime = 75;
            this.playerSpeed = 166.67;
            this.color = this.red;
            this.playerRadius = 8.3;
            this.mazeWidth = 12;
            this.mazeHeight = 12;
            this.mazeJSON = 'maze3';
            this.mazeTile = 'wallTile3';
            this.finishLineImage = 'finishLine3';
        } else if(this.difficulty == 4) {
            this.RFCountdownTime = 90;
            this.playerSpeed = 140;
            this.color = this.purple;
            this.playerRadius = 7;
            this.mazeWidth = 14;
            this.mazeHeight = 14;
            this.mazeJSON = 'maze4';
            this.mazeTile = 'wallTile4';
            this.finishLineImage = 'finishLine4';
        }

        this.tileSize = Math.floor(630 / (this.mazeWidth * 2 + 1));

        if(!this.difficulty == 0) {
            const mymaze = new Maze(this.mazeWidth, this.mazeHeight);
            mymaze.gateway(this.mazeWidth / 2 - 1, 0);
            mymaze.gateway(this.mazeWidth / 2, this.mazeHeight - 1);
            const mazeMap = mymaze.tiles();
            this.route = mymaze.getRoute(mazeMap, this.mazeWidth / 2 - 1, 0, this.mazeWidth / 2, this.mazeHeight - 1);

            this.flippedMazeMap  = mazeMap.map(function (nested) {
                return nested.map(function (element) {
                    if (element == 0) {
                        return 1;
                    } else if (element == 1) {
                        return 0;
                    }
                });
            });

            this.timeMultiplier = 0.012195 * this.route.length + 0.17074;
        }

        // Make maze tilemap
        const map = this.make.tilemap({ key: this.mazeJSON });
        const tileset = map.addTilesetImage(this.mazeTile, this.mazeTile);
        const layer = map.createBlankLayer(this.mazeJSON, tileset, 0, 100);

        // Way to control things based on which button is pushed and thus what the difficulty is
        if (this.difficulty != 0) {
            this.mazeEntranceX = screenCenterX - layer.width / 2 + this.tileSize * (this.mazeWidth - 0.5);
            this.mazeExitX = screenCenterX - layer.width / 2 + this.tileSize * (this.mazeWidth + 1.5);
            this.mazeEntranceY = 100 + this.tileSize / 2;
            this.mazeExitY = 100 + this.tileSize * this.mazeWidth * 2 + this.tileSize / 2;
            if(this.rapidFire) {
                if(this.difficulty == 1) {
                    this.countdownTime = Math.ceil(10 * this.timeMultiplier);
                } else if(this.difficulty == 2) {
                    this.countdownTime = Math.ceil(10 * this.timeMultiplier);
                } else if(this.difficulty == 3) {
                    this.countdownTime = Math.ceil(10 * this.timeMultiplier);
                } else if(this.difficulty == 4) {
                    this.countdownTime = Math.ceil(10 * this.timeMultiplier);
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

        if (this.difficulty == 0) {
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
            if(this.rapidFire) {
                // Random maze
                layer.putTilesAt(this.flippedMazeMap, 0, 0);
                layer.setX(screenCenterX - layer.width / 2);
            } else {
                layer.putTilesAt(this.levelsData, 0, 0);
                layer.setX(screenCenterX - layer.width / 2);
            }
        }

        // Add finish line image at exit (idk if I like this one either but we can change it)
        this.finishLine = this.add.image(this.mazeExitX, this.mazeExitY, this.finishLineImage);

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
        this.player.body.setCircle(this.playerRadius);

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
        if(this.rapidFire) {
            if(this.timesPlayed == 0) {
                this.RFSumTime = 0;
                this.timeTaken = 0;
            } else {
                this.RFSumTime = data.sumTime;
                this.timeTaken = Math.ceil(data.timeTaken / 1000);
            }
        }

        // More setting up rapid fire countdown
        if (this.rapidFire) {
            this.RFSumTime = this.RFSumTime + this.timeTaken;
            this.RFCountdownLabel = this.add.text(screenCenterX * 0.25, screenCenterY, '', { fontSize: 80, color: '0x000000' }).setOrigin(0.5);
            this.RFCountdown = new Countdown(this, this.RFCountdownLabel, this.RFCountdownTime - this.RFSumTime);
            this.RFCountdown.start(this.handleRapidFireCountdownFinished.bind(this));
            this.RFCountdown.timerEvent.paused = true;
        }

        // Initialize countdown and stopwatch
        if(this.difficulty == 0) {
            this.countdownLabel = this.add.text(screenCenterX * 1.35, 85, '', { fontSize: 80, color: '0x000000' }).setOrigin(0.5);
            this.textLabel = this.add.image(screenCenterX * 0.85, 85, 'memorize').setOrigin(0.5).setScale(1.1);
            this.textLabel.setTintFill(this.blue);
        } else {
            this.countdownLabel = this.add.text(screenCenterX, 45, '', { fontSize: 80, color: '0x000000' }).setOrigin(0.5);
        }

        if(this.difficulty == 0) {
            this.stopwatchLabel = this.add.text(screenCenterX * 1.15, 85, '', { fontSize: 80, color: '0x000000' }).setOrigin(0.5);
        } else {
            this.stopwatchLabel = this.add.text(screenCenterX, 45, '', { fontSize: 80, color: '0x000000' }).setOrigin(0.5);
        }

        this.countdown = new Countdown(this, this.countdownLabel, this.countdownTime);
		this.countdown.start(this.handleCountdownFinished.bind(this));

        // Create time record label and set its text
        this.timeRecordLabel = this.add.text(screenCenterX * 1.65, 22, '', { fontSize: 50, color: '0x000000'});
        if(!this.difficulty == 0 && (this.timesPlayed != 0 || getRecordForLevel(this.level) != null)) {
            if(this.rapidFire) {
                // add image with "mazes played: "
                this.timeRecordImage = this.add.image(screenCenterX * 1.5, 45, 'mazesPlayed').setOrigin(0.5).setScale(0.65);
                this.timeRecordLabel.setPosition(screenCenterX * 1.80, 22);
                this.timeRecordLabel.setText(
                    '' + this.timesPlayed);
            } else {
                // add image with "record:"
                this.timeRecordImage = this.add.image(screenCenterX * 1.48, 45, 'recordText').setOrigin(0.5).setScale(0.70);
                this.timeRecordLabel.setText(
                    '' + this.formatTime(getRecordForLevel(this.level)));
            }
        }

        this.homeColorBox = this.add.rectangle(screenCenterX * 0.2, 48, 85, 85);
        this.homeColorBox.setInteractive();
        this.homeColorBox.on("pointerover", () => {
            this.homeButton.setTintFill(this.black);
        });

        // Add home button to get back to titlescene
        this.homeButton = this.add.image(screenCenterX * 0.2, 125, 'homeIcon');
        this.homeButton.setScale(.75);
        this.homeOutline = this.add.rectangle(screenCenterX * 0.2, 48, 56, 56); // y offset by 59 px
        this.homeOutline.setInteractive({ useHandCursor: true });
        this.homeOutline.on('pointerup', () => this.handleHomeButton());
        this.homeOutline.on("pointerover", () => {
            this.homeButton.setTintFill(this.yellow);
        });

        // Add button that can skip the countdown
        if(!this.difficulty == 0) {

            this.skipColorBox = this.add.rectangle(screenCenterX - 250, 48, 85, 85);
            this.skipColorBox.setInteractive();
            this.skipColorBox.on("pointerover", () => {
                this.skipCountdownButton.setTintFill(this.black);
                this.skipCountdownOutline.setStrokeStyle(2.7, this.black);
            });   

            this.skipCountdownButton = this.add.image(screenCenterX - 250, 48, "skipButton").setOrigin(0.5).setScale(0.32);
            this.skipCountdownOutline = this.add.rectangle(screenCenterX - 250, 48, 56, 56);
            this.skipCountdownOutline.setStrokeStyle(2.7);
            this.skipCountdownOutline.setInteractive({ useHandCursor: true });
         

            this.skipCountdownOutline.on("pointerover", () => {
                this.skipCountdownButton.setTintFill(this.yellow);
                this.skipCountdownOutline.setStrokeStyle(2.7, this.yellow);
            });
            this.skipCountdownOutline.on('pointerup', () => {
                this.countdown.stop();
                this.skipCountdownOutline.destroy();
                this.skipCountdownButton.destroy();
                this.skipColorBox.destroy();
                this.handleCountdownFinished();
                
            }
            );
        }
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
        homeTextBox.setInteractive(); 
        homeTextBox.on("pointerover", () => {
            yesButton.setTintFill(this.black);
            noButton.setTintFill(this.black);
            yesButton.setScale(.75);
            noButton.setScale(.75);
        });
        var homeTextBoxOutline = this.add.rectangle(710, 365, 510, 335);
        homeTextBoxOutline.setStrokeStyle(2);

        var homeTextBoxFill = this.add.rectangle(710, 365, 517, 342);
        homeTextBoxFill.setStrokeStyle(5, this.blue);

        homeTextBox.setStrokeStyle(5, '0x000000');    
        var homeText = this.add.image(710, 400, "goHomePrompt").setOrigin(0.5).setScale(0.75);
        homeText.setTintFill(this.blue);

        var yesButton = this.add.image(600, 475, "yesButton").setOrigin(0.5).setScale(0.75);
        var yesOutline = this.add.rectangle(600, 475, 125, 60);
        yesOutline.setInteractive({ useHandCursor: true });
        yesOutline.on("pointerover", () => {
            yesButton.setTintFill(this.yellow);
            yesButton.setScale(.8);
        });


        var noButton = this.add.image(820, 475, "noButton").setOrigin(0.5).setScale(0.75);
        var noOutline = this.add.rectangle(820, 475, 90, 60);
        noOutline.setInteractive({ useHandCursor: true });
        noOutline.on("pointerover", () => {
            noButton.setTintFill(this.yellow);
            noButton.setScale(.8);
        });

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
            homeTextBoxOutline.destroy();
            homeTextBoxFill.destroy();
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
                    .on('pointerup', () => fun1());

        noOutline.setInteractive() 
                    .on('pointerup', () => fun2());
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

    handleRapidFireCountdownFinished() {
        updateRecordForRapidFire(this.difficulty, this.timesPlayed);
        if (this.difficulty != 0 && this.skipCountdownButton) {
            this.skipCountdownOutline.destroy();
            this.skipCountdownButton.destroy();
            this.skipColorBox.destroy();
        }
        if (this.RFCountdown.label.text == "0") {
            this.handleRapidFireWinGame();
        }
    }

    handleCountdownFinished() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        this.started = true;
        this.startTime = this.game.getTime();
        this.pauseTime = 0;

        this.countdown.label.setText('');

        if(this.difficulty == 0) {
            this.textLabel.destroy();
            this.textLabel = this.add.image(screenCenterX * 0.87, 83, 'goText').setOrigin(0.5).setScale(1.1);
        }
        else if (this.difficulty != 0 && this.skipCountdownButton) {
            this.skipCountdownOutline.destroy();
            this.skipCountdownButton.destroy();
            this.skipColorBox.destroy();
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
        if (this.difficulty == 0) {
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
        this.formattedTime = this.formatTime(this.milliseconds);
        this.stopwatchLabel.text = this.formattedTime;
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
                (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown))
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
            if(this.difficulty == 0) {
                this.textLabel.destroy();
            }
            this.countdown.label.setText('');

            this.homeOutline.destroy();
            this.homeButton.destroy();            
           
            if (!this.difficulty == 0) {
                updateRecordForLevel(this.level, this.milliseconds);

                if (this.level != 12) {
                    // moves time to center of screen
                    var rectanglePopUp = this.add.rectangle(710, 350, 450, 500, '0xffffff')
                    rectanglePopUp.setStrokeStyle(5, '0x000000');
                    var rectanglePopUpOutline = this.add.rectangle(710, 350, 435, 485);
                    rectanglePopUpOutline.setStrokeStyle(2);
                    var rectanglePopUpFill = this.add.rectangle(710, 350, 442, 492);
                    rectanglePopUpFill.setStrokeStyle(5, this.blue);

                    var stopwatchlabel = this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 2, 225, "", { fontSize: 80, color: '#0abff7'});
                    stopwatchlabel.text = this.stopwatchLabel.text;
                    this.stopwatchLabel.destroy();
                    stopwatchlabel.setOrigin(0.5);    

                    // button with "Next Level" that moves to next level
                    const nextLevelButton = this.add.image(this.cameras.main.worldView.x + this.cameras.main.width / 2, 350, 'nextLevelButton').setOrigin(0.5).setScale(.75);
                    var nextOutline = this.add.rectangle(this.cameras.main.worldView.x + this.cameras.main.width / 2, 350, 360, 60);                     
                }
                else {
                    var rectanglePopUp = this.add.rectangle(710, 350, 665, 500, '0xffffff');
                    rectanglePopUp.setStrokeStyle(5, '0x000000');

                    var rectanglePopUpOutline = this.add.rectangle(710, 350, 650, 485);
                    rectanglePopUpOutline.setStrokeStyle(2);
            
                    var rectanglePopUpFill = this.add.rectangle(710, 350, 657, 492);
                    rectanglePopUpFill.setStrokeStyle(5, this.blue);
            
                    var winText = this.add.image(710, 200, 'winGameMessage').setOrigin(0.5).setScale(0.75);  

                    var stopwatchlabel = this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 2, 330, "", { fontSize: 80, color: '#0abff7'});
                    stopwatchlabel.text = this.stopwatchLabel.text;
                    this.stopwatchLabel.destroy();
                    stopwatchlabel.setOrigin(0.5); 
                
                }
                // button with "Play Again" that resets scene
                const resetButton = this.add.image(this.cameras.main.worldView.x + this.cameras.main.width / 2, 450, 'playAgainButton').setOrigin(0.5).setScale(.75);
                var resetOutline = this.add.rectangle(this.cameras.main.worldView.x + this.cameras.main.width / 2, 450, 340, 60); 

                var goHome = this.add.image(this.cameras.main.worldView.x + this.cameras.main.width / 2, 530, 'goHomeButton').setOrigin(0.5).setScale(0.65);
                var goHomeOutline = this.add.rectangle(this.cameras.main.worldView.x + this.cameras.main.width / 2, 530, 240, 35);                 
                
                resetOutline.setInteractive({ useHandCursor: true });
                resetOutline.setInteractive()
                            .on('pointerup', () => this.scene.restart({ level: this.level, timesPlayed: this.timesPlayed + 1 }));       
            }
            // if you are on level 0
            else if (this.difficulty == 0) {
                // next level button
                var rectanglePopUp = this.add.rectangle(710, 350, 450, 350, '0xffffff')
                rectanglePopUp.setStrokeStyle(5, '0x000000');
                var rectanglePopUpOutline = this.add.rectangle(710, 350, 435, 335);
                rectanglePopUpOutline.setStrokeStyle(2);
                var rectanglePopUpFill = this.add.rectangle(710, 350, 442, 342);
                rectanglePopUpFill.setStrokeStyle(5, this.blue);

                const nextLevelButton = this.add.image(this.cameras.main.worldView.x + this.cameras.main.width / 2, 290, 'nextLevelButton').setOrigin(0.5).setScale(.75);
                var nextOutline = this.add.rectangle(this.cameras.main.worldView.x + this.cameras.main.width / 2, 290, 360, 60);         

                this.arrowKeys.setVisible(false);
                this.stopwatchLabel.destroy(); 

                var goHome = this.add.image(this.cameras.main.worldView.x + this.cameras.main.width / 2, 430, 'goHomeButton').setOrigin(0.5).setScale(0.65);
                var goHomeOutline = this.add.rectangle(this.cameras.main.worldView.x + this.cameras.main.width / 2, 430, 232, 52);                
            }

            if (nextOutline) {
                nextOutline.setInteractive({ useHandCursor: true });
                nextOutline.setInteractive()
                            .on('pointerup', () => fun2(this));                 
            }

            
            function fun2(thisGame) {
                // if you are on level 0
                if (thisGame.difficulty == 0) {
                    thisGame.scene.start('game', {level: thisGame.level = 1});
                }
                // if you are on any other level 
                else {
                    thisGame.scene.start('game', {level: thisGame.level + 1});
                }
            }

            goHomeOutline.setInteractive({ useHandCursor: true });

            function fun1(thisGame) {
                thisGame.scopeStrokeWidth = 0;
                thisGame.scene.start('titleScene');
            }
                        
            goHomeOutline.setInteractive()
                    .on('pointerup', () => fun1(this));         
        }
    }

    handleRapidFireWinGame() {

        var thisGame = this;

        this.started = false;
        this.ended = true;

        this.animateScope(); 
        this.scope.destroy(); 

        this.RFCountdownLabel.setText("");
        this.stopwatchLabel.destroy();

        this.homeOutline.destroy();
        this.homeButton.destroy();            
       
        var rectanglePopUp = this.add.rectangle(710, 350, 665, 500, '0xffffff');
        rectanglePopUp.setStrokeStyle(5, '0x000000');

        var rectanglePopUpOutline = this.add.rectangle(710, 350, 650, 485);
        rectanglePopUpOutline.setStrokeStyle(2);

        var rectanglePopUpFill = this.add.rectangle(710, 350, 657, 492);
        rectanglePopUpFill.setStrokeStyle(5, this.blue);

        var winText = this.add.image(710, 225, 'timesUp').setOrigin(0.5).setScale(1.35);

        if (timeRecordLabel) {
            this.timeRecordImage.destroy();
            this.timeRecordLabel.destroy(); 
        }
        
        var timeRecordImage = this.add.image(685, 350, 'mazesPlayed').setOrigin(0.5).setScale(0.70);
        var timeRecordLabel = this.add.text(915, 327, "" + this.timesPlayed,{ fontSize: 55, color: '0x000000'});            

        const resetButton = this.add.image(710, 450, 'playAgainButton').setOrigin(0.5).setScale(.75);
        var resetOutline = this.add.rectangle(710, 450, 340, 60); 

        var goHome = this.add.image(710, 530, 'goHomeButton').setOrigin(0.5).setScale(0.65);
        var goHomeOutline = this.add.rectangle(710, 530, 240, 35);                 
        
        goHomeOutline.setInteractive({ useHandCursor: true });

        function fun1(thisGame) {
            thisGame.scopeStrokeWidth = 0;
            thisGame.scene.start('titleScene');
        }

        function fun2(thisGame) {
            thisGame.scene.restart( {rapidFire: true, difficulty: thisGame.difficulty, RFTimesPlayed: thisGame.RFTimesPlayed + 1});
        }

        resetOutline.setInteractive({ useHandCursor: true });
        resetOutline.setInteractive()
                    .on('pointerup', () => fun2(this));  

        goHomeOutline.setInteractive()
                .on('pointerup', () => fun1(this));       
    }
}