import Player from './player'
import Tank from '../objects/tank'
export default class PlayerGroup {

    tank:Array<Tank>

    player_entities:Array<Player>
    constructor() {
        this.player_entities = new Array<Player>()
        this.tank = new Array<Tank>()
    }

    add_player(player:Player) {
        this.player_entities.push(player)
    }

    destroy_player(id) {
        //TBD
        console.log("Player id to be destroyed " + id)
    }

    instantiate_players(game) {
        this.player_entities.map(x => {
           this.tank.push(new Tank(game, x._startX, x._startY))
        })

        return this.tank
    }

    debug_players() {
        this.player_entities.map(x => {
            console.log(x)
        })
    }
}