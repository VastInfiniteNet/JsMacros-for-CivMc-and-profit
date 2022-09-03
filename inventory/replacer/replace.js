/**
 * Automatically replaces a held tool that breaks, or a held item that runs out with a compatible replacement.  
 * 
 * @author MotokoKusanagi#5346
 * @contact MotokoKusanagi#5346 discord
 * @contact screwthisusernameprocess@gmail.com
 */


// imports
const { hotBarSlots, mainSlots, offHandSlot } = require("../../lib/inventory.js")
const { itemName, itemId } = require("../../lib/item.js")
const {isBroke} = require("./isBroke.js")
const {Logger} = require("../../lib/Logger.js")

// ----- CONFIG -----

/**
 * "off" - won't consider enchants when deciding replacement.
 *         item replacement equivalent if they share name.
 * 
 * "special" - item replacement equivalent if they share a special enchant 'category'
 *          Categories: silk touch,
 * 
 * "strict" - item replacement equivalent if they share identical enchants. 
 */
 const ENCHANT_MODE = "off"

 const SPECIAL_ENCHANTS = ["silk touch"]

// ----- END OF CONFIG -----


const logger = new Logger("replace", "replace.log")
const inv = Player.openInventory()

/**
 * Replaces any item that runs out if there is a replacement.
 * @param {ItemStackHelper} oldI old item
 * @param {ItemStackHelper} newI new item
 * @param {Boolean} offHand if change happened in off hand
 * @return {Boolean} whether or not a replacement happened
 */
function replace(oldI=event.oldItem, newI=event.item, offHand=event.offHand) {
    if (!!GlobalVars.getBoolean("replaceSwap")) {
        GlobalVars.putBoolean("replaceSwap", false)
        logger.log("Ignoring change from a replacement!", Logger.llog.info)
        return false
    }

    if (!isBroke(newI, oldI, offHand)) { // no replacing needed!
        logger.log("No replacement required!", Logger.llog.info)
        return false
    }

    const replacementSlot = findReplacementSlot(oldI)
    if (!replacementSlot) {
        logger.log(`No replacement found for ${itemName(oldI)}`, Logger.llog.info)
        return false
    }

    var currentSlot = hotBarSlots()[0] + inv.getSelectedHotbarSlotIndex()
    if (offHand) {
        logger.log("Item to replace in offhand", Logger.llog.debug)
        currentSlot = offHandSlot()[0]
    }

    Client.waitTick(2)
    inv.swap(currentSlot, replacementSlot)
    Client.waitTick(2)
    World.playSound("entity.player.levelup", 1, 1)
    Client.waitTick(2)
    logger.log("Replaced item!", Logger.llog.prod)
    GlobalVars.putBoolean("replaceSwap", true)
    return true
}

/**
 * Finds the slot of item in inventory that is a suitable replacement.
 * @param {ItemStackHelper} toReplace item to replace.
 * @returns {Number} slot number of replacement, null if no replacement.
 */
function findReplacementSlot(toReplace) {
    for (let k of [...hotBarSlots(), ...mainSlots()]) {
        if (itemId(inv.getSlot(k)) === itemId(toReplace) && validEnchant(inv.getSlot(k), toReplace)) {
            logger.log(`Found replacement in slot ${k}: ${itemName(inv.getSlot(k))} === ${itemName(toReplace)}`, Logger.llog.debug)
            return k
        }
    }
    return null
}

/**
 * Checks if replacement item has equivalent enchants, given the enchant mode.
 * @param {ItemStackHelper} item item being replaced
 * @param {ItemStackHelper} candidate possible replacement
 * @returns whether or not candidate has equivalent enchants
 */
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