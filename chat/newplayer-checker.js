const {Logger} = require("../lib/Logger.js") 

const logger = new Logger("new player name checker", "namechecker.log")

function check() {
    const content = event.text.getString().split(" ")
    const poss_name = content.shift()
    const TARGET_PART = "is brand new!"

    if (content.join(' ') !== TARGET_PART) {
        return
    }
    logger.Prod(event.text.getString())
    logger.Prod(`Check name: https://namemc.com/search?q=${poss_name}`)
}

check()