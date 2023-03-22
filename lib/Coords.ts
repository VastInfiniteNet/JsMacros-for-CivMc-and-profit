/**
 * Functions related to coordination operations like converting, distance, comparison.
 */

export type Pos3D = Java.xyz.wagyourtail.jsmacros.client.api.sharedclasses.PositionCommon$Pos3D
export type Pos3DArray = readonly [x:number, y:number, z:number]

//#region coordinate conversion/rounding

/**
 * Converts a Pos3D position to an array equivalent
 * @param {Pos3D} pos - position
 * @returns array of numbers representing position as [x, y, z]
 */
export function pos3dToPosArray(pos: Pos3D): Pos3DArray {
    return [pos.getX(), pos.getY(), pos.getZ()]
}

/**
 * Rounds an array position
 * @param {Pos3DArray} posCoords 
 * @returns array of rounded numbers representing position as [x, y, z]
 */
export function roundPosArray(posCoords: Pos3DArray): Pos3DArray {
    return [Math.floor(posCoords[0]),
            Math.floor(posCoords[1]),
            Math.floor(posCoords[2])];
}

/**
 * Rounds a Pos3D position.
 * @param pos 
 * @returns 
 */
export function roundPos3d(pos: Pos3D): Pos3D {
    return PositionCommon.createPos(...roundPosArray(pos3dToPosArray(pos)))
}

/**
 * Converts a Pos3D position to a rounded array equivalent.
 * @param pos 
 * @returns 
 */
export function roundPosCoords(pos: Pos3D): Pos3DArray {
    return pos3dToPosArray(roundPos3d(pos))
}

//#endregion

/**
 * Whether or not 2 points share the same XZ plane
 * @return true if points on same plane, false if not
 */
export function onLine(pos1: Pos3D, pos2: Pos3D): boolean {
    return  pos1.getX() === pos2.getX() || 
            pos1.getZ() === pos2.getZ()
}

/**
 * Get the center of a Pos3D.
 * @return {Pos3D} 
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

