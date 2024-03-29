/**
 * Checks if a HeldItemChange event was the result of an item breaking/running out or not.
 * 
 * @author MotokoKusanagi#5346
 */


// Imports
const { offHandSlot, hotBarSlots, isSimilarItemInInventory } = require("../../lib/inventory.js")
const { itemToString, itemName, itemId } = require("../../lib/item.js")
const { Logger } = require("../../lib/Logger.js")

const logger = new Logger("isBroke", "replace.log")

// ----- CONFIG ------
const BLACK_LIST = ["sword", "potion", "bucket"]

// ----- END OF CONFIG -----

/**
 * Decides if held item change was from item break/runnout or not.
 * @param {ItemStackHelper} currentItem current ItemStackHelper held 
 * @param {ItemStackHelper} oldItem     old ItemStackHelper held 
 * @param {Boolean} isOffHand if item change happened in off hand
 * @returns {Boolean} whether or not an item broke/ranout
 */
 function isBroke(currentItem, oldItem, isOffHand) {
    const inv = Player.openInventory()

    const oldSlot = GlobalVars.getDouble("oldSlotIndex")
    const oldItemName = itemName(oldItem)
    
    var currentSlot = hotBarSlots()[0] + inv.getSelectedHotbarSlotIndex()
    if (isOffHand) {
        logger.Debug("Item change in offhand")
        
        currentSlot = offHandSlot()[0]
    }
    const currentItemName = currentItem.getName().getString()
    
    GlobalVars.putDouble("oldSlotIndex", currentSlot)

    logger.Debug(`Old     item: ${itemToString(oldItem)}`)
    logger.Debug(`Current item: ${itemToString(currentItem)}`)

    // check if inventory open
    if (Hud.getOpenScreenName() !== null) {
        logger.Info(`Inventory ${Hud.getOpenScreenName()} is open!`)
        return false
    }

    // check still in same slot
    if (currentSlot !== oldSlot) {
        logger.Info(`Different slots!: old: ${oldSlot}, current: ${currentSlot}`)
        return false    
    }

    // check if 1 left
    if (oldItem.getCount() !== 1) {
        logger.Info(`Not empty! ${oldItem.getCount()} left!`)
        return false
    }

    // check that old item has changed
    if (oldItemName === "Air" || currentItemName === oldItemName) {
        logger.Info("Didn't run out!")
        return false
    }

    // check old item had low durability
    if (oldItem.getMaxDamage() > 0 && oldItem.getMaxDamage() - oldItem.getDamage() >= 5) {
        logger.Info(`Item still has durability! (${oldItem.getDamage()} left)`)
        return false
    }

    // TODO: check if equivalent item is in inventory
    if (isSimilarItemInInventory(oldItem)) {
        logger.Info("Item was just moved in inventory!")
        return false
    }

    // check if non-blacklisted item
    if ( BLACK_LIST.some(e => itemId(oldItem).includes(e)) ) {
        logger.Info(`Unreplacable item (${itemId(oldItem)})!`)
        return false
    }

    // item broken probably or just dropped lol
    logger.Prod("Current item ran out!")
    return true
}

module.exports = {
    isBroke: isBroke,
}