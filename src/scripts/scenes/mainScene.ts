import Tank from '../objects/tank'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  fpsText
  cursors
  tankdriving
  tank:Tank
  bgm

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.tank = new Tank(this,400,300)
    this.bgm = this.sound.add('bgm',{ loop: true,volume: 0.1 })
    this.add.text(500, 0, 'Press Arrow Keys to Navigate, Space to Fire !', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    this.cursors = this.input.keyboard.createCursorKeys()
    this.tankdriving = this.sound.add('tankdriving')
    this.add.existing(this.tank)

    this.fpsText = new FpsText(this)
    this.bgm.play()

  }

  update() {
    this.fpsText.update()
    this.tank.keyboard_actions(this.cursors)
    
  }
}

