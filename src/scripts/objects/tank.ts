import Bullet from './bullet'
import HealthBar from './healthbar'
import Player from '../gameplay/player'

export default class Tank extends Phaser.GameObjects.Container {

    TrackAnimationisPlaying: Boolean
    hasCollided: Boolean
    weaponsTween
    exhaust
    shotsFlame
    firing
    _AUDIO_DEAD_EXPLOSION
    driving
    dead
    TankBullet
    tankhitbox
    healthbar
    controlKeys:Phaser.Types.Input.Keyboard.CursorKeys
    keys
    hitTween
    player_entity
    _TANKSPEED = 150

    constructor(scene: Phaser.Scene, x: number, y: number,player_entity:Player) {
        super(scene, x, y);

        this.setSize(245, 245)
        this.player_entity = player_entity
        
        let hull = scene.add.sprite(0, 0, 'hull')
        let weapon = scene.add.sprite(0, 0, 'weapon')
        let lefttrack = scene.physics.add.sprite(-100, 0, 'effects')
        let righttrack = scene.physics.add.sprite(100, 0, 'effects')
        this.exhaust = scene.physics.add.sprite(0, 113, 'effects')
        this.dead = scene.physics.add.sprite(0,113,'effects')
        this.shotsFlame = scene.physics.add.sprite(0, -113, 'effects')
        this.healthbar = new HealthBar(scene,player_entity._healthBarX,player_entity._healthBarY,player_entity.name)
        

        this.firing = scene.sound.add('firing')
        this._AUDIO_DEAD_EXPLOSION = scene.sound.add('deadexplosion')
        this.driving = scene.sound.add('tankdriving', { volume: 0.2, loop: true })
        this.TankBullet = scene.physics.add.group({ classType: Bullet, maxSize: 3, runChildUpdate: true})
  
        this.keys = scene.input.keyboard.addKeys({
            up:  player_entity.up,
            down:  player_entity.down,
            left:  player_entity.left,
            right:  player_entity.right,
            fire: player_entity.fire
        });

        lefttrack.setScale(0.90)
        righttrack.setScale(0.90)
        this.exhaust.setScale(0.7)
        this.dead.setScale(1)
        this.shotsFlame.setScale(0.5)


        this.shotsFlame.anims.create({
            key: 'Sprite_Fire_Shots_Flame',
            frames: this.shotsFlame.anims.generateFrameNames('effects', {
                start: 1,
                end: 3,
                prefix: 'Sprite_Fire_Shots_Shot_B_00',
                suffix: '.png'
            }),
            frameRate: 9,
            repeat: -1
        })

        //Sprite_Effects_Explosion_001.png

        this.dead.anims.create({
            key: 'Sprite_Effects_Explosion',
            frames: this.dead.anims.generateFrameNames('effects', {
                start: 0,
                end: 8,
                prefix: 'Sprite_Effects_Explosion_00',
                suffix: '.png'
            }),
            frameRate: 9,
            repeat: 0
        })


        this.exhaust.anims.create({
            key: 'Sprite_Effects_Exhaust',
            frames: this.exhaust.anims.generateFrameNames('effects', {
                start: 1,
                end: 9,
                prefix: 'Sprite_Effects_Exhaust_02_00',
                suffix: '.png'
            }),
            frameRate: 9,
            repeat: -1
        })

        this.exhaust.anims.create({
            key: 'Sprite_Effects_Idle',
            frames: lefttrack.anims.generateFrameNames('effects', {
                start: 1,
                end: 1,
                prefix: 'Sprite_Effects_Exhaust_02_00',
                suffix: '.png'
            }),
            frameRate: 9,
            repeat: 1
        })


        lefttrack.anims.create({
            key: 'Track_2',
            frames: lefttrack.anims.generateFrameNames('effects', {
                start: 1,
                end: 2,
                prefix: 'Track_2_',
                suffix: '.png'
            }),
            frameRate: 9,
            repeat: -1
        })
        lefttrack.anims.create({
            key: 'Track_idle',
            frames: lefttrack.anims.generateFrameNames('effects', {
                start: 1,
                end: 1,
                prefix: 'Track_2_',
                suffix: '.png'
            }),
            frameRate: 9,
            repeat: 1
        })
        righttrack.anims.create({
            key: 'Track_2',
            frames: righttrack.anims.generateFrameNames('effects', {
                start: 1,
                end: 2,
                prefix: 'Track_2_',
                suffix: '.png'
            }),
            frameRate: 9,
            repeat: -1
        })
        righttrack.anims.create({
            key: 'Track_idle',
            frames: righttrack.anims.generateFrameNames('effects', {
                start: 1,
                end: 1,
                prefix: 'Track_2_',
                suffix: '.png'
            }),
            frameRate: 9,
            repeat: 1
        })
        lefttrack.play('Track_idle')
        righttrack.play('Track_idle')
        this.exhaust.play('Sprite_Effects_Exhaust')
        

        this.dead.visible = false
        this.exhaust.visible = false
        this.shotsFlame.visible = false
        this.hasCollided = false



        this.add([hull, weapon, lefttrack, righttrack, this.exhaust, this.shotsFlame])
        this.setScale(0.3)
        scene.physics.world.enable(this)
        this.body.gameObject.body.setBounce(1, 1).setCollideWorldBounds(true)

        console.log(this.alpha)
    }

    track_animation_state(isActive: Boolean) {
        switch (true) {
            case isActive:
                if (!this.TrackAnimationisPlaying) {
                    this.driving.play()
                    this.add([this.exhaust])
                    this.scene.anims.play('Track_2', this.getAt(2))
                    this.scene.anims.play('Track_2', this.getAt(3))
                    this.exhaust.visible = true

                    //this.exhaust.play('Sprite_Effects_Exhaust')

                    this.TrackAnimationisPlaying = true
                }
                break;
            default:
                if (this.TrackAnimationisPlaying) {
                    this.driving.stop()
                    this.exhaust.visible = false

                    this.scene.anims.play('Track_idle', this.getAt(2))
                    this.scene.anims.play('Track_idle', this.getAt(3))
                    this.TrackAnimationisPlaying = false
                }
                break;
        }
    }

    resetTween(weapon) {
        if (this.weaponsTween) { this.weaponsTween.pause() }
        weapon.y = 15

    }

    setCollision() {
        this.hasCollided = true
    }

    getPlayerEntity() {
        return this.player_entity.name

    }

    setDestroyBullets() {
        this.TankBullet.setActive(false)
        this.TankBullet.setVisible(false)
    }

    onHit() {

          if(this.healthbar.getHealthState() > 0) {
            this.hitTween=  this.scene.tweens.add({
                targets: this,
                alpha: 0.5,
                ease: 'Linear',  
                duration: 50,
                repeat: 1,
                yoyo: true
              })
            this.healthbar.decrease(3)
          }
          else if(this.active === true) {
              //this.add([this.dead])
              this.dead.x = this.x
              this.dead.y = this.y 
              this.dead.visible = true
              if (this.dead.active === false) {
                   

              }
              else {
                  this._AUDIO_DEAD_EXPLOSION.play()
                this.dead.play('Sprite_Effects_Explosion')
              }
             
              
              this.active = false
              this.visible = false
              this.body.gameObject.body.visible = false
              this.body.gameObject.body.active = false
             
              this.dead.on('animationcomplete', (anim, frame) => {
                this.dead.visible = false
                this.dead.active = false
                this.dead.destroy()
            
              }, this);
              //this.body.gameObject.body?this.body.gameObject.body.destroy():""
          }
          
          this.alpha = 1
        
          
    }




    keyboard_actions() {


        
        this.body.gameObject.body.setVelocity(0);
        if (this.keys.fire.isDown) {
            this.firing.play()
            
            let bullet = this.TankBullet.get();
            if (bullet) {
                this.shotsFlame.visible = true
                this.scene.anims.play('Sprite_Fire_Shots_Flame', this.getAt(5))
                bullet.fire(this.x, this.y, this.angle)


            }
            else {

            }









            this.resetTween(this.getAt(1))
            this.weaponsTween = this.scene.tweens.add({
                targets: this.getAt(1),
                y: 0,
                duration: 100,
                ease: 'Easing.Elastic.In',
                repeat: 1,
                yoyo: true
            });

        }
        else {
            this.shotsFlame.visible = false
        }

        switch (true) {
            case this.keys.left.isDown:


                this.track_animation_state(true)
                this.body.gameObject.body.setVelocityX(-this._TANKSPEED);

                this.angle = -90
                break;
            case this.keys.right.isDown:

                this.track_animation_state(true)
                this.body.gameObject.body.setVelocityX(this._TANKSPEED);

                this.angle = +90
                break;
            case this.keys.up.isDown:

                this.track_animation_state(true)
                this.body.gameObject.body.setVelocityY(-this._TANKSPEED);

                this.angle = 360
                break;
            case this.keys.down.isDown:

                this.track_animation_state(true)
                this.body.gameObject.body.setVelocityY(this._TANKSPEED);

                this.angle = 180
                break;
            default:
                this.track_animation_state(false)
                break;
        }




    }
}