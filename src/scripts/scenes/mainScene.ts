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
    let player1Config = new Player(1,"Goku",Phaser.Input.Keyboard.KeyCodes.W,Phaser.Input.Keyboard.KeyCodes.S,Phaser.Input.Keyboard.KeyCodes.A,Phaser.Input.Keyboard.KeyCodes.D,Phaser.Input.Keyboard.KeyCodes.F,400,300,200,10)
    let player2Config = new Player(1,"Vegeta",Phaser.Input.Keyboard.KeyCodes.UP,Phaser.Input.Keyboard.KeyCodes.DOWN,Phaser.Input.Keyboard.KeyCodes.LEFT,Phaser.Input.Keyboard.KeyCodes.RIGHT,Phaser.Input.Keyboard.KeyCodes.SPACE,-100,300,900,10)
    let playergroup = new PlayerGroup()
    playergroup.add_player(player1Config)
    playergroup.add_player(player2Config)

    playergroup.debug_players()
    this._tanks = playergroup.instantiate_players(this)
    console.log(this._tanks)

    //this.tank = new Tank(this, 400, 300)
    //this.tank2 = new Tank(this, -100, 300)
    this.crate = new Crate(this, 900, 400)




    this.bgm = this.sound.add('bgm', { loop: true, volume: 0.1 })
    this.add.text(500, 0, 'Press Arrow Keys to Navigate, Space to Fire !', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
  
    this.tankdriving = this.sound.add('tankdriving')
    this.physics.world.setBoundsCollision();
    
  this._tanks.map((t,i) => {
    this.physics.world.enableBody(t)
    this.physics.add.existing(t)
    this.add.existing(t)
    this.physics.add.collider(this._tanks,this._tanks)
    this.physics.add.collider(t.TankBullet,this._tanks,(tankx,bullet) => {
      bullet.active = false
      bullet.destroy()
      tankx.body.gameObject.body.gameObject.onHit()
  
    })
   

  })

  this.physics.add.collider(this._tanks,this.crate)

    this.fpsText = new FpsText(this)
    this.bgm.play()


  }

 


  update() {
    this.fpsText.update()

    this._tanks.map((t) => {
      if(t.healthbar.getHealthState() > 0 )
      {
        t.keyboard_actions()
      }
      else if(t.active === false) {
          t.destroy()
      }

    })
    
   // this.tank.keyboard_actions(this.cursors)

  }
}

