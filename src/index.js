import Phaser from 'phaser'; 

import Preloader from './scenes/Preloader';
import Game from './scenes/Game';
import TitleScene from './scenes/TitleScene';
import LevelScene from './scenes/LevelScene';
import LevelSceneP2 from './scenes/LevelSceneP2';
import RapidFire from './scenes/RapidFire';

var config = {
    type: Phaser.AUTO,
    scale: {
        //eventually may want to change the width of the screen to 1000 x 750 to make
        // screen look better
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
    parent: 'phaser-example',
    scene: [Preloader, TitleScene, LevelScene, LevelSceneP2, Game, RapidFire]
};

new Phaser.Game(config); 