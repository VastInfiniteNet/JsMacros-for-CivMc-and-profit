import { findText } from "../chat/MessageLooker"
import { Logger, LogOptions } from "../lib/Logger"
import { playerPos } from "../lib/Player"

const logger: Logger = new Logger("diamond pause", "dpause.log", LogOptions.DIRECTION | LogOptions.POSITIONING)

function prevent(): boolean {
    const content = (event as Events.RecvMessage).text.getString()
    const TARGET_PART = "You sense a diamond nearby"

    const result = findText(TARGET_PART, content)

    if (result) {
        logger.Info(`Diamond found near ${playerPos()}`)
        KeyBind.keyBind('key.swapOffhand', true);
    }
    
    return result
}

prevent()