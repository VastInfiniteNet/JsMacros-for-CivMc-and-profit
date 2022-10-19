const { playerPos } = require("./player")

/**
 * Logger that logs lol.
 */
class Logger {
    static llog = {
        none: -1,
        prod: 0, // TODO: rename this!
        info: 1,
        warning: 2,
        debug: 3,
        error: 4,
    }

    /**
     * 
     * @param {string} name Logger name
     * @param {string} outputFile log file location
     * @param {number} chatLevel level to log messages to chat at
     * @param {number} fileLevel level to log messages to file at
     * @param {object} options additional logging options
     */
    constructor(name, outputFile="", options={}) {
        this.name = name
        this.outputFile = outputFile
        this.options = options
    }

    /**
     * Only logs message if level doesn't exceed the level of the logger.
     * @param {string} arg what to log
     * @param {number} level priority of what to log
     */
    log(arg, level=Logger.llog.debug, display=false) {
        if (display)
            Chat.log(arg)
        if (this.outputFile) {
            // prefixes 
            const d = new Date()
            const date_prefix = `[${ d.toLocaleDateString()} ${d.toLocaleTimeString()}]`
            const log_level_prefix = `[${level}]`
            const logger_name = `[${this.name}]`

            const prefix = `${date_prefix} ${logger_name}`

            // optionals
            const position = this.options.positioning ? `${playerPos()} ` : ''
            const optionals = `${position}`
            
            const message = `${prefix}: ${optionals} ${arg}\n`

            FS.open(this.outputFile).append(message)
        }
    }

    Info(arg, display=false) {
        this.log(arg, Logger.llog.info, display)
    }

    Warn(arg, display=false) {
        this.log(arg, Logger.llog.warning, display)
    }

    Debug(arg, display=true) {
        this.log(arg, Logger.llog.debug, display)
    }

    Error(arg, display=true) {
        this.log(arg, Logger.llog.error, display)
    }

    Prod(arg, display=true) {
        this.log(arg, Logger.llog.prod, display)
    }

    Log(arg, level, display=false) {
        this.log(arg, level, display)
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