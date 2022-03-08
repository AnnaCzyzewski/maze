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

    this.load.spritesheet('dude', 'src/assets/sprites/spaceman.png', {frameWidth: 32, frameHeight: 48});
}

function create ()
{
    var map = this.make.tilemap({ key: 'map', tileWidth: 30, tileHeight: 30 });
    var tileset = map.addTilesetImage('tiles');
    var layer = map.createLayer(0, tileset, 0, 0); 
    // layer.skipCull = true;

    var player = this.add.sprite(15, 35, 'dude');


    this.input.keyboard.on('keydown-A', function (event) {        var tile = layer.getTileAtWorldXY(player.x - 30, player.y, true);        if (tile.index === 1)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.x -= 30;
            player.angle = 0;
        }    });    //  Right
    this.input.keyboard.on('keydown-D', function (event) {        var tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);        if (tile.index === 1)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.x += 30;
            player.angle = 0;
        }    });    //  Up
    this.input.keyboard.on('keydown-W', function (event) {        var tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);        if (tile.index === 1)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.y -= 30;
            player.angle = 0;
        }    });    //  Down
    this.input.keyboard.on('keydown-S', function (event) {        var tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);        if (tile.index === 1)
        {
            //  Blocked, we can't move
        }
        else
        {
            player.y += 30;
            player.angle = 0;
        }    });}




function update (time, delta) 
{
    // controls.update(delta); // unknown usage 
}
