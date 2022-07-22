const {Logger} = require("../../lib/Logger.js")
const {startEnd} = require("./selectBlock.js")
const {centerSelf} = require("../../lib/move.js")

const logger = new Logger("wheatbot Icenian wall", "wheat.log", Logger.llog.debug, Logger.llog.debug)

const [end, start] = startEnd()
centerSelf()
