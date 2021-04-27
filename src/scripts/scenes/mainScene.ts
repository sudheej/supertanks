import Tank from '../objects/tank'

import Crate from '../objects/crate'
import FpsText from '../objects/fpsText'

export default class MainScene extends Phaser.Scene {
  fpsText
  cursors
  tankdriving
  tank: Tank
  crate: Crate

  bgm

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.tank = new Tank(this, 400, 300)
    this.crate = new Crate(this, 900, 400)



    this.bgm = this.sound.add('bgm', { loop: true, volume: 0.1 })
    this.add.text(500, 0, 'Press Arrow Keys to Navigate, Space to Fire !', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    this.cursors = this.input.keyboard.createCursorKeys()
    this.tankdriving = this.sound.add('tankdriving')
    this.physics.world.setBoundsCollision();
    this.physics.world.enableBody(this.tank)



    this.physics.add.existing(this.tank)
    this.add.existing(this.tank)
    this.add.existing(this.crate)



    this.physics.add.collider(this.tank, this.crate)
    this.physics.add.collider(this.tank.TankBullet, this.crate,  (Cratex, TankBullet) => {
      // TankBullet.destroy()
      TankBullet.active = false
      TankBullet.destroy()
      this.crate.onImpact()
   
    })


    this.physics.add.overlap(this.tank.TankBullet,this.crate,this.hitEnemy);

    this.fpsText = new FpsText(this)
    this.bgm.play()


  }

   // 4.3 reset ship position when hit
   hitEnemy(projectile, enemy) {
    console.log("holly shit i am hit")
  }



  update() {
    this.fpsText.update()
    this.tank.keyboard_actions(this.cursors)

  }
}

