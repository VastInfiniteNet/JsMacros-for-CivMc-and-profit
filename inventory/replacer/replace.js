// imports
const {isBroke} = require("./isBroke.js")
const {InvSlots, Logger} = require("./utils.js")

const logger = new Logger(false, "replace.js")
const inv = Player.openInventory()

/**
 * Replaces any item that runs out if there is a replacement.
 */
const replace = function() {
    if (GlobalVars.getBoolean("replaceSwap")) {
        GlobalVars.putBoolean("replaceSwap", false)
        logger.log("Change only from a previous replacement!")
        return
    }

    const result = isBroke(event.item, event.oldItem, event.offHand)

    if (!result) { // no replacing needed!
        logger.log("No replacement required!")
        return
    }
    Client.waitTick()

    const replacementSlot = findReplacementSlot(result)
    if (!replacementSlot) {
        logger.log(`No replacement found for ${result.getName().getString()}`)
        return
    }

    var currentSlot = InvSlots.hotBar + inv.getSelectedHotbarSlotIndex()
    if (event.offHand) {
        logger.log("Item to replace in offhand")
        currentSlot = InvSlots.offHand
    }


    inv.swap(currentSlot, replacementSlot)
    logger.log("Replaced item!")
    GlobalVars.putBoolean("replaceSwap", true)
}

/**
 * Finds the slot of item in inventory that matches name.
 * @param {*} toReplace item to replace.
 * @returns slot number of replacement, null if no replacement.
 */
function findReplacementSlot(toReplace) {
    for (let k = 0; k < inv.getTotalSlots(); k++) {
        if (inv.getSlot(k).getName().getString() === toReplace.getName().getString()) {
            logger.log(`Found replacement in slot ${k}: ${inv.getSlot(k).getName().getString()} === ${toReplace.getName().getString()}`)
            return k
        }
    }
    return null
}

replace()

module.exports = {
    replace: replace,
}