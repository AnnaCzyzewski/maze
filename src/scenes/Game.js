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
        // scope radius = 1000; scope stroke width = 1800

        this.player = this.add.circle(345, 115, 10, 0x000000, 1);
        this.physics.add.existing(this.player);
        this.player.body.setCircle(10);

        this.isFrozen = true;

        this.physics.add.collider(this.player, layer);
        
        this.cursors = this.input.keyboard.createCursorKeys();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        
        //this.scope = this.add.image(345, 115, 'scope').setOrigin(0.5);
        //this.scopeLayer = this.add.layer(this.scope);
        //this.scopeLayer.setVisible(false);

        const countdownLabel = this.add.text(screenCenterX, 50, '', { fontSize: 100, color: '0x000000' }).setOrigin(0.5);
        this.stopwatchLabel = this.add.text(screenCenterX * 1.6, 50, '', { fontSize: 50, color: '0x000000' }).setOrigin(0.5);

        this.countdown = new Countdown(this, countdownLabel, 1);
		this.countdown.start(this.handleCountdownFinished.bind(this));

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
		this.isFrozen = false;
        this.countdown.label.setText("Go!");

        this.started = true;
        this.startTime = this.game.getTime();

        //this.scopeLayer.setVisible(true);
        this.shrink();
	}

    trackPlayer() 
    {
       this.scope.setPosition(this.player.x, this.player.y)
    }

    shrink()
    {
        for (let i = 0; i < 1800; i++) {
            this.scope.setStrokeStyle(i, 0x1a65ac);
            //setTimeout(this.stroke(i), 1000);
        }
    }

    // stroke(int)
    // {
    //     this.scope.setStrokeStyle(int, 0x1a65ac);
    // }

    update() 
    {
        const body = this.player.body;
        var y = body.position.y;
        var x = body.position.x;
        var checkFrozen = this.isFrozen;
        const speed = 200;
        var checkStarted = this.started;

        // Control player movement
        if (checkFrozen) 
        {
            body.setVelocity(0, 0);
        } 
        else 
        {
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
        }

        // Control stopwatch
        if (checkStarted == true)
        {
            var milliseconds = this.game.getTime() - this.startTime;

            // Milliseconds to seconds
            var seconds = Math.ceil(milliseconds / 1000);

            // Seconds to minutes
            var minutes = Math.floor(seconds/60);

            // Remainder back to seconds
            var partInSeconds = seconds%60;

            // Adds left zeros to seconds
            partInSeconds = partInSeconds.toString().padStart(2,'0');

            // Formats time
            var formattedTime =`${minutes}:${partInSeconds}`;

            this.stopwatchLabel.text = formattedTime;
        }

        // Control scope following player
        //this.scope.setX(x + 10);
        //this.scope.setY(y);

        // Check for maze completion
        if (y >= 700 && (x >= 385 && x <= 400))
        {
            // freeze the player;
            this.isFrozen = true;

            // stop the timer
            this.started = false;

            //this.scopeLayer.setVisible(false);
            this.scope.setStrokeStyle(1, 0x1a65ac);

            this.countdown.label.setText('');
            this.add.text(this.cameras.main.worldView.x + this.cameras.main.width / 2, 
                50, 'Success!', { fontSize: 60, color: '0x000000' }).setOrigin(0.5);
        }

        this.countdown.update()

    }

}