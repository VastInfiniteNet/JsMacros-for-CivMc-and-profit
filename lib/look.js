const user = Player.getPlayer();
const directions = {
    north: -180,
    east: -90,
    south: 0,
    west: 90,
}

/**
 * Turns where player is looking to a specific block.
 * @param {*} x x coordinate of block to look at
 * @param {*} y y coordinate of block to look at
 * @param {*} z z coordinate of block to look at
 * @param {*} wait optional length of time to wait after action 
 */
function lookBlock(x = user.getX(), y = user.getY(), z = user.getZ(), wait = 0) {
    user.lookAt(x, y, z);
    if (wait)
        Client.waitTick(wait);
}

/**
 * Turns to the player to a specific pitch and yaw.
 * @param {*} pitch the veritcal rotation degree.
 * @param {*} yaw the horizontal rotiation degree.
 * @param {*} wait optional lenth of time to wait after action.
 */
function lookAngle(pitch = user.getPitch(), yaw = user.getYaw(), wait = 0) {
    user.lookAt(yaw, pitch);
    if (wait)
        Client.waitTick(wait);
}


function flipYaw() {
    user.lookAt(user.getYaw()+180, user.getPitch())
}

/**
 * Gets the yaw direction vector.
 * @param {*} yaw 
 * @returns movement vector denoting x/z direction
 */
function horLookVec(yaw) {
    const vec = [0, 0]
    const absYaw = Math.abs(yaw)
    if (yaw > 0)
        vec[0] = -1
    if (yaw < 0)
        vec[0] = 1
    if (absYaw > directions.west) 
        vec[1] = -1
    if (absYaw < directions.west)
        vec[1] = 1
    return vec
}


module.exports = {
    lookBlock: lookBlock,
    lookAngle: lookAngle,
    horLookVec: horLookVec,
    flipYaw: flipYaw,
};