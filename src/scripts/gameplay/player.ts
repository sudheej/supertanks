export default class Player {
    id:number
    name: string
    up: number
    down: number
    left: number
    right: number
    fire: number

    constructor(id:number,name:string,up:number,down:number,left:number,right:number,fire:number) {
        this.id = id
        this.name = name
        this.up = up
        this.down = down
        this.left = left
        this.right = right
        this.fire = fire

    }

}