import Player from './player'
export default class PlayerGroup {

    player_entities:Array<Player>
    constructor() {
        this.player_entities = new Array<Player>()
    }

    add_player(player:Player) {
        this.player_entities.push(player)
    }

    destroy_player(id) {
        //TBD
        console.log("Player id to be destroyed " + id)
    }

    debug_players() {
        this.player_entities.map(x => {
            console.log(x)
        })
    }
}