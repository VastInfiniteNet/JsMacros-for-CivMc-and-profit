/**
 * Not sure. Probably more movement based functions than Look.ts.
 */


export enum Direction {
    NORTH = -180,
    EAST = -90,
    SOUTH = 0,
    WEST = 90
}

/**
 * Get the direction from yaw angle
 * @param yaw 
 * @returns 
 */
export function getDirection(yaw:number = Player.getPlayer().getYaw()): Direction {
    if (yaw >= 135)
        return Direction.NORTH
    if (yaw >= 45)
        return Direction.WEST
    if (yaw >= -45)
        return Direction.SOUTH
    if (yaw >= -135)
        return Direction.EAST
    return Direction.NORTH
}