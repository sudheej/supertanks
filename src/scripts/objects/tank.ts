export default class Tank extends Phaser.GameObjects.Container {

    TrackAnimationisPlaying:Boolean
    weaponsTween
    constructor(scene:Phaser.Scene,x:number,y:number) {
        super(scene,x,y);

        let hull = scene.add.sprite(0,0,'hull')
        let weapon = scene.add.sprite(0,0,'weapon')
        let lefttrack = scene.physics.add.sprite(-100,0,'effects')
        let righttrack = scene.physics.add.sprite(100,0,'effects')

        lefttrack.setScale(0.90)
        righttrack.setScale(0.90)
       
        
        
        lefttrack.anims.create({
            key: 'Track_2',
            frames: lefttrack.anims.generateFrameNames('effects', {
            start: 1,
            end:2,
            prefix: 'Track_2_',
            suffix: '.png'
            }),
            frameRate: 5,
            repeat: -1
        })
        lefttrack.anims.create({
            key: 'Track_idle',
            frames: lefttrack.anims.generateFrameNames('effects', {
            start: 1,
            end:1,
            prefix: 'Track_2_',
            suffix: '.png'
            }),
            frameRate: 5,
            repeat: 1
        })
        righttrack.anims.create({
            key: 'Track_2',
            frames: righttrack.anims.generateFrameNames('effects', {
            start: 1,
            end:2,
            prefix: 'Track_2_',
            suffix: '.png'
            }),
            frameRate: 5,
            repeat: -1
        })
        righttrack.anims.create({
            key: 'Track_idle',
            frames: righttrack.anims.generateFrameNames('effects', {
            start: 1,
            end:1,
            prefix: 'Track_2_',
            suffix: '.png'
            }),
            frameRate: 5,
            repeat: 1
        })
         lefttrack.play('Track_idle')
        righttrack.play('Track_idle')


        this.add([hull,weapon,lefttrack,righttrack])
        scene.physics.world.enableBody(this)
        this.setScale(0.5)
    
    }
    track_animation_state(isActive:Boolean) {
        switch(true) {
            case isActive:
                if (!this.TrackAnimationisPlaying) {
                    this.scene.anims.play('Track_2',this.getAt(2))
                    this.scene.anims.play('Track_2',this.getAt(3)) 
                      this.TrackAnimationisPlaying = true
                   }
            break;       
            default:
                if (this.TrackAnimationisPlaying) {
                    this.scene.anims.play('Track_idle',this.getAt(2)) 
                    this.scene.anims.play('Track_idle',this.getAt(3))
                      this.TrackAnimationisPlaying = false
                   }
            break;  
        }
    }

    resetTween(weapon) {
        if (this.weaponsTween) { this.weaponsTween.pause() }
        weapon.y = 15
              
    }

    keyboard_actions(cursors:Phaser.Types.Input.Keyboard.CursorKeys) {

        if(cursors.space.isDown){
            
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
            
        }

        switch (true) {
            case cursors.left.isDown:
               this.track_animation_state(true)
                this.x -=1
                this.angle = -90
                break;
            case cursors.right.isDown:
                this.track_animation_state(true)
                this.x += 1
                this.angle = +90
                break;  
            case cursors.up.isDown:
                this.track_animation_state(true)
                this.y -= 1
                this.angle = 360
                break;
            case cursors.down.isDown:
                this.track_animation_state(true)
                this.y += 1
                this.angle = 180
                break;
            default:
                this.track_animation_state(false)
                break;
        }


  

    }
}