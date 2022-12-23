import { ItemStack, itemId } from "../lib/Item"
import { InventoryStorageSections, getInvSectionSlots, isItemPresent } from "../lib/Inventory"

/******** CONFIG ********/
// maximum durability prevent usage at
const MIN_DURABILITY: number = 15

// item ids of items to protect
const PROTECTED_ITEM_IDS: string[] = [
    "minecraft:diamond_pickaxe",
    "minecraft:diamond_hoe",
    "minecraft:diamond_shovel",
    "minecraft:diamond_axe"
]
/******** END OF CONFIG ********/
const itemChangeEvent : Events.HeldItemChange = event as Events.HeldItemChange

function prevent(oldI: ItemStack = itemChangeEvent.oldItem, newI: ItemStack = itemChangeEvent.item): boolean {
    const damage = newI.getDamage()
    const max_damage = newI.getMaxDamage()

    if (itemId(oldI) !== itemId(newI) || !PROTECTED_ITEM_IDS.includes(itemId(newI)) || isItemPresent(oldI)) { 
        return false
    }
    else if (! (max_damage - damage < MIN_DURABILITY)) { // tool not in danger of breaking
        return false
    }

    const inv = Player.openInventory()
    const current_slot = getInvSectionSlots(InventoryStorageSections.hotbar)[0] + inv.getSelectedHotbarSlotIndex()
    Chat.log(`WARNING TOOL LOW DURABILITY: ${max_damage - damage}`)
    inv.swapHotbar(current_slot, 40)
    return true
}

prevent()