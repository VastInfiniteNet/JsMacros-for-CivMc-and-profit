const {Logger} = require("../lib/Logger.js") 
const { playerPos } = require("../lib/player.js")

const logger = new Logger("diamond pause", "dpause.log", Logger.llog.debug)

function prevent() {
    const content = event.text.getString()
    const TARGET_PART = "You sense a diamond nearby"

    if (content.substring(0,TARGET_PART.length) !== TARGET_PART)
        return
    logger.log(`Diamond found near ${playerPos()}`)
    KeyBind.keyBind('key.swapOffhand', true);

    /** 
    Chat.log("Waiting for waypoint...")
    JsMacros.waitForEvent(
        "Key", JavaWrapper.methodToJava( 
            e => {return e.key === KeyBind.getKeyBindings().get("key.minimap.waypointhotkey")})
    )
    **/
    Client.waitTick()
}

prevent()