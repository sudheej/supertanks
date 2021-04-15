import 'phaser';

export default class Main extends Phaser.Scene
{
    constructor ()
    {
        super('main');
    }

    preload ()
    {
        this.load.image('logo', 'assets/phaser3-logo.png');

    }

    create ()
    {
  

        const logo = this.add.image(400, 70, 'logo');


    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Main
};

const game = new Phaser.Game(config);
