import { Logger, LogOptions } from "../lib/Logger"
import { playerPos } from "../lib/Player"

const logger: Logger = new Logger("diamond pause", "dpause.log", LogOptions.DIRECTION | LogOptions.POSITIONING)

function prevent() {
    const content = (event as Events.RecvMessage).text.getString()
    const TARGET_PART = "You sense a diamond nearby"

    if (content.substring(0,TARGET_PART.length) !== TARGET_PART)
        return false

    logger.Info(`Diamond found near ${playerPos()}`)
    KeyBind.keyBind('key.swapOffhand', true);

    return true
}

prevent()