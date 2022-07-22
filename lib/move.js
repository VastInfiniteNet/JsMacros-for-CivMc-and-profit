const {centerPos:cPos, posCoords, distDiff} = require("./coords.js")
const {lookBlock} = require("./look.js")

const user = Player.getPlayer();

const time = Time.time()

const centerSelf = () => {
    let currentPos = user.getPos()
    const centerPos = cPos(currentPos)
    const yaw = 0

    while( distDiff(centerPos, user.getPos()) > 0.28) {
        lookBlock(...posCoords(centerPos), 20)
        Player.moveForward(0)
        Chat.log(distDiff(centerPos, user.getPos()))
    }
    Client.waitTick(10)
}

module.exports = {
    user: user,
    centerSelf: centerSelf,
};