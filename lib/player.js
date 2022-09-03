const { posCoords } = require("./coords")


function playerPos() {
    return posCoords(Player.getPlayer().getPos())
}

const user = () => {
    Player.getPlayer()
}

module.exports = {
    playerPos: playerPos,
}