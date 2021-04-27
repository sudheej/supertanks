export default class Crate extends Phaser.Physics.Arcade.Sprite {

    crateTween
    constructor(scene, x, y) {
      super(scene, x, y, 'woodencrate')
      scene.add.existing(this)
      scene.physics.add.existing(this)
      this.setScale(0.2)
      this.setImmovable(true)

      this.setCollideWorldBounds(true)
  
    }

 onImpact() {

    console.log("iam hit !!")

    
    this.crateTween=  this.scene.tweens.add({
        targets: this,
        alpha: 0,
        ease: 'Linear',  
        duration: 100,
        repeat: 2,
        yoyo: true
      })



 }

  }