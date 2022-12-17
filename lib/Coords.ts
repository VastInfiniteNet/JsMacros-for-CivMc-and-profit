export type Pos3D = Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D
export type Position3DArray = readonly [x:number, y:number, z:number]

/**
 * Converts a Pos3D position to a 1d array representation
 * @param {Pos3D} pos position
 * @returns array of numbers representing position as [x, y, z]
 */
export function pos3dToPosArray(pos: Pos3D): Position3DArray {
    return [pos.getX(), pos.getY(), pos.getZ()]
}

/**
 * 
 * @param {Position3DArray} posCoords 
 * @returns 
 */
export function roundPosArray(posCoords: Position3DArray): Position3DArray {
    return [Math.floor(posCoords[0]),
            Math.floor(posCoords[1]),
            Math.floor(posCoords[2])];
}

/**
 * 
 * @param pos 
 * @returns 
 */
export function roundPos3d(pos: Pos3D): Pos3D {
    return PositionCommon.createPos(...roundPosArray(pos3dToPosArray(pos)))
}

/**
 * 
 * @param pos 
 * @returns 
 */
export function roundPosCoords(pos: Pos3D): Position3DArray {
    return pos3dToPosArray(roundPos3d(pos))
}

/**
 * Whether or not 2 points share the same XZ plane
 */
export function onLine(pos1: Pos3D, pos2: Pos3D): boolean {
    return  pos1.getX() === pos2.getX() || 
            pos1.getZ() === pos2.getZ()
}

/**
 * Get the pos of the center of block of pos 
 */
export function centerPosFlat(pos: Pos3D): Pos3D {
    return PositionCommon.createPos(
        Math.floor(pos.getX()) + 0.5, 
        Math.floor(pos.getY()),
        Math.floor(pos.getZ()) + 0.5)
}

/**
 * Get the euclidean distance between 2 points
 */
export function distance(pos1: Pos3D, pos2: Pos3D): number {
    return pos1.add(pos2.scale(-1)).toVector().getMagnitude()
}

/**
 * TODO
 * @param length 
 */
export function posInFront(length: number): void {
    const user = Player.getPlayer()
    const [yaw, pitch] = [user.getYaw(), user.getPitch()]
}

