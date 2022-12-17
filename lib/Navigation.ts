export enum DIRECTIONS {
    NORTH = -180,
    EAST = -90,
    SOUTH = 0,
    WEST = 90
}

export function getDirection(yaw:number = Player.getPlayer().getYaw()): DIRECTIONS {
    if (yaw >= 135)
        return DIRECTIONS.NORTH
    if (yaw >= 45)
        return DIRECTIONS.WEST
    if (yaw >= -45)
        return DIRECTIONS.SOUTH
    if (yaw >= -135)
        return DIRECTIONS.EAST
    return DIRECTIONS.NORTH
}