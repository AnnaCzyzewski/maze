import Phaser from 'phaser'; 

import Preloader from './scenes/Preloader';
import Game from './scenes/Game';
import TitleScene from './scenes/TitleScene';
import LevelScene from './scenes/LevelScene';


var config = {
    type: Phaser.AUTO,
    width: 1420,
    height: 750,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            // debug: true
        }
    },
    // backgroundColor: '#D0D0D0',
    backgroundColor: '#ffffff',
    parent: 'phaser-example',
    scene: [Preloader, TitleScene, LevelScene, Game]
};

new Phaser.Game(config); 
//var titleSc = new Phaser.Game(config);

