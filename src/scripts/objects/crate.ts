export default class Crate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'woodencrate')
      scene.add.existing(this)
      scene.physics.add.existing(this)
      this.setScale(0.2)
      this.setCollideWorldBounds(true)
      this.setBounce(1)
    }
  }