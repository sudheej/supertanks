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
    this.bgm = this.sound.add('bgm',{ loop: true })
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

