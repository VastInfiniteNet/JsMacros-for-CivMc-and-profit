const user = Player.getPlayer();
const directions = {
    north: -180,
    east: -90,
    south: 0,
    west: 90,
}

/**
 * Turns where player is looking to a specific block.
 * @param {number} x x coordinate of block to look at
 * @param {number} y y coordinate of block to look at
 * @param {number} z z coordinate of block to look at
 * @param {number} wait optional length of time to wait after action 
 */
export function lookBlock(x: number = user.getX(), y: number = user.getY(), z: number = user.getZ(), wait: number = 0) {
    user.lookAt(x, y, z);
    if (wait)
        Client.waitTick(wait);
}

/**
 * Turns to the player to a specific pitch and yaw.
 * @param {number} pitch the veritcal rotation degree.
 * @param {number} yaw the horizontal rotiation degree.
 * @param {number} wait optional lenth of time to wait after action.
 */
export function lookAngle(pitch: number = user.getPitch(), yaw: number = user.getYaw(), wait: number = 0) {
    user.lookAt(yaw, pitch);
    if (wait)
        Client.waitTick(wait);
}


export function flipYaw(): void {
    user.lookAt(user.getYaw()+180, user.getPitch())
}

/**
 * Gets the yaw direction vector.
 * @param {number} yaw 
 * @returns movement vector denoting x/z direction
 */
export function horLookVec(yaw: number): [number, number] {
    const vec: [number, number] = [0, 0]
    const absYaw: number = Math.abs(yaw)
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