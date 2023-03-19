import { Logger } from "../lib/Logger"
import { findText } from "./MessageLooker"

const logger: Logger = new Logger("New player namechecker", "namechecker.log")

function check() {
    const content: string[] = (event as Events.RecvMessage).text.getString().split(" ")
    const poss_name = content.shift()
    const TARGET_PART: string = "is brand new!"
    if (!findText(TARGET_PART, content.join(' ')))
        return

    logger.Debug((event as Events.RecvMessage).text.getString())
    logger.Prod(`Check name: https://namemc.com/search?q=${poss_name}`)
}

check()