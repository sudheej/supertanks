export default class Dialog extends  Phaser.GameObjects.Container {

    message
    frame
    popup
    levelcomplete
    mainpanel
    btn_playagain
    btn_quit

    constructor(scene, x, y) {
      super(scene, x, y)
      
      this.alpha = 0.8
      this.setScale(0.1)
      this.levelcomplete = this.scene.sound.add('levelcomplete')
      


    }

    showWinner(dialog:string) {
        this.message = new Phaser.GameObjects.Text(this.scene,0,0,dialog,{ color: 'white', fontSize: '28px' }).setOrigin(0.5)
        this.mainpanel = this.scene.add.sprite(0, 0, 'mainpanel')

        this.mainpanel.setSize(50,100)

        let bg_red = this.scene.add.sprite(0, 0, 'redbutton')
        let text_red = new Phaser.GameObjects.Text(this.scene,0,0,"Quit",{ color: 'white', fontSize: '15px' }).setOrigin(0.5)
        this.btn_quit = this.scene.add.container(100,100,[bg_red,text_red])
        this.btn_quit.setSize(bg_red.width,bg_red.height)


        let bg_green = this.scene.add.sprite(0, 0, 'greenbutton')
        let text_green = new Phaser.GameObjects.Text(this.scene,0,0,"Play Again",{ color: 'white', fontSize: '15px' }).setOrigin(0.5)
        this.btn_playagain = this.scene.add.container(-100,100,[bg_green,text_green])
        this.btn_playagain.setSize(bg_green.width,bg_green.height)


        this.btn_quit.setInteractive({ cursor: 'pointer' })
        this.btn_playagain.setInteractive({ cursor: 'pointer' })


     

        this.btn_quit.on('pointerover', function () {

            bg_red.setTint(0x44ff44);
      
    
        });

        this.btn_quit.on('pointerout', function () {

            bg_red.clearTint();
 
    
        });

        
        
        this.btn_playagain.on('pointerover', function () {

            bg_green.setTint(0xff4444);
      
    
        });

        this.btn_playagain.on('pointerout', function () {

            bg_green.clearTint();
 
    
        });

        this.btn_playagain.on('pointerdown', () => {

            let red = Phaser.Math.Between(50, 255);
            let green = Phaser.Math.Between(50, 255);
            let blue = Phaser.Math.Between(50, 255);
            this.scene.cameras.main.fade(2000, red, green, blue);
           // this.s .cameras.main.fade(2000, red, green, blue);
 
    
        },this.scene);



    
        
        //this.btn_playagain = this.scene.add.sprite(0, -50, 'greenbutton')
        //this.btn_quit = this.scene.add.sprite(-20, -50, 'redbutton')
        //this.frame = new Phaser.GameObjects.Rectangle(this.scene,0,0,600,200,0x6666ff)
        this.levelcomplete.play()
     

        //this.frame.setStrokeStyle(2, 0x1a65ac);
  
        this.add([this.mainpanel,this.message,this.btn_quit,this.btn_playagain])

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