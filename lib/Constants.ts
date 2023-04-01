export namespace Constants {
    /** base of log saving */
    export const LOG_FOLDER: string = '..\\..\\logs\\'

    /** specific folder logs will be saved in. Default is server address  */
    export const SERVER_FOLDER: string = World.getCurrentServerAddress().split("/")[0] + "\\"

    /** distance player moves in the tiniest of steps */
    export const STEP_FORWARD_DISTANCE: number = 0.009604000575826652

    /** set to change what the namelayer group will be joined upon joining a server */
    export const DEFAULT_GC_GROUP: string = "!"

    export const SOUNDS_ENABLED: boolean = false
}