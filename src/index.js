import Phaser from 'phaser'; 

import Preloader from './scenes/Preloader';
import Game from './scenes/Game';
import TitleScene from './scenes/TitleScene';
import LevelScene from './scenes/LevelScene';
import RapidFire from './scenes/RapidFire';

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1420,
        height: 750
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            // debug: true
        }
    },
    backgroundColor: '#ffffff',
    scene: [Preloader, TitleScene, LevelScene, Game, RapidFire]
};

new Phaser.Game(config); 