import Phaser from 'phaser';
import Countdown from './Countdown';

// The example this was taken from was csv map in phaser examples. The 
// directory in examples is public/tilemap/csv map.js

// As a note: the tiles are 30x30 px, have indices of 0 and 1. The current 
// csv maze is 25 by 25 tiles, 750 pixels by 750. 

export default class Game extends Phaser.Scene

{

	countdown;

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

        this.player = this.add.circle(345, 115, 12, 0x000000, 1);
        this.physics.add.existing(this.player);
        this.player.body.setCircle(12);
        this.isFrozen = true;

        this.physics.add.collider(this.player, layer);

        this.cursors = this.input.keyboard.createCursorKeys()

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        // const screenThreeQuarters = this.cameras.main.worldView.x + this.cameras.main.width * 0.75

        const countdownLabel = this.add.text(screenCenterX, 50, '', { fontSize: 100, color: '0x000000' }).setOrigin(0.5);

        this.countdown = new Countdown(this, countdownLabel, 10);
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
	}

    update() 
    {
        const body = this.player.body;
        var y = body.position.y;
        var x = body.position.x;
        var checkFrozen = this.isFrozen;
        const speed = 200;
        var started = this.timerStarted;

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
            }
            else if (this.cursors.right.isDown)
            {
                body.setVelocityX(speed)
            }
            else if (this.cursors.up.isDown)
            {
                body.setVelocityY(-speed)
            }
            else if (this.cursors.down.isDown)
            {
                body.setVelocityY(speed)
            } 
            else 
            {
                body.setVelocity(0, 0)
            }
        }

        // Check for maze completion
        if (y >= 700 && (x >= 385 && x <= 400))
        {
            // finished maze!
        }

        this.countdown.update()

    }

}