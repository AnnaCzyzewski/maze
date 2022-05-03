import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene 

{
    constructor()
	{
		super('preloader')
	}

    preload()
	{
        this.load.image('wallTile1', 'src/assets/tiles/wallTile1.png');
        this.load.image('wallTile2', 'src/assets/tiles/wallTile2.png');
        this.load.image('wallTile3', 'src/assets/tiles/wallTile3.png');
        this.load.image('wallTile4', 'src/assets/tiles/wallTile4.png');
        this.load.tilemapTiledJSON('maze1', 'src/assets/tilemaps/maze1.json');
        this.load.tilemapTiledJSON('maze2', 'src/assets/tilemaps/maze2.json');
        this.load.tilemapTiledJSON('maze3', 'src/assets/tilemaps/maze3.json');
        this.load.tilemapTiledJSON('maze4', 'src/assets/tilemaps/maze4.json');
        this.load.image('finishLine1', 'src/assets/images/finishLine1.png');
        this.load.image('finishLine2', 'src/assets/images/finishLine2.png');
        this.load.image('finishLine3', 'src/assets/images/finishLine3.png');
        this.load.image('finishLine4', 'src/assets/images/finishLine4.png');
        this.load.image('arrowKeys', 'src/assets/images/arrowKeys.png');
        this.load.image('arrow', 'src/assets/images/arrow.png');
        this.load.image('dottedLine', 'src/assets/images/dottedLine.png');
        this.load.image('memoryMaze', 'src/assets/images/memory_maze.png');
        this.load.image('startButton', 'src/assets/images/start_button.png');
        this.load.image('brainMaze', 'src/assets/images/brain_maze.png');
        this.load.image('levelSelectButton', 'src/assets/images/level_select_button.png');
        this.load.image('homeIcon', 'src/assets/images/home_icon.png');
        this.load.image('settingsIcon', 'src/assets/images/settings_icon.png');
        this.load.image('nextIcon', 'src/assets/images/next.png');
        this.load.image('levelSelect', 'src/assets/images/level_select.png');
        this.load.image('introBar', 'src/assets/images/intro_bar.png');
        this.load.image('zero', 'src/assets/images/zero.png');
        this.load.image('one', 'src/assets/images/one.png');
        this.load.image('two', 'src/assets/images/two.png');
        this.load.image('three', 'src/assets/images/three.png');
        this.load.image('four', 'src/assets/images/four.png');
        this.load.image('five', 'src/assets/images/five.png');
        this.load.image('six', 'src/assets/images/six.png');
        this.load.image('seven', 'src/assets/images/seven.png');
        this.load.image('eight', 'src/assets/images/eight.png');
        this.load.image('nine', 'src/assets/images/nine.png');
        this.load.image('ten', 'src/assets/images/ten.png');
        this.load.image('eleven', 'src/assets/images/eleven.png');
        this.load.image('twelve', 'src/assets/images/twelve.png');
        this.load.image('thirteen', 'src/assets/images/thirteen.png');
        this.load.image('fourteen', 'src/assets/images/fourteen.png');
        this.load.image('fifteen', 'src/assets/images/fifteen.png');
        this.load.image('sixteen', 'src/assets/images/sixteen.png');
        this.load.image('seventeen', 'src/assets/images/seventeen.png');
        this.load.image('eighteen', 'src/assets/images/eighteen.png');
        this.load.image('nineteen', 'src/assets/images/nineteen.png');
        this.load.image('twenty', 'src/assets/images/twenty.png');
        this.load.image('survival', 'src/assets/images/survival.png');
        this.load.image('survivalButton', 'src/assets/images/survival_button.png');
        this.load.image('chooseDifficulty', 'src/assets/images/choose_difficulty.png');
        this.load.image('easyButton', 'src/assets/images/easy_button.png');
        this.load.image('mediumButton', 'src/assets/images/medium_button.png');
        this.load.image('hardButton', 'src/assets/images/hard_button.png');
        this.load.image('insaneButton', 'src/assets/images/insane_button.png');
        this.load.image('playAgainButton', 'src/assets/images/play_again.png');
        this.load.image('nextLevelButton', 'src/assets/images/next_level_button.png');
        this.load.image('gotItButton', 'src/assets/images/got_it_button.png');
        this.load.image('goHomePrompt', 'src/assets/images/go_home_prompt.png');
        this.load.image('goHomeButton', 'src/assets/images/go_home_button.png');
        this.load.image('yesButton', 'src/assets/images/yes_button.png');
        this.load.image('noButton', 'src/assets/images/no_button.png');
        this.load.image('mazesPlayed', 'src/assets/images/mazes_played.png');
        this.load.image('bestTime', 'src/assets/images/best_time_blue.png');
        this.load.image('longestStreak', 'src/assets/images/longest_streak_blue.png');
	}

    create()
    {
        this.scene.start('titleScene');
    }

}