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

    /**
     * 
     * @param {string} name Logger name
     * @param {string} outputFile log file location
     * @param {number} chatLevel level to log messages to chat at
     * @param {number} fileLevel level to log messages to file at
     * @param {object} options additional logging options
     */
    constructor(name, outputFile="", chatLevel=Logger.llog.prod, fileLevel=Logger.llog.debug, options={}) {
        this.chatLevel = chatLevel
        this.name = name
        this.outputFile = outputFile
        this.fileLevel = fileLevel
        this.options = options
    }

    /**
     * Only logs message if level doesn't exceed the level of the logger.
     * @param {string} arg what to log
     * @param {number} level priority of what to log
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

    /**
     * Format:
     * 
     * @returns 
     */
    toString() {
        return `Logger '${this.name}' (${this.level}) ${this.outputFile ? this.outputFile + ` (${this.fileLevel})` : ""}`
    }
}

module.exports = {
    Logger,
}