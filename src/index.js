import Phaser from 'phaser'; 

import Preloader from './scenes/Preloader';
import Game from './scenes/Game';

var config = {
    type: Phaser.AUTO,
    width: 750,
    height: 750,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            // debug: true
        }
    },
    backgroundColor: '#ffffff',
    parent: 'phaser-example',
    scene: [Preloader, Game]
};

var game = new Phaser.Game(config); 

//// Comment above and uncomment below to go back to normal way

//// The example this was taken from was csv map in phaser examples. The 
//// directory in examples is public/tilemap/csv map.js

//// As a note: the tiles are 30x30 px, have indices of 0 and 1. The current 
//// csv maze is 25 by 25 tiles, 750 pixels by 750. 

// import Phaser from 'phaser'; 

// var config = {
//     type: Phaser.AUTO,
//     width: 750,
//     height: 750,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             gravity: { y: 0 },
//             // debug: true
//         }
//     },
//     backgroundColor: '#ffffff',
//     parent: 'phaser-example',
//     scene: {
//         preload: preload,
//         create: create,
//         update: update,
//     }
// };

// // Timer stuff
// // **************
// var text;
// var eachSecondEvent;
// var timerEndsEvent;
// // ***************

// var game = new Phaser.Game(config); 
 
// function preload ()
// {
//     this.load.image('wallTile', 'src/assets/tiles/wallTile.png');
//     this.load.tilemapTiledJSON('maze', 'src/assets/tilemaps/maze.json');

//     // this.load.tilemapCSV('map', 'src/assets/tilemaps/mazemap.csv');
//     // this.load.image('tiles', 'src/assets/tiles/tiles.png');
//     // this.load.spritesheet('dude', 'src/assets/sprites/spaceman.png', {frameWidth: 32, frameHeight: 48});
// }

// function create ()
// {
//     const map = this.make.tilemap({ key: 'maze' });
//     map.setCollision(1, true);
//     const tileset = map.addTilesetImage('wallTile', 'wallTile');
//     const layer = map.createLayer('Tile Layer 1', tileset, 60, 100);

//     this.player = this.add.circle(345, 115, 12, 0x000000, 1);
//     this.physics.add.existing(this.player);
//     this.player.body.setCircle(12);

//     this.physics.add.collider(this.player, layer);

//     this.cursors = this.input.keyboard.createCursorKeys()

//     //// CSV maze stuff
//     //// **************
//     // var map = this.make.tilemap({ key: 'map', tileWidth: 30, tileHeight: 30 });
//     // var tileset = map.addTilesetImage('tiles');
//     // var layer = map.createLayer(0, tileset, 0, 0);
//     //// layer.skipCull = true;
//     //// **************

//     // Timer stuff
//     // **************
//     this.initialTime = 10;
//     const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
//     text = this.add.text(screenCenterX, 50, formatTime(this.initialTime), { fontSize: 100, color: '0x000000' }).setOrigin(0.5);
//     eachSecondEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
//     timerEndsEvent = this.time.addEvent({ delay: 10100, callback: timerEnd, callbackScope: this, loop: true });
//     // ***************
// }

// // Timer stuff
// // **************
// function formatTime(seconds){
//     // Minutes
//     var minutes = Math.floor(seconds/60);
//     // Seconds
//     var partInSeconds = seconds%60;
//     // Adds left zeros to seconds
//     partInSeconds = partInSeconds.toString().padStart(2,'0');
//     // Returns formated time
//     return `${minutes}:${partInSeconds}`;
// }

// function onEvent ()
// {
//     this.initialTime -= 1; // One second
//     text.setText(formatTime(this.initialTime));
// }

// function timerEnd ()
// {
//     game.time.events.stop();
// }
// // ***************

// function update () 
// {

//     /** @type {Phaser.Physics.Arcade.Body} */
//     const body = this.player.body;

//     const speed = 200

//     if (this.cursors.left.isDown)
//     {
//         body.setVelocityX(-speed)
//     }
//     else if (this.cursors.right.isDown)
//     {
//         body.setVelocityX(speed)
//     }
//     else if (this.cursors.up.isDown)
//     {
//         body.setVelocityY(-speed)
//     }
//     else if (this.cursors.down.isDown)
//     {
//         body.setVelocityY(speed)
//     } 
//     else 
//     {
//         body.setVelocity(0, 0)
//     }

// }