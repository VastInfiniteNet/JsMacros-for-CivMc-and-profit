import { playerPos } from "./player"

class LogOptions {
    positioning: boolean

    constructor(positioning: boolean=false) {
        this.positioning = positioning
    }
}

/**
 * Logger that logs lol.
 */
class Logger {
    static level = {
        none: -1,
        prod: 0, // TODO: rename this!
        info: 1,
        warning: 2,
        debug: 3,
        error: 4,
    }

    name: string;
    output_filename: string
    options: LogOptions


    /**
     * 
     * @param {string} name Logger name
     * @param {string} outputFile log file location
     * @param {object} options additional logging options
     */
    constructor(name: string, outputFile: string="", options: LogOptions=new LogOptions()) {
        this.name = name
        this.output_filename = outputFile
        this.options = options
    }

    /**
     * Only logs message if level doesn't exceed the level of the logger.
     * @param {string} arg what to log
     * @param {number} level priority of what to log
     */
    log(arg: string, level: number=Logger.level.debug, display: boolean=false) {
        if (display)
            Chat.log(arg)

        if (this.output_filename) {
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

            FS.open(this.output_filename).append(message)
        }
    }

    Info(arg:string, display: boolean=false) {
        this.log(arg, Logger.level.info, display)
    }

    Warn(arg:string, display: boolean=false) {
        this.log(arg, Logger.level.warning, display)
    }

    Debug(arg:string, display: boolean=false) {
        this.log(arg, Logger.level.debug, display)
    }

    Error(arg:string, display: boolean=true) {
        this.log(arg, Logger.level.error, display)
    }

    Prod(arg:string, display: boolean=true) {
        this.log(arg, Logger.level.prod, display)
    }

    Log(arg:string, level:number, display: boolean=false) {
        this.log(arg, level, display)
    }

    /**
     * Format:
     * 
     * @returns 
     */
    toString() {
        return `Logger '${this.name}' ${this.output_filename ? this.output_filename : ""}`
    }
}

export {Logger}