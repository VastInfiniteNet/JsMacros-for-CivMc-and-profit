import { Constants } from "./Constants"
import { roundPosArray } from "./Coords"
import { Direction, getDirection } from "./Navigation"
import { playerPos } from "./Player"

export enum LogOptions {
    NONE        =   0,
    POSITIONING =   1 << 0, // includes current player location
    DIRECTION =     1 << 1, // include current player direction
    CHUNK =         1 << 2,
    QUADRANT =      1 << 3,
    temp5 =         1 << 4,
}

export enum Loglevel {
    none =  -1,
    prod = 0, // TODO: rename this!
    info = 1,
    warning = 2,
    debug = 3,
    error = 4,
}

/**
 * Logger that logs lol.
 */
export class Logger {
    

    name: string
    output_filename: string
    options: number
    enabled: boolean
    

    /**
     * 
     * @param {string} name Logger name
     * @param {string} outputFile log file location
     * @param {object} options additional logging options
     */
    constructor(name: string, 
                outputFile: string = "", 
                options: number = LogOptions.NONE) 
    {
        this.name = name
        if (!FS.exists(Constants.LOG_FOLDER + Constants.SERVER_FOLDER))
            FS.makeDir(Constants.LOG_FOLDER + Constants.SERVER_FOLDER)
        this.output_filename = Constants.LOG_FOLDER + Constants.SERVER_FOLDER + outputFile
        this.options = options
        this.enabled = true
    }

    /**
     * Only logs message if level doesn't exceed the level of the logger.
     * @param {string} arg what to log
     * @param {number} level priority of what to log
     */
    log(arg: string, level: number=Loglevel.debug, display: boolean=false) {
        if (!this.enabled)
            return

        // prefixes 
        const d = new Date()
        const date_prefix: string = `[${ d.toLocaleDateString()} ${d.toLocaleTimeString()}]`
        const log_level_prefix: string = `[${Loglevel[level]}]`
        const logger_name: string = `[${this.name}]`
        const prefix: string = `${date_prefix} ${logger_name} ${log_level_prefix}`

        // optionals
        let optionals: string = ''
        if (this.options) {
            optionals += this.options & LogOptions.POSITIONING ? ` [${roundPosArray(playerPos())}]` : ''
            optionals += this.options & LogOptions.DIRECTION ? ` [${Direction[getDirection()]}]` : ''
            optionals += this.options & LogOptions.CHUNK ? ` [CHUNK]` : ''
            optionals += this.options & LogOptions.QUADRANT ? ` [QUADRANT]` : ''
        }
        
        const message: string = `${prefix}:${optionals} ${arg}\n`
        
        if (display)
            Chat.log(arg)
        if (this.output_filename)
            FS.open(this.output_filename).append(message)
    }

    Info(arg:string, display: boolean=false) {
        this.log(arg, Loglevel.info, display)
    }

    Warn(arg:string, display: boolean=false) {
        this.log(arg, Loglevel.warning, display)
    }

    Debug(arg:string, display: boolean=false) {
        this.log(arg, Loglevel.debug, display)
    }

    Error(arg:string, display: boolean=true) {
        this.log(arg, Loglevel.error, display)
    }

    Prod(arg:string, display: boolean=true) {
        this.log(arg, Loglevel.prod, display)
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