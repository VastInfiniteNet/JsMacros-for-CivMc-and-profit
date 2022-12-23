import { itemId, itemName, ItemStack } from "./Item"

export type ItemSlot = [slot: number, item: ItemStack]

export enum InventoryStorageSections {
    hotbar = "hotbar",
    main = "main",
    offhand = "offhand"
}
export enum ArmorSlotSections {
    helmet = "helmet",
    chestplate = "chestplate",
    leggings = "leggings",
    boots = "boots"
}
export enum CraftingSlotSections{
    crafting_in = "crafting_in",
    craft_out = "craft_out"
} 
type InventorySection = InventoryStorageSections | ArmorSlotSections | CraftingSlotSections

/**
 * Inventory slot numbers associated with the inventory section
 * @param section 
 * @returns 
 */
export function getInvSectionSlots(section: InventorySection): number[] {
    const sectionSlots = new Array<number>()
    for (var slot of Player.openInventory().getMap().get(section)) {
        sectionSlots.push(slot)
    }
    return sectionSlots
}

export function getInvSectionItems(section: InventorySection): ItemSlot[] {
    const sectionItems: ItemSlot[] = []
    for (var slot of getInvSectionSlots(section)) {
        sectionItems.push([slot, Player.openInventory().getSlot(slot)])
    }
    return sectionItems
}

function getEntireSectionItems(section: typeof ArmorSlotSections | 
                                        typeof InventoryStorageSections | 
                                        typeof CraftingSlotSections): ItemSlot[] {
    let sectionItems: ItemSlot[] = []
    for (var subsection in section) {
        Chat.log(subsection)
        sectionItems = sectionItems.concat(getInvSectionItems(section[subsection]))
    }
    return sectionItems
}

export function getArmorSlotItems(): ItemSlot[] {
    return getEntireSectionItems(ArmorSlotSections)
}

export function getCraftingSlotItems(): ItemSlot[] {
    return getEntireSectionItems(CraftingSlotSections)
}

export function getStorageSlotItems(): ItemSlot[] {
    return getEntireSectionItems(InventoryStorageSections)
}

export function getHeldItem(): ItemStack {
    return getInvSectionItems(InventoryStorageSections.hotbar)[
        Player.openInventory().getSelectedHotbarSlotIndex()
    ][1]
}

export function slotCount(): number {
    return Player.openInventory().getTotalSlots()
}

function find(predicate: (item: ItemStack, itemList: ItemSlot[]) => boolean): ItemSlot[] {
    const items: ItemSlot[] = []

    for (let [idx,item] of getStorageSlotItems()) {
        if (predicate(item, items)) {
            items.push([idx, item])
        }
    }

    return items
}

export function findSimiliarItems(  name:string = null, id:string = null): ItemSlot[] {
    return find(
        (item: ItemStack, _) => {
            return itemName(item) == name || itemId(item) == id
        }
    )
}

export function isSimiliarItemPresent(item: ItemStack): boolean {
    return findSimiliarItems(itemName(item), itemId(item)).length > 0
}

export function isItemPresent(target: ItemStack): boolean {
    return find(
        (item: ItemStack, _) => {
            return target.isItemEqual(item)
        }).length > 0
}

