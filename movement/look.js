const user = Player.getPlayer();

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
 * @param {*} pitch the horizontal rotation degree.
 * @param {*} yaw the vertical rotiation degree.
 * @param {*} wait optional lenth of time to wait after action.
 */
function lookAngle(pitch = user.getPitch(), yaw = user.getYaw(), wait = 0) {
    user.lookAt(pitch, yaw);
    if (wait)
        Client.waitTick(wait);
}


module.exports = {
    user: user,
    lookBlock: lookBlock,
    lookAngle: lookAngle,
};