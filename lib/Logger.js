/**
 * Logger that logs lol.
 */
class Logger {
    static llog = {
        prod: 0, // TODO: rename this!
        info: 1,
        debug: 2,
    }

    constructor(name, outputFile="", chatLevel=Logger.llog.prod, fileLevel=Logger.llog.debug) {
        this.chatLevel = chatLevel
        this.name = name
        this.outputFile = outputFile
        this.fileLevel = fileLevel
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
            FS.open(this.outputFile).append(
                `[${ d.toLocaleDateString()} ${d.toLocaleTimeString()}] ${this.name}: ${arg}\n`
                )
        }
    }

    toString() {
        return `Logger '${this.name}' (${this.level}) ${this.outputFile ? this.outputFile + ` (${this.fileLevel})` : ""}`
    }
}

module.exports = {
    Logger: Logger,
}