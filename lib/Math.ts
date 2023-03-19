export function anglify(angSum: number, range: number = 180): number {
    let newAngle = angSum

    if (angSum > range || angSum <= -range) {
        newAngle = -Math.sign(angSum) * (range+range) + angSum
    }

    return newAngle;
}