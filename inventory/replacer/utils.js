const itemString = function(item) {
    return `${item.getName().getString()} (${item.getCount()}) dura: (${item.getMaxDamage() - item.getDamage()}/${item.getMaxDamage()})`
}


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
        return `Logger '${this.name}' is ${this.level ? "on" : "off"}`
    }
}

// first inventory slot number of inventory section
const InvSlots = {
    main: 9,
    hotBar: 36,
    offHand: 45,
}

module.exports = {
    itemToString: itemString,
    InvSlots: InvSlots,
    Logger: Logger,
    loggingLevels: loggingLevels
}