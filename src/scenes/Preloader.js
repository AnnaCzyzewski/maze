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
        this.load.image('background', 'src/assets/sprites/graybackground.png');
        this.load.image('arrowKeys', 'src/assets/arrowKeys.png');
        this.load.image('arrow', 'src/assets/arrow.png');
        this.load.image('dottedLine', 'src/assets/dottedLine.png');
        this.load.image('memoryMaze', 'src/assets/memory_maze.png');
        this.load.image('startButton', 'src/assets/start_button.png');
        this.load.image('brainMaze', 'src/assets/brain_maze.png');
        this.load.image('levelSelectButton', 'src/assets/level_select_button.png');
        this.load.image('homeIcon', 'src/assets/home_icon.png');
        this.load.image('settingsIcon', 'src/assets/settings_icon.png');
        this.load.image('nextIcon', 'src/assets/next.png');
        this.load.image('levelSelect', 'src/assets/level_select.png');
        this.load.image('zero', 'src/assets/zero.png');
        this.load.image('one', 'src/assets/one.png');
        this.load.image('two', 'src/assets/two.png');
        this.load.image('three', 'src/assets/three.png');
        this.load.image('four', 'src/assets/four.png');
        this.load.image('five', 'src/assets/five.png');
        this.load.image('six', 'src/assets/six.png');
        this.load.image('seven', 'src/assets/seven.png');
        this.load.image('eight', 'src/assets/eight.png');
        this.load.image('nine', 'src/assets/nine.png');
        this.load.image('ten', 'src/assets/ten.png');


        // this.load.tilemapCSV('map', 'src/assets/tilemaps/mazemap.csv');
        // this.load.image('tiles', 'src/assets/tiles/tiles.png');
        // this.load.spritesheet('dude', 'src/assets/sprites/spaceman.png', {frameWidth: 32, frameHeight: 48});
	}

    create()
    {
        this.scene.start('titleScene');
    }

}