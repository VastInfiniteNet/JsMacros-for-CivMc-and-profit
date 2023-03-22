/**
 * IDK
 */

import { pos3dToPosArray } from "./Coords"

export function playerPos() {
    return pos3dToPosArray(Player.getPlayer().getPos())
}

export const user = Player.getPlayer()

