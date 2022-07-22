const posCoords = (pos) => {
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

const centerPos = (pos) => {
    return PositionCommon.createPos(
        Math.floor(pos.getX()) + 0.5, 
        Math.floor(pos.getY()) + 0.5,
        Math.floor(pos.getZ()) + 0.5)
}

const distDiff = (pos1, pos2) => {
    const [vec1, vec2] = [posCoords(pos1), posCoords(pos2)]
    let s = 0;
    for (let i = 0; i < vec1.length; i++) {
        s += (vec1[i] - vec2[i])**2;
    }
    return s
}

module.exports = {
    posCoords: posCoords,
    roundCoords: roundCoords,
    roundPos: roundPos,
    roundPosCoords: roundPosCoords,
    onLine: onLine,
    centerPos: centerPos,
    distDiff, distDiff
}