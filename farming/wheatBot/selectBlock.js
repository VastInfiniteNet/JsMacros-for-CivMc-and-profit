const {Logger} = require("../../lib/Logger.js")
const {posCoords, roundPos, onLine} = require("../../lib/coords.js");

const logger = new Logger("Select block crouch", "select.log", Logger.llog.debug, Logger.llog.debug)

const startEnd = () => {
    const h3d = Hud.createDraw3D();
    Hud.registerDraw3D(h3d)

    const crouchKey = KeyBind.getKeyBindings().get("key.sneak")

    logger.log("Crouch to select point 1")
    JsMacros.waitForEvent("Key", JavaWrapper.methodToJava( e => {
        return e.key === crouchKey && e.action === 1
    }))
    let startPos = Player.getPlayer().getPos()
    startPos = roundPos(startPos)
    h3d.addBox(...posCoords(startPos), ...(posCoords(startPos).map(e=>e+1)),
            0, 255, 0xffffff, 255, true)
    logger.log(`Start: ${startPos}`)

    logger.log("Crouch to select point 2")
    JsMacros.waitForEvent("Key", JavaWrapper.methodToJava( e => {
        return e.key === crouchKey && e.action === 1
    }))
    let endPos = Player.getPlayer().getPos()
    endPos = roundPos(endPos)
    h3d.addBox(...posCoords(endPos), ...(posCoords(endPos).map(e=>e+1)),
            0, 255, 0xffffff, 255, true)
    logger.log(`End: ${endPos}`)


    if (onLine(startPos, endPos)) {
        logger.log("Points aligned")
    } else {
        logger.log("Points dont share a line")
    }

    Client.waitTick(20*2)

    // clean up
    h3d.unregister()


    return [startPos, endPos]
}

const distFromHere = () => {
    const h3d = Hud.createDraw3D();
    Hud.registerDraw3D(h3d)
    const here = Player.getPlayer().getPos()

    const crouchKey = KeyBind.getKeyBindings().get("key.sneak")
    logger.log("Crouch to select last crop in row")
    JsMacros.waitForEvent("Key", JavaWrapper.methodToJava( e => {
        return e.key === crouchKey && e.action === 1
    }))
    let startPos = Player.getPlayer().getPos()
    startPos = roundPos(startPos)
    h3d.addBox(...posCoords(startPos), ...(posCoords(startPos).map(e=>e+1)),
            0, 255, 0xffffff, 255, true)
    logger.log(`last crop: ${startPos}`)

    return here.add(startPos.scale(-1))
}

module.exports = {
    startEnd: startEnd,
    distFromHere: distFromHere,
}