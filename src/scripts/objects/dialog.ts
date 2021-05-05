export default class Dialog extends  Phaser.GameObjects.Container {

    message
    frame
    popup
    levelcomplete

    constructor(scene, x, y) {
      super(scene, x, y)

      this.alpha = 0.8
      this.setScale(0.1)
      this.levelcomplete = this.scene.sound.add('levelcomplete')


    }

    showWinner(dialog:string) {
        this.message = new Phaser.GameObjects.Text(this.scene,0,0,dialog,{ color: 'white', fontSize: '28px' }).setOrigin(0.5)
        this.frame = new Phaser.GameObjects.Rectangle(this.scene,0,0,600,200,0x6666ff)
        this.levelcomplete.play()
     

        this.frame.setStrokeStyle(2, 0x1a65ac);
  
        this.add([this.frame,this.message])

        this.popup =  this.scene.tweens.add({
            targets: this,
            scale: 1,
            ease: 'Phaser.Easing.Elastic.In',  
            duration: 500,
            repeat: 0,
            yoyo: false
          })


    }



  }