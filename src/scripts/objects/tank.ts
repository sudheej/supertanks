export default class Tank extends Phaser.GameObjects.Container {

    
    constructor(scene:Phaser.Scene,x:number,y:number) {
        super(scene,x,y);

        let hull = scene.add.sprite(0,0,'hull')
        let weapon = scene.add.sprite(0,0,'weapon')
        this.add([hull,weapon])
        this.setScale(0.3)
    
    }
}