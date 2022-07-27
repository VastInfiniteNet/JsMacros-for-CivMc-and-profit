/**
 * Checks if a HeldItemChange event was the result of an item breaking/running out or not.
 * 
 * @author MotokoKusanagi#5346
 */


// Imports
const { offHandSlot, hotBarSlots } = require("../../lib/inventory.js")
const { itemToString, itemName } = require("../../lib/item.js")
const { Logger } = require("../../lib/Logger.js")

const logger = new Logger("isBroke", "isBroke.log")

// ----- CONFIG ------
const BLACK_LIST = ["Sword", "Potion"]

// ----- END OF CONFIG -----

/**
 * Decides if held item change was from item break/runnout or not.
 * @param {ItemStackHelper} currentItem old held item
 * @param {ItemStackHelper} oldItem     new held item
 * @param {Boolean} isOffHand if item change happened in off hand
 * @returns {Boolean} whether or not an item broke/ranout
 */
 function isBroke(currentItem, oldItem, isOffHand) {
    const inv = Player.openInventory()

    const oldSlot = GlobalVars.getDouble("oldSlotIndex")
    const oldItemName = oldItem.getName().getString()
    
    var currentSlot = hotBarSlots()[0] + inv.getSelectedHotbarSlotIndex()
    if (isOffHand) {
        logger.log("Item change in offhand", Logger.llog.info)
        
        currentSlot = offHandSlot()
    }
    const currentItemName = currentItem.getName().getString()
    
    GlobalVars.putDouble("oldSlotIndex", currentSlot)

    logger.log(`Old item: ${itemToString(oldItem)}`, Logger.llog.debug)
    logger.log(`New item: ${itemToString(currentItem)}`, Logger.llog.debug)

    // check if inventory open
    if (Hud.getOpenScreenName() !== null) {
        logger.log("Inventory is open!", Logger.llog.info)
        return false
    }

    // check still in same slot
    if (currentSlot !== oldSlot) {
        logger.log(`Different slots!: old: ${oldSlot}, current: ${currentSlot}`, Logger.llog.debug)
        return false    
    }

    // check if 1 left
    if (oldItem.getCount() !== 1) {
        logger.log("Not empty!", Logger.llog.info)
        return false
    }

    // check that old item has changed
    if (oldItemName === "Air" || currentItemName === oldItemName) {
        logger.log("Didn't run out!", Logger.llog.info)
        return false
    }

    // check old item was at break durability (1)
    if (oldItem.getMaxDamage() > 0 && oldItem.getMaxDamage() - oldItem.getDamage() !== 1) {
        logger.log("Item still has durability!", Logger.llog.info)
        return false
    }

    // TODO: check if equivalent item is in inventory
    if (false) {
        logger.log("Item was just moved in inventory!", Logger.llog.info)
        return false
    }

    // check if non-blacklisted item
    if ( BLACK_LIST.some(e => itemName(oldItem).includes(e)) ) {
        logger.log("Unreplacable item!", Logger.llog.info)
        return false
    }

    // item broken probably or just dropped lol
    logger.log("Current item ran out!", Logger.llog.prod)
    return true
}

module.exports = {
    isBroke: isBroke,
}