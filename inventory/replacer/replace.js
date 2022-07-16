// imports
const {isBroke} = require("./isBroke.js")
const {InvSlots} = require("./utils.js")

// constants
const DEBUG = false

const inv = Player.openInventory()

/**
 * Replaces any item that runs out if there is a replacement.
 */
const replace = function() {
    const result = isBroke(event.item, event.oldItem, event.offHand)

    if (!result) { // no replacing needed!
        if (DEBUG) {
            Chat.log("No replacement required!")
        }
        return
    }
    Client.waitTick()

    const replacementSlot = findReplacementSlot(result)
    if (replacementSlot === null) {
        if (DEBUG)
            Chat.log(`No replacement found for ${result.getName().getString()}`)
        return
    }

    var currentSlot = InvSlots.hotBar + inv.getSelectedHotbarSlotIndex()
    if (event.offHand) {
        if (DEBUG)
            Chat.log("Item to replace in offhand")
        currentSlot = InvSlots.offHand
    }


    inv.swap(currentSlot, replacementSlot)
    if (DEBUG)
        Chat.log("Replaced item!")
}

/**
 * Finds the slot of item in inventory that matches name.
 * @param {*} toReplace item to replace.
 * @returns slot number of replacement, null if no replacement.
 */
function findReplacementSlot(toReplace) {
    for (let k = 0; k < inv.getTotalSlots(); k++) {
        if (inv.getSlot(k).getName().getString() === toReplace.getName().getString()) {
            if (DEBUG)
                Chat.log(`Found replacement in slot ${k}: ${inv.getSlot(k).getName().getString()} === ${toReplace.getName().getString()}`)
            return k
        }
    }
    return null
}

replace()

module.exports = {
    replace: replace,
}