import Phaser from 'phaser';
import Timer from './Timer';

// The example this was taken from was csv map in phaser examples. The 
// directory in examples is public/tilemap/csv map.js

// As a note: the tiles are 30x30 px, have indices of 0 and 1. The current 
// csv maze is 25 by 25 tiles, 750 pixels by 750. 

export default class Game extends Phaser.Scene

{

	timer;

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
        const timerLabel = this.add.text(screenCenterX, 50, '10', { fontSize: 100, color: '0x000000' }).setOrigin(0.5);

        this.timer = new Timer(this, timerLabel);
		this.timer.start(this.handleCountdownFinished.bind(this));

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
        this.timer.label.setText("Go!");
	}

    update() 
    {
        const body = this.player.body;

        var checkFrozen = this.isFrozen;

        const speed = 200
        if (checkFrozen) {
            body.setVelocity(0, 0)
        } else {
            if (this.cursors.left.isDown)
            {
                body.setVelocityX(-speed)
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

        this.timer.update()

    }
}