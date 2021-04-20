
  
    enum orientation {
        Up = 0,
        Down = -180,
        Left = -90,
        Right = 90 ,
      }

export default class Bullet extends Phaser.GameObjects.Image {
    speed: number;
    born: number;
    direction: number;
    xSpeed: number;
    ySpeed: number;
    
    constructor(scene: any, x: number, y: number) {
        super(scene, x, y, 'bullet');

        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

    
        this.speed = Phaser.Math.GetSpeed(600, 0.2);
        this.setScale(0.5)

    }

    setOrientation(angle) {
        this.direction = angle
        this.angle = angle
    }

    fire(x,y,tank_angle) {

        if (tank_angle === orientation.Up) {

            this.setPosition(x, y - 50);
            this.setOrientation(orientation.Up)
        }
        else if(tank_angle === orientation.Down) {

            this.setPosition(x, y + 50);
            this.setOrientation(orientation.Down)
        }
        else if(tank_angle === orientation.Left) {

            this.setPosition(x -50 , y);
            this.setOrientation(orientation.Left)
        }
        else if(tank_angle === orientation.Right) {

            this.setPosition(x + 50 , y);
            this.setOrientation(orientation.Right)
        }

       

        this.setActive(true);
        this.setVisible(true);
    }

    update(time: any, delta: number) {


        if ( this.direction === orientation.Up) {

            this.y -= this.speed * delta;
        }
        else if(this.direction === orientation.Down) {
  
            this.y += this.speed * delta;
        }
        else if(this.direction === orientation.Left) {

            this.x -= this.speed * delta;
        }
        else if(this.direction === orientation.Right) {

            this.x += this.speed * delta;
        }


   

        if (this.y < -1000 || this.x < -1000 || this.x > 1000 || this.y > 1000) 
        {
            this.setActive(false);
            this.setVisible(false);
        }

    }
}
