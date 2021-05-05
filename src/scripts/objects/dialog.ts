export default class Dialog extends  Phaser.GameObjects.Container {

    message
    frame

    constructor(scene, x, y) {
      super(scene, x, y)

      this.alpha = 0.8


    }

    showWinner(dialog:string) {
        this.message = new Phaser.GameObjects.Text(this.scene,0,0,dialog,{ color: 'white', fontSize: '28px' }).setOrigin(0.5)
        this.frame = new Phaser.GameObjects.Rectangle(this.scene,0,0,600,200,0x6666ff)
  
        this.add([this.frame,this.message])
    }



  }