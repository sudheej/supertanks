import Bullet from './bullet'

export default class Tank extends Phaser.GameObjects.Container {

    TrackAnimationisPlaying: Boolean
    weaponsTween
    exhaust
    shotsFlame
    firing
    driving
    TankBullet
    tankhitbox
    _TANKSPEED = 150

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.setSize(245, 245)

        let hull = scene.add.sprite(0, 0, 'hull')
        let weapon = scene.add.sprite(0, 0, 'weapon')
        let lefttrack = scene.physics.add.sprite(-100, 0, 'effects')
        let righttrack = scene.physics.add.sprite(100, 0, 'effects')
        this.exhaust = scene.physics.add.sprite(0, 113, 'effects')
        this.shotsFlame = scene.physics.add.sprite(0, -113, 'effects')



        this.firing = scene.sound.add('firing')
        this.driving = scene.sound.add('tankdriving', { volume: 0.2, loop: true })
        this.TankBullet = scene.physics.add.group({ classType: Bullet, maxSize: 3, runChildUpdate: true })



        lefttrack.setScale(0.90)
        righttrack.setScale(0.90)
        this.exhaust.setScale(0.7)
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
        this.exhaust.visible = false
        this.shotsFlame.visible = false



        this.add([hull, weapon, lefttrack, righttrack, this.exhaust, this.shotsFlame])
        this.setScale(0.3)
        scene.physics.world.enable(this)
        this.body.gameObject.body.setBounce(1, 1).setCollideWorldBounds(true)


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



    keyboard_actions(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        this.body.gameObject.body.setVelocity(0);
        if (cursors.space.isDown) {
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
                duration: 50,
                ease: 'Easing.Elastic.In',
                repeat: 1,
                yoyo: true
            });

        }
        else {
            this.shotsFlame.visible = false
        }

        switch (true) {
            case cursors.left.isDown:


                this.track_animation_state(true)
                this.body.gameObject.body.setVelocityX(-this._TANKSPEED);

                this.angle = -90
                break;
            case cursors.right.isDown:

                this.track_animation_state(true)
                this.body.gameObject.body.setVelocityX(this._TANKSPEED);

                this.angle = +90
                break;
            case cursors.up.isDown:

                this.track_animation_state(true)
                this.body.gameObject.body.setVelocityY(-this._TANKSPEED);

                this.angle = 360
                break;
            case cursors.down.isDown:

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