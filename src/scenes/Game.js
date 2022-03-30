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
    startTime = 0;
    seconds;
    formattedTime;

    // initialize the timeRecord as something higher than anybody would reasonably get
    timeRecord = 10000000;
    timeRecordLabel;

    constructor()
	{
		super('game')
	}

    create()
    {
        const map = this.make.tilemap({ key: 'maze' });
        map.setCollision(1, true);
        const tileset = map.addTilesetImage('wallTile', 'wallTile');
        const layer = map.createLayer('Tile Layer 1', tileset, 60, 100);

        this.scope = this.add.circle(345, 115, 1000);
        this.scope.setStrokeStyle(1, 0x1a65ac);
        this.scopeStrokeWidth = 0;
        // scope radius = 1000; scope stroke width = 1800

        this.player = this.add.circle(345, 115, 10, 0x000000, 1);
        this.physics.add.existing(this.player);
        this.player.body.setCircle(10);

        this.physics.add.collider(this.player, layer);
        
        this.cursors = this.input.keyboard.createCursorKeys();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        const countdownLabel = this.add.text(screenCenterX, 50, '', { fontSize: 100, color: '0x000000' }).setOrigin(0.5);
        this.stopwatchLabel = this.add.text(screenCenterX * 1.6, 50, '', { fontSize: 50, color: '0x000000' }).setOrigin(0.5);

        this.countdown = new Countdown(this, countdownLabel, 2);
		this.countdown.start(this.handleCountdownFinished.bind(this));

        this.timeRecordLabel = this.add.text(150, 50, '', { fontSize: 50, color: '0x000000'}).setOrigin(0.5);

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
        this.started = true;
        this.startTime = this.game.getTime();

        this.countdown.label.setText("Go!");
	}

    trackPlayer() 
    {
       this.scope.setPosition(this.player.x, this.player.y)
    }

    animateScope()
    {
        var scopeTargetShrinkSize = 1800;
        var scopeShrinkSpeed = 15;
        var scopeTargetExpandSize = 0;
        var scopeExpandSpeed = 30;
        // shrink condition
        if (this.scopeStrokeWidth < scopeTargetShrinkSize && this.started) {
            this.scopeStrokeWidth = Math.min(this.scopeStrokeWidth + scopeShrinkSpeed, scopeTargetShrinkSize);
            this.scope.setStrokeStyle(this.scopeStrokeWidth, 0x1a65ac);
        }
        // expand condition
        else if (this.scopeStrokeWidth > scopeTargetExpandSize && !this.started) {
            this.scopeStrokeWidth = Math.max(this.scopeStrokeWidth - scopeExpandSpeed, scopeTargetExpandSize);
            this.scope.setStrokeStyle(this.scopeStrokeWidth, 0x1a65ac);
        }
    }

    update() 
    {
        const body = this.player.body;
        var y = body.position.y;
        var x = body.position.x;
        const speed = 200;

        if (this.started)
        {
            this.startGame(body, speed);
        }
        else
        {
            body.setVelocity(0, 0);
        }

        // Check for maze completion
        if (y >= 700 && (x >= 385 && x <= 400))
        {
            this.handleWinGame();
        }

        this.countdown.update()
    }

    startGame(body, speed)
    {
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
        var milliseconds = this.game.getTime() - this.startTime;
        this.controlStopwatch(milliseconds);
    }

    controlStopwatch(milliseconds) 
    {
        // Milliseconds to seconds
        this.seconds = Math.ceil(milliseconds / 1000);

        // Seconds to minutes
        var minutes = Math.floor(this.seconds/60);

        // Remainder back to seconds
        var partInSeconds = this.seconds%60;

        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');

        // Formats time
        this.formattedTime =`${minutes}:${partInSeconds}`;

        // Sets the stopwatch label
        this.stopwatchLabel.text = this.formattedTime;
    }

    handleWinGame() 
    {
        // stop the game (stops timer and player)
        this.started = false;

        // update time record
        if (this.seconds < this.timeRecord) {
            this.timeRecord = this.seconds;
            this.timeRecordLabel.text = 'PR ' + this.formattedTime;            
        }

        // moves time to center of screen
        this.stopwatchLabel.setPosition(this.cameras.main.worldView.x + this.cameras.main.width / 2, 400);
        this.stopwatchLabel.setColor('#ff0000');

        // expands scope
        this.animateScope();

        // // text with ""
        this.countdown.label.setText('');
        // this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 2, 
        //     50, 'Success!', { fontSize: 60, color: '0x000000' }).setOrigin(0.5);

        // button with "Play Again" that resets scene 
        const resetButton = this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 4, 500, 'Play Again', { fontSize: 60, fill: '#FF0000' });
        resetButton.setInteractive()
                    .on('pointerdown', () => this.scene.restart()); 

        // button with "Next Level" that moves to next level (doesn't work yet)
        const nextLevelButton = this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 4, 600, 'Next Level', { fontSize: 60, fill: '#FF0000' });
    }

}