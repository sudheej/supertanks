import Tank from '../objects/tank'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  fpsText
  tank:Tank

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.tank = new Tank(this,400,300)
    this.add.existing(this.tank)

    this.fpsText = new FpsText(this)

  }

  update() {
    this.fpsText.update()
    this.tank.rotation += 0.03
  }
}

