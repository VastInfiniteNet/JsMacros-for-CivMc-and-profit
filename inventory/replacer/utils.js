const itemString = function(item) {
    return `${item.getName().getString()} (${item.getCount()}) dura: (${item.getMaxDamage() - item.getDamage()}/${item.getMaxDamage()})`
}

/**
 * Logger that logs only if enabled.
 */
class Logger {
    constructor(state=false, name="") {
        this.isOn = state
        this.name = name
    }

    log(arg) {
        if (this.isOn)
            Chat.log(arg)
    }

    toString() {
        return `Logger '${this.name}' is ${this.isOn ? "on" : "off"}`
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
    debugLog: debugLog,
    Logger: Logger,
}