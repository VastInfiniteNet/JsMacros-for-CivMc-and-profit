import { anglify } from "./Math";

const user = Player.getPlayer();
enum CardinalDirection {
    NORTH = -180,
    EAST = -90,
    SOUTH = 0,
    WEST = 90,
}

enum VerticalDirection {
    UP = -90,
    FORWARD = 0,
    DOWN = 90 
}

enum HorizontalDirection {
    LEFT = -90,
    RIGHT = 90,
    BACKWARDS = 180
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
 * @param {number} pitch - the veritcal rotation degree.
 * @param {number} yaw - the horizontal rotiation degree.
 * @param {number} wait - optional lenth of time to wait after action.
 */
export function lookAngle(pitch: number = user.getPitch(), yaw: number = user.getYaw(), wait: number = 0) {
    user.lookAt(yaw, pitch);
    if (wait)
        Client.waitTick(wait);
}

export function turnAngle(pitch: number = 0, yaw: number = 0, wait: number = 0) {
    const newPitch = pitch != 0 ? anglify(user.getPitch() + pitch) : user.getPitch() 
    const newYaw = yaw != 0 ? anglify(user.getYaw() + yaw) : user.getPitch() 
    lookAngle( newPitch, newYaw, wait)
}


/**
 * Gets the yaw direction vector.
 * @param {number} yaw 
 * @returns movement vector denoting x/z direction
 */
export function horLookVec(yaw: number): [number, number] {
    const vec: [number, number] = [0, 0]
    const absYaw: number = Math.abs(yaw)

    if (yaw > CardinalDirection.SOUTH)
        vec[0] = -1
    if (yaw < CardinalDirection.SOUTH)
        vec[0] = 1
    if (absYaw > CardinalDirection.WEST) 
        vec[1] = -1
    if (absYaw < CardinalDirection.WEST)
        vec[1] = 1

    return vec
}

/** Make player look straight down at ground */
export function lookDown(wait: number = 0) {
    lookAngle(VerticalDirection.DOWN, undefined, wait)
}

/** Make player look straight forward */
export function lookForward(wait: number = 0) {
    lookAngle(VerticalDirection.FORWARD, undefined, wait)
}

/** Make player look straight backwards */
export function lookBackwards(wait: number = 0) {
    lookForward()
    turnAround(wait)
}

/** Make player look straight up at the sky */
export function lookUp(wait: number = 0) {
    lookAngle(VerticalDirection.UP, undefined, wait)
}

/** Turn player 180 degrees around */
export function turnAround(wait: number = 0) {
    turnAngle(undefined, HorizontalDirection.BACKWARDS, wait)
}

/** Turn player 90 degrees to the left */
export function turnLeft(wait: number = 0) {
    turnAngle(undefined, HorizontalDirection.LEFT, wait)
}

/** Turn player 90 degrees to the right */
export function turnRight(wait: number = 0) {
    turnAngle(undefined, HorizontalDirection.RIGHT, wait)
}


lookBackwards()