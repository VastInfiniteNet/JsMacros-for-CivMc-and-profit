import { Constants } from "./Constants"
import { roundPosArray } from "./Coords"
import { DIRECTIONS, getDirection } from "./Navigation"
import { playerPos } from "./Player"

export enum LogOptions {
    positioning =   1 << 0, // includes current player location
    direction =     1 << 1, // include current player direction
    temp3 =         1 << 2,
    temp4 =         1 << 3,
    temp5 =         1 << 4,
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

    name: string
    output_filename: string
    options: number
    

    /**
     * 
     * @param {string} name Logger name
     * @param {string} outputFile log file location
     * @param {object} options additional logging options
     */
    constructor(name: string, 
                outputFile: string = "", 
                options: number = 0) 
    {
        this.name = name
        if (!FS.exists(Constants.LOG_FOLDER + Constants.SERVER_FOLDER))
            FS.makeDir(Constants.LOG_FOLDER + Constants.SERVER_FOLDER)
        this.output_filename = Constants.LOG_FOLDER + Constants.SERVER_FOLDER + outputFile
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
            let optionals = ''
            if (this.options) {
                optionals += this.options & LogOptions.positioning ? ` [${roundPosArray(playerPos())}]` : ''
                optionals += this.options & LogOptions.direction ? ` [${DIRECTIONS[getDirection()]}]` : ''
            }
           
            
            const message = `${prefix}:${optionals} ${arg}\n`

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
    toString(): string {
        return `Logger '${this.name}' ${this.output_filename ? this.output_filename : ''} ${this.options}`
    }
}

export {Logger}