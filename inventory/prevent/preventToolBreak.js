const { hotBarSlots, isItemInInventory } = require("../../lib/inventory")
const {itemId} = require("../../lib/item.js")

/******** CONFIG ********/

// maximum durability prevent usage at
const MIN_DURABILITY = 10
const items = [
    "minecraft:diamond_pickaxe",
    "minecraft:diamond_hoe",
    "minecraft:diamond_shovel",
    "minecraft:diamond_axe"
]

/******** END OF CONFIG ********/


function prevent(oldI=event.oldItem, newI=event.item) {
    const damage = newI.getDamage()
    const max_damage = newI.getMaxDamage()

    if (itemId(oldI) !== itemId(newI) || !items.includes(itemId(newI)) || isItemInInventory(oldI)) {
        return
    }
    if (! (max_damage - damage < MIN_DURABILITY)) {
        return
    }

    const inv = Player.openInventory()
    const current_slot = hotBarSlots()[0] + inv.getSelectedHotbarSlotIndex()
    Chat.log(`WARNING TOOL LOW DURABILITY: ${max_damage - damage}`)
    inv.swapHotbar(current_slot, 40)
}


prevent()