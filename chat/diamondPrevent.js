const {Logger} = require("../lib/Logger.js") 
const { playerPos } = require("../lib/player.js")

const logger = new Logger("diamond pause", "dpause.log")

function prevent() {
    const content = event.text.getString()
    const TARGET_PART = "You sense a diamond nearby"

    if (content.substring(0,TARGET_PART.length) !== TARGET_PART)
        return false

    logger.Info(`Diamond found near ${playerPos()}`)
    KeyBind.keyBind('key.swapOffhand', true);

    return true
}

prevent()