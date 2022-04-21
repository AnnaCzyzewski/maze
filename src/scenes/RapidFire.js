import Phaser from 'phaser';

export default class Game extends Phaser.Scene
{
    constructor()
	{
		super('rapid')
	}

    init(data)
    {
        this.difficulty = data.difficulty;
    }

    create() 
    {
        
    }

}