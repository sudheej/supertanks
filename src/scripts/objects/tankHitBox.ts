export default class TankHitBox extends Phaser.Geom.Rectangle {
    constructor(scene,x, y,w,h) {
      super(x, y, w,h)

      scene.add.rectangle(x,y,w,h,50)

    }
  }