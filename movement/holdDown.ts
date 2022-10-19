import {Logger} from "../lib/Logger"

const logger = new Logger("Hold Down", "holdDown.log")

const key = "key.back"

function hold() {
    logger.Prod(`Setting ${key} to true`)
    KeyBind.keyBind(key, true)
}

hold()