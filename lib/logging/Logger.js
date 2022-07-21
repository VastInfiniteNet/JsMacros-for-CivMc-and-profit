/**
 * Useful logger class for fine grain control over what prints.
 */
 const loggingLevels = {
    prod: 0, // TODO: rename this!
    info: 1,
    debug: 2,
}

/**
 * Logger that logs only if enabled.
 */
class Logger {
    constructor(level=loggingLevels.production, name="Logger") {
        this.level = level
        this.name = name
    }

    log(arg, level=this.level) {
        if (level <= this.level)
            Chat.log(arg)
    }

    toString() {
        return `Logger '${this.name}' (${this.level})`
    }
}