const {centerPosFlat, posCoords, distDiffFlat, posInFront, distance} = require("./coords.js");
const {Logger} = require("./Logger.js");
const {lookBlock, lookAngle} = require("./look.js")

// numerical constants
const MOVE_FORWARD_DIST = 0.009604000575826652

// class constants
const logger = new Logger("Move", "move.log", Logger.llog.debug)

const user = Player.getPlayer();


function centerSelf() {
    let currentPos = user.getPos()
    const goalPos = centerPosFlat(currentPos)
    let dist = distance(goalPos, user.getPos())
    logger.log(`Dist to middle: ${dist}`)
    const time = Time.time()

    while( dist > 0.0101) {
        logger.log(`Dist to middle: ${dist}`)
        lookBlock(...posCoords(goalPos))
        Client.waitTick()
        Player.moveForward(0)
        Client.waitTick()
        dist = distDiffFlat(goalPos, user.getPos())
    }
    logger.log(`Final distance to center: ${dist}`)
    logger.log(`Time to reach: ${(Time.time() - time)/1000}s`)
}

function blocksForward(n) {
    let startPos = Player.getPlayer().getPos()
    const time = Time.time()
    const angle = user.getYaw()

    for (let dist = distance(startPos, user.getPos()); dist < n; dist = distance(startPos, user.getPos())) {
        Player.moveForward(0)
        Client.waitTick()
        lookAngle(40, -90)
    }
    logger.log(`Distance covered: ${distDiffFlat(startPos, user.getPos())}`)
    logger.log(`Time to reach: ${(Time.time() - time)/1000}s`)
}

module.exports = {
    user: user,
    centerSelf: centerSelf,
    blocksForward: blocksForward,
    MOVE_FORWARD_DIST: MOVE_FORWARD_DIST,
};