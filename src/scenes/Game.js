import Phaser from 'phaser';
import Countdown from './Countdown';

// The example this was taken from was csv map in phaser examples. The 
// directory in examples is public/tilemap/csv map.js

// As a note: the tiles are 30x30 px, have indices of 0 and 1. The current 
// csv maze is 25 by 25 tiles, 750 pixels by 750. 

export default class Game extends Phaser.Scene
{
	countdown;
    stopwatchLabel;
    started = false;
    ended;
    startTime = 0;
    seconds;
    formattedTime;
    timesPlayed;
    timeRecord;
    timeRecordLabel;
    mazeEntranceX = 680;
    mazeEntranceY = 115;
    mazeExitX = 740;
    mazeExitY = 715;
    playerRadius = 10;
    countdownTime = 10;
    playerSpeed = 200;
    scopeSpeed = 50;
    scopeTargetShrinkSize = 1800;
    scopeStrokeWidth = 0;
    blue = 0x0abff7;

    constructor()
	{
		super('game')
	}

    create(data)
    {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.ended = false;

        // Create maze tilemap
        const map = this.make.tilemap({ key: 'maze' });
        const tileset = map.addTilesetImage('wallTile', 'wallTile');
        const layer = map.createLayer('Tile Layer 1', tileset, 60, 100);
        layer.setX(screenCenterX - layer.width / 2);

        // Add arrow key image
        this.arrowKeys = this.add.image(1225, screenCenterY, 'arrowKeys').setOrigin(0.5);
        
        // Add arrow
        this.arrow = this.add.image(this.mazeEntranceX, this.mazeEntranceY - 35, 'arrow');
        this.arrow.rotation = 1.6;

        // Add dotted line at exit (need to make this a more clear image)
        this.dottedLine = this.add.image(this.mazeExitX, this.mazeExitY - 14, 'dottedLine');

        // Add line at the beginning to keep the player from going outside of the maze
        var boundaryLine = this.add.rectangle(this.mazeEntranceX, this.mazeEntranceY - 16, 30, 1, 0xffffff);
        this.physics.add.existing(boundaryLine, true);

        // Create scope
        this.scope = this.add.circle(this.mazeEntranceX, this.mazeEntranceY, 1000);

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

        // Initialize countdown and stopwatch
        const countdownLabel = this.add.text(screenCenterX * 1.35, 45, '', { fontSize: 80, color: '0x000000' }).setOrigin(0.5);
        this.textLabel = this.add.text(screenCenterX * 0.85, 45, "Memorize for ", { fontSize: 65, color: '0x000000'}).setOrigin(0.5);
        this.stopwatchLabel = this.add.text(screenCenterX * 1.25, 45, '', { fontSize: 80, color: '0x000000' }).setOrigin(0.5);
        this.countdown = new Countdown(this, countdownLabel, this.countdownTime);
		this.countdown.start(this.handleCountdownFinished.bind(this));

        // Take data from the last game to set up the number of times played variable (set it to 0 if there is no incoming data)
        this.timesPlayed = data.timesPlayed || 0;

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

        //// CSV maze stuff
        //// **************
        // var map = this.make.tilemap({ key: 'map', tileWidth: 30, tileHeight: 30 });
        // var tileset = map.addTilesetImage('tiles');
        // var layer = map.createLayer(0, tileset, 0, 0);
        //// layer.skipCull = true;
        //// **************
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
            // this.scope.setStrokeStyle(this.scopeStrokeWidth, 0x1a65ac);

            // just seeing what a white scope looks like
            this.scope.setStrokeStyle(this.scopeStrokeWidth, 0xffffff);
        }
        // expand condition
        else if (this.scopeStrokeWidth > scopeTargetExpandSize && !this.started) {
            this.scopeStrokeWidth = Math.max(this.scopeStrokeWidth - this.scopeSpeed, scopeTargetExpandSize);
            // this.scope.setStrokeStyle(this.scopeStrokeWidth, 0x1a65ac);

            // just seeing what a white scope looks like
            this.scope.setStrokeStyle(this.scopeStrokeWidth, 0xffffff);
        }
    }

    update() 
    {
        const body = this.player.body;
        var y = body.position.y;
        var x = body.position.x;

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
        this.countdown.update()
    }

    startGame(body, speed)
    {
        // Get rid of the arrow keys and arrow images
        this.arrowKeys.setVisible(false);
        this.arrow.setVisible(false);

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
            body.setVelocityX(speed)
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

    formatTimeRecordLabel(seconds)
    {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        // Seconds to minutes
        var minutes = Math.floor(seconds/60);

        // Remainder back to seconds
        var partInSeconds = seconds%60;

        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');

        // Formats time
        var formattedTime =`${minutes}:${partInSeconds}`;

        // Sets the time record label to formatted time
        this.timeRecordLabel = this.add.text(screenCenterX * 1.75, 45, 'Record ' + formattedTime, { fontSize: 50, color: '0x000000'}).setOrigin(0.5);
    }

    handleWinGame() 
    {
        // Handle booleans
        this.started = false;
        this.ended = true;

        // Get rid of "Go!" and countdown label
        this.textLabel.setText('');
        this.countdown.label.setText('');

        // Update time record
        if (this.milliseconds < this.timeRecord) {
            this.timeRecord = this.milliseconds;
            this.timeRecordLabel.text = 'Record ' + this.formattedTime;            
        }
        
        // moves time to center of screen
        this.stopwatchLabel.setPosition(this.cameras.main.worldView.x + this.cameras.main.width / 2, 300);
        this.stopwatchLabel.setColor('#0abff7');

        // expands scope
        this.animateScope();

        // button with "Play Again" that resets scene 
        const resetButton = this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 2, 400, 'Play Again', { fontSize: 60, fill: '#0abff7' }).setOrigin(0.5);
        resetButton.setInteractive()
                    .on('pointerdown', () => this.scene.restart({ timeRecord: this.timeRecord, timesPlayed: this.timesPlayed + 1 })); 

        // button with "Next Level" that moves to next level (doesn't work yet)
        const nextLevelButton = this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 2, 500, 'Next Level', { fontSize: 60, fill: '#0abff7' }).setOrigin(0.5);
    }
}