import Tank from '../objects/tank'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  fpsText
  cursors
  tank:Tank

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.tank = new Tank(this,400,300)
    this.cursors = this.input.keyboard.createCursorKeys()

    this.add.existing(this.tank)

    this.fpsText = new FpsText(this)

  }

  update() {
    this.fpsText.update()

    if (this.cursors.left.isDown)
    {
        this.tank.x -= 1
        this.tank.angle = -90
    }
    else if (this.cursors.right.isDown)
    {

      this.tank.x += 1
      this.tank.angle = +90
        
    }

    if (this.cursors.up.isDown)
    {
      this.tank.y -= 1
      this.tank.angle = 360
    }
    
    if (this.cursors.down.isDown)
    {
      this.tank.y += 1
      this.tank.angle = 180
    }
    
  }
}

