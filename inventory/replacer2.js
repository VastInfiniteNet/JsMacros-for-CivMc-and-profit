// replace any item that you run out of with 
const DEBUG = false

const inv = Player.openInventory()

const oldSlot = GlobalVars.getDouble("oldSlotIndex")
const oldItem = event.oldItem
const oldItemName = oldItem.getName().getString()

const currentSlot = inv.getSelectedHotbarSlotIndex() + 36
const currentItem = event.item
const currentItemName = currentItem.getName().getString()

GlobalVars.putDouble("oldSlotIndex", currentSlot)


/**
 * 
 * @returns item that broken or false if nothing broke
 */
function isBroke() {
    if (DEBUG) {
        Chat.log(`Old item: ${oldItem.getName().getString()} (${oldItem.getCount()}) dura: (${oldItem.getMaxDamage() - oldItem.getDamage()}/${oldItem.getMaxDamage()})`)
        Chat.log(`New item: ${currentItem.getName().getString()} (${currentItem.getCount()}) dura: (${currentItem.getMaxDamage() - currentItem.getDamage()}/${currentItem.getMaxDamage()})`)
    }

    // check still in same slot
    if (currentSlot !== oldSlot) {
        if (DEBUG)
            Chat.log("Different slots!")
        return false    
    }

    // check that old item "switched" to air
    if (oldItemName === "Air" || currentItemName !== "Air") {
        if (DEBUG)
            Chat.log("Didn't run out!")
        return false
    }

    // check old item was at break durability (1)
    if ( oldItem.getMaxDamage() > 0 && oldItem.getMaxDamage() - oldItem.getDamage() !== 1) {
        if (DEBUG)
            Chat.log("Item still has durability!")
        return false
    }

    // item broken probably or just dropped lol
    Chat.log("Current item ran out!")
    return currentItem
}


isBroke()