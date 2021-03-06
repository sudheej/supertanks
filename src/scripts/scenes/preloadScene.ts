export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('hull', 'assets/Hull_01.png');
    this.load.image('weapon', 'assets/Gun_02.png');
    this.load.image('bullet', 'assets/Light_Shell.png');
    this.load.image('woodencrate', 'assets/map/wooden_crate.png')
    this.load.image('mainpanel', 'assets/ui/mainpanel.png')
    this.load.image('redbutton', 'assets/ui/redbutton.png')
    this.load.image('greenbutton', 'assets/ui/greenbutton.png')
    this.load.atlas('effects','assets/effects.png','assets/effects.json');
    this.load.audio('tankdriving','assets/sounds/tank.wav')
    this.load.audio('firing','assets/sounds/fire.mp3')
    this.load.audio('deadexplosion','assets/sounds/deadexplosion.wav')
    this.load.audio('bgm','assets/sounds/bgm.wav')
    this.load.audio('levelcomplete','assets/sounds/levelcomplete.wav')
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
