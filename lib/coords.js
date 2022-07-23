function posCoords(pos) {
    return [pos.getX(), pos.getY(), pos.getZ()]
}

const roundCoords = (posCoords) => {
    return posCoords.map(e=>Math.floor(e));
}

const roundPos = (pos) => {
    return PositionCommon.createPos(...roundCoords(posCoords(pos)))
}

const roundPosCoords = (pos) => {
    return posCoords(roundPos(pos))
}

const onLine = (pos1, pos2) => {
    return  pos1.getX() === pos2.getX() || 
            pos1.getZ() === pos2.getZ()
}

const centerPosFlat = (pos) => {
    return PositionCommon.createPos(
        Math.floor(pos.getX()) + 0.5, 
        Math.floor(pos.getY()),
        Math.floor(pos.getZ()) + 0.5)
}

function distance(pos1, pos2) {
    return pos1.add(pos2.scale(-1)).toVector().getMagnitude()
}

const posInFront = (length) => {
    const user = Player.getPlayer()
    const [yaw, pitch] = [user.getYaw(), user.getPitch()]
}

module.exports = {
    posCoords: posCoords,
    roundCoords: roundCoords,
    roundPos: roundPos,
    roundPosCoords: roundPosCoords,
    onLine: onLine,
    centerPosFlat: centerPosFlat,
    posInFront: posInFront,
    distance: distance,
}