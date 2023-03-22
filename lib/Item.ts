/**
 * Functions related to item stacks and comparison between stacks.
 */

export type ItemStack = Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper 
export type NBTElementHelper = Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper<any>

/** base name of item */
export function itemName(item: ItemStack): string {
    return item.getDefaultName().getString()
}

export function itemId(item: ItemStack): string {
    return item.getItemId()
}

/** formmated toString for item */
export function itemToString(item: ItemStack): string {
    return `${itemName(item)} (${item.getCount()}) \
    (${item.getMaxDamage() - item.getDamage()}/${item.getMaxDamage()})`
}

/** checks if two items share item ids */
export function areSimilar(i1: ItemStack, i2: ItemStack): boolean {
    return itemId(i1) === itemId(i2)
}

/** checkjs if two items share item ids, damage, and item count. */
export function areVerySimilar(i1: ItemStack, i2: ItemStack): boolean {
    return  areSimilar(i1, i2)
            && i1.getDamage() === i2.getDamage()
            && i1.getCount() === i2.getCount()
}

/**
 * Check if item is air
 * @param {*} itemStack 
 * @returns 
 */
export function isAir(itemStack: ItemStack): boolean {
    return itemId(itemStack) == "minecraft:air"
}

function slotEmpty() {

}
