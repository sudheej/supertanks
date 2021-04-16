export default class Tank extends Phaser.GameObjects.Container {

    
    constructor(scene:Phaser.Scene,x:number,y:number) {
        super(scene,x,y);

        let hull = scene.add.sprite(0,0,'hull')
        let weapon = scene.add.sprite(0,0,'weapon')
        let lefttrack = scene.physics.add.sprite(-100,0,'effects')
        lefttrack.setScale(0.95)
       
        let righttrack = scene.physics.add.sprite(100,0,'effects')
        righttrack.setScale(0.95)
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
        lefttrack.play('Track_2')
        righttrack.play('Track_2')


        this.add([hull,weapon,lefttrack,righttrack])
        this.setScale(0.6)
    
    }

    keyboard_actions(cursors:Phaser.Types.Input.Keyboard.CursorKeys) {

        switch (true) {
            case cursors.left.isDown:
                this.x -= 1
                this.angle = -90
                break;
            case cursors.right.isDown:
                this.x += 1
                this.angle = +90
                break;
            case cursors.up.isDown:
                this.y -= 1
                this.angle = 360
                break;
            case cursors.down.isDown:
                this.y += 1
                this.angle = 180
                break;

            default:
                break;
        }


  

    }
}