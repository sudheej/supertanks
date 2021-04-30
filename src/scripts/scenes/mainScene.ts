import Tank from '../objects/tank'
import Player from '../gameplay/player'
import PlayerGroup from '../gameplay/PlayerGroup'
import Crate from '../objects/crate'
import FpsText from '../objects/fpsText'
import HealthBar from '../objects/healthbar'
export default class MainScene extends Phaser.Scene {
  fpsText
  cursors
  tankdriving
  healthbar:HealthBar
  tank: Tank
  tank2:Tank
  _tanks:Array<Tank>
  crate: Crate

  bgm

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys()
    let player1Config = new Player(1,"Goku",Phaser.Input.Keyboard.KeyCodes.W,Phaser.Input.Keyboard.KeyCodes.S,Phaser.Input.Keyboard.KeyCodes.A,Phaser.Input.Keyboard.KeyCodes.D,Phaser.Input.Keyboard.KeyCodes.F,400,300)
    let player2Config = new Player(1,"Vegeta",Phaser.Input.Keyboard.KeyCodes.UP,Phaser.Input.Keyboard.KeyCodes.DOWN,Phaser.Input.Keyboard.KeyCodes.LEFT,Phaser.Input.Keyboard.KeyCodes.RIGHT,Phaser.Input.Keyboard.KeyCodes.SPACE,-100,300)
    let playergroup = new PlayerGroup()
    playergroup.add_player(player1Config)
    playergroup.add_player(player2Config)

    playergroup.debug_players()
    this._tanks = playergroup.instantiate_players(this)
    console.log(this._tanks)

    //this.tank = new Tank(this, 400, 300)
    //this.tank2 = new Tank(this, -100, 300)
    this.crate = new Crate(this, 900, 400)
    this.healthbar = new HealthBar(this,200,20,"Tank1")




    this.bgm = this.sound.add('bgm', { loop: true, volume: 0.1 })
    this.add.text(500, 0, 'Press Arrow Keys to Navigate, Space to Fire !', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
  
    this.tankdriving = this.sound.add('tankdriving')
    this.physics.world.setBoundsCollision();
    
  this._tanks.map((t) => {
    this.physics.world.enableBody(t)
    this.physics.add.existing(t)
    this.add.existing(t)
   

  })

  this.physics.add.collider(this._tanks,this.crate)

    /*

     this.physics.world.enableBody(this.tank)

    this.physics.add.existing(this.tank)
    this.add.existing(this.tank2)
    this.add.existing(this.tank)
    this.add.existing(this.crate)

    this.physics.add.collider(this.tank, this.tank2)

    this.physics.add.collider(this.tank, this.crate)
    this.physics.add.collider(this.tank.TankBullet, this.crate,  (Cratex, TankBullet) => {
      // TankBullet.destroy()
      TankBullet.active = false
      TankBullet.destroy()
      this.crate.onImpact()
   
    })

   

  */
    this.fpsText = new FpsText(this)
    this.bgm.play()


  }

 


  update() {
    this.fpsText.update()

    this._tanks.map((t) => {
      t.keyboard_actions()
     
  
    })
    
   // this.tank.keyboard_actions(this.cursors)

  }
}

