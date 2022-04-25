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
        this.load.image('eleven', 'src/assets/eleven.png');
        this.load.image('twelve', 'src/assets/twelve.png');
        this.load.image('thirteen', 'src/assets/thirteen.png');
        this.load.image('fourteen', 'src/assets/fourteen.png');
        this.load.image('fifteen', 'src/assets/fifteen.png');
        this.load.image('sixteen', 'src/assets/sixteen.png');
        this.load.image('seventeen', 'src/assets/seventeen.png');
        this.load.image('eighteen', 'src/assets/eighteen.png');
        this.load.image('nineteen', 'src/assets/nineteen.png');
        this.load.image('twenty', 'src/assets/twenty.png');
        this.load.image('survival', 'src/assets/survival.png');
        this.load.image('survivalButton', 'src/assets/survival_button.png');
        this.load.image('chooseDifficulty', 'src/assets/choose_difficulty.png');
        this.load.image('easyButton', 'src/assets/easy_button.png');
        this.load.image('mediumButton', 'src/assets/medium_button.png');
        this.load.image('hardButton', 'src/assets/hard_button.png');
        this.load.image('insaneButton', 'src/assets/insane_button.png');
        this.load.image('playAgainButton', 'src/assets/play_again_button.png');
        this.load.image('nextLevelButton', 'src/assets/next_level_button.png');
        this.load.image('gotItButton', 'src/assets/got_it_button.png');
        this.load.image('goHomePrompt', 'src/assets/go_home_prompt.png');
        this.load.image('yesButton', 'src/assets/yes_button.png');
        this.load.image('noButton', 'src/assets/no_button.png');
        this.load.image('mazesPlayed', 'src/assets/mazes_played.png');
        this.load.image('bestTime', 'src/assets/best_time_blue.png');
        this.load.image('longestStreak', 'src/assets/longest_streak_blue.png');


        // this.load.tilemapCSV('map', 'src/assets/tilemaps/mazemap.csv');
        // this.load.image('tiles', 'src/assets/tiles/tiles.png');
        // this.load.spritesheet('dude', 'src/assets/sprites/spaceman.png', {frameWidth: 32, frameHeight: 48});
	}

    create()
    {
        this.scene.start('titleScene');
    }

}