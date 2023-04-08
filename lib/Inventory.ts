/**
 * Functions related to just player inventories
 */

import { itemId, itemName, ItemStack } from "./Item"
import { Delegate } from "./Types"

//#region enums
export enum InventoryStorageSections {
    HOTBAR = "hotbar",
    MAIN = "main",
    OFFHAND = "offhand"
}
export enum ArmorSlotSections {
    HELMET = "helmet",
    CHESTPLATE = "chestplate",
    LEGGINGS = "leggings",
    BOOTS = "boots"
}
export enum CraftingSlotSections{
    CRAFTING_IN = "crafting_in",
    CRAFT_OUT = "craft_out"
} 
//#endregion

export type ItemSlot = [slot: number, item: ItemStack]
export type InventorySection = InventoryStorageSections | ArmorSlotSections | CraftingSlotSections
export type InventorySectionType = typeof ArmorSlotSections | typeof InventoryStorageSections | typeof CraftingSlotSections

//#region get inventory section

/** Inventory slot numbers associated with the inventory section. */
export function getInvSectionSlots(section: InventorySection): number[] {
    const sectionSlots = new Array<number>()
    for (var slot of Player.openInventory().getMap().get(section)) {
        sectionSlots.push(slot)
    }
    return sectionSlots
}

/** Get items from an inventory subsection */
export function getInvSectionItems(section: InventorySection): ItemSlot[] {
    const sectionItems: ItemSlot[] = []
    for (var slot of getInvSectionSlots(section)) {
        sectionItems.push([slot, Player.openInventory().getSlot(slot)])
    }
    return sectionItems
}

/** Get items from an entire inventory section */
function getEntireSectionItems(section: InventorySectionType): ItemSlot[] {
    let sectionItems: ItemSlot[] = []
    for (var subsection in section) {
        Chat.log(subsection)
        sectionItems = sectionItems.concat(getInvSectionItems(section[subsection]))
    }
    return sectionItems
}

/** Get items in armor slots */
export function getArmorSlotItems(): ItemSlot[] {
    return getEntireSectionItems(ArmorSlotSections)
}

/** Get items in player inventory crafting grid input and ouput. */
export function getCraftingSlotItems(): ItemSlot[] {
    return getEntireSectionItems(CraftingSlotSections)
}

/** Get items in oiffhand, hotbar, and main slots. */
export function getStorageSlotItems(): ItemSlot[] {
    return getEntireSectionItems(InventoryStorageSections)
}

/** Get all items in player inventory */
export function getAllInventoryItems(): ItemSlot[] {
    return [...getArmorSlotItems(),
            ...getCraftingSlotItems(),
            ...getStorageSlotItems()]
}

//#endregion

/** Get item in currently slotted hotbar slot. */
export function getHeldItem(): ItemStack {
    return getInvSectionItems(InventoryStorageSections.HOTBAR)[Player.openInventory().getSelectedHotbarSlotIndex()][1]
}

export function slotCount(): number {
    return Player.openInventory().getTotalSlots()
}

//#region find in inventory

/**
 * Return list of items in player inventory that pass the predicate.
 * @param predicate function that takes an item to check and the current item list as the parameters.
 */
export function findInInventory(predicate: Delegate<ItemStack, ItemSlot, boolean>): ItemSlot[] {
    const items: ItemSlot[] = []

    for (let [idx,item] of getAllInventoryItems()) {
        if (predicate(item, items)) {
            items.push([idx, item])
        }
    }

    return items
}

/** Find items in inventoruy with same item id or item name. */
export function findSimiliarItems(name:string = null, id:string = null): ItemSlot[] {
    return findInInventory(
        (item: ItemStack, _) => {
            return itemName(item) == name || itemId(item) == id
        }
    )
}

/** Checks if any items with same item name or item id */
export function isSimiliarItemPresent(item: ItemStack): boolean {
    return findSimiliarItems(itemName(item), itemId(item)).length > 0
}

/** Checks if an equivalent item is in the player inventory */
export function isItemPresent(target: ItemStack): boolean {
    return findInInventory(
        (item: ItemStack, _) => {
            return target.isItemEqual(item)
        }).length > 0
}

//#endregion
