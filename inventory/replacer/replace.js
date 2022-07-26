/**
 * TODO:
 * - MAKE SURE NOT USABLE IN PVP
 * - make sure doesnt replace when inventory open
 */

// imports
const { hotBarSlots, mainSlots, offHandSlot } = require("../../lib/inventory.js")
const { itemName } = require("../../lib/item.js")
const {isBroke} = require("./isBroke.js")
const {Logger} = require("../../lib/Logger.js")
// ----- CONFIG -----
/**
 * "off" - won't consider enchants when deciding replacement.
 *         item replacement equivalent if they share name.
 * 
 * "special" - item replacement equivalent if they share a special enchant 'category'
 *          Categories: silk touch
 * 
 * "strict" - item replacement equivalent if they share identical enchants. 
 */
 const ENCHANT_MODE = "off"

// ----- END OF CONFIG -----


const logger = new Logger("replace", "replace.log")
const inv = Player.openInventory()

/**
 * Replaces any item that runs out if there is a replacement.
 */
const replace = function() {
    if (!!GlobalVars.getBoolean("replaceSwap")) {
        GlobalVars.putBoolean("replaceSwap", false)
        logger.log("Ignoring change from a replacement!", Logger.llog.info)
        return
    }

    const result = isBroke(event.item, event.oldItem, event.offHand)

    if (!result) { // no replacing needed!
        logger.log("No replacement required!", Logger.llog.debug)
        return
    }

    const replacementSlot = findReplacementSlot(result)
    if (!replacementSlot) {
        logger.log(`No replacement found for ${result.getName().getString()}`, Logger.llog.info)
        return
    }

    var currentSlot = hotBarSlots()[0] + inv.getSelectedHotbarSlotIndex()
    if (event.offHand) {
        logger.log("Item to replace in offhand", Logger.llog.debug)
        currentSlot = offHandSlot()
    }


    inv.swap(currentSlot, replacementSlot)
    logger.log("Replaced item!", Logger.llog.prod)
    GlobalVars.putBoolean("replaceSwap", true)
}

/**
 * Finds the slot of item in inventory that matches name.
 * @param {*} toReplace item to replace.
 * @returns slot number of replacement, null if no replacement.
 */
function findReplacementSlot(toReplace) {
    for (let k of [...hotBarSlots(), ...mainSlots()]) {
        if (itemName(inv.getSlot(k)) === itemName(toReplace) && validEnchant(inv.getSlot(k), toReplace)) {
            logger.log(`Found replacement in slot ${k}: ${inv.getSlot(k).getName().getString()} === ${toReplace.getName().getString()}`, Logger.llog.debug)
            return k
        }
    }
    return null
}

function validEnchant(item, candidate) {
    if (!item.getNBT()) { // items dont have NBT data
        logger.log("Items can't have enchants", Logger.llog.debug)
        return true
    }
    if (ENCHANT_MODE === "off") {
        logger.log("Items don't care about enchants", Logger.llog.debug)
        return true
    }
    if (ENCHANT_MODE === "special") {
        logger.log("Items match special type")
        return true
    }
    return item.getNBT().get("Enchantments").asString() === 
        candidate.getNBT().get("Enchantments").asString()
}

replace()

module.exports = {
    replace: replace,
}