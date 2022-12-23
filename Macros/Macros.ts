import {Logger} from "../lib/Logger"

const logger = new Logger("Macro system", "macroSystem.log")

interface Macro{

}

class MacroSystem{
    static MacrosStatusName: string = "MacrosStatus"
    private macro: Macro = null;

    constructor() {

    }

    public static start() {
        logger.Prod(`Started ${this.constructor.name}`)
    }

    public static stop() {
        logger.Prod(`Stopped ${this.constructor.name}`)
    }

    private static save() {
        logger.Error(this.constructor.name)
    }
}



const isRunning = !!GlobalVars.getBoolean(MacroSystem.MacrosStatusName)
GlobalVars.putBoolean(MacroSystem.MacrosStatusName, !isRunning)
if (isRunning) { // macro system running
    MacroSystem.stop()
} else { // macro system not running
    MacroSystem.start()
}