export default class Player {
    id:number
    name: string
    up: number
    down: number
    left: number
    right: number
    fire: number
    _startX: number
    _startY: number

    constructor(id:number,name:string,up:number,down:number,left:number,right:number,fire:number,_startX:number,_startY:number) {
        this.id = id
        this.name = name
        this.up = up
        this.down = down
        this.left = left
        this.right = right
        this.fire = fire
        this._startX = _startX
        this._startY = _startY

    }

}