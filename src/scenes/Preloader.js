import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene 

{
    constructor()
	{
		super('preloader')
	}

    preload()
	{
        this.load.image('wallTile', 'src/assets/tiles/wallTile.png');
        this.load.tilemapTiledJSON('maze', 'src/assets/tilemaps/maze.json');
        this.load.image('scope', 'src/assets/whiteSquare.png');
        this.load.image('background', 'src/assets/sprites/graybackground.png')
        this.load.image('arrowKeys', 'src/assets/arrowKeys.png');
        this.load.image('arrow', 'src/assets/arrow.png');
        this.load.image('dottedLine', 'src/assets/dottedLine.png');

        // this.load.tilemapCSV('map', 'src/assets/tilemaps/mazemap.csv');
        // this.load.image('tiles', 'src/assets/tiles/tiles.png');
        // this.load.spritesheet('dude', 'src/assets/sprites/spaceman.png', {frameWidth: 32, frameHeight: 48});
	}

    create()
    {
        this.scene.start('titleScene');
    }

}