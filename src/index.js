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

