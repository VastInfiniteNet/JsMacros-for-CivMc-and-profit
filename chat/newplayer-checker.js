const {Logger} = require("../lib/Logger.js") 

const logger = new Logger("new player name checker", "namechecker.log", Logger.llog.info)

function check() {
    const content = event.text.getString().split(" ")
    const poss_name = content.shift()
    const TARGET_PART = "is brand new!"

    if (content.join(' ') !== TARGET_PART) {
        logger.log(`Not a new player message: ${poss_name} ${content}`, Logger.llog.debug)
        return
    }
    logger.log(`New player! ${poss_name}`, Logger.llog.info)
    logger.log(`Check name: https://namemc.com/search?q=${poss_name}`, Logger.llog.prod)
}

check()