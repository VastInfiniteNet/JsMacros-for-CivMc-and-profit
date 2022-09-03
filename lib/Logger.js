const { playerPos } = require("./player")

/**
 * Logger that logs lol.
 */
class Logger {
    static llog = {
        never: -1,
        prod: 0, // TODO: rename this!
        info: 1,
        debug: 2,
        always: 3,
    }

    constructor(name, outputFile="", chatLevel=Logger.llog.prod, fileLevel=Logger.llog.debug, options={}) {
        this.chatLevel = chatLevel
        this.name = name
        this.outputFile = outputFile
        this.fileLevel = fileLevel
        this.options = options
    }

    /**
     * Only logs message if msg level doesn't exceed that of the logger.
     * @param {*} arg what to log
     * @param {*} level priority of what to log
     */
    log(arg, level=Logger.llog.debug) {
        if (level <= this.chatLevel) {
            Chat.log(arg)
        }
        if (this.outputFile && level <= this.fileLevel) {
            const d = new Date()
            const date = `[${ d.toLocaleDateString()} ${d.toLocaleTimeString()}]`

            // optionals
            const position = this.options.positioning ? `${playerPos()} ` : ''
            
            const message = `${date} ${position}${this.name}: ${arg}\n`

            FS.open(this.outputFile).append(message)
        }
    }

    toString() {
        return `Logger '${this.name}' (${this.level}) ${this.outputFile ? this.outputFile + ` (${this.fileLevel})` : ""}`
    }
}

module.exports = {
    Logger: Logger,
}