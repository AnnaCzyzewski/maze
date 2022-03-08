// The example this was taken from was csv map in phaser examples. The 
// directory in examples is public/tilemap/csv map.js

// As a note: the tiles are 30x30 px, have indices of 0 and 1. The current 
// csv maze is 25 by 25 tiles, 750 pixels by 750. 

import Phaser from 'phaser'; 

var config = {
    type: Phaser.AUTO,
    width: 750,
    height: 750,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config); 
 
function preload ()
{
    this.load.tilemapCSV('map', 'src/assets/tilemaps/mazemap.csv');
    this.load.image('tiles', 'src/assets/tiles/tiles.png');
}

function create ()
{
    var map = this.make.tilemap({ key: 'map', tileWidth: 30, tileHeight: 30 });
    var tileset = map.addTilesetImage('tiles');
    var layer = map.createLayer(0, tileset, 0, 0); 
    // layer.skipCull = true;

}

function update (time, delta) 
{
    // controls.update(delta); // unknown usage 
}
