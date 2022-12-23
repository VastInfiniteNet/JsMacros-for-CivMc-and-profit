export type ItemStack = Java.xyz.wagyourtail.jsmacros.client.api.helpers.ItemStackHelper 
export type NBTElementHelper = Java.xyz.wagyourtail.jsmacros.client.api.helpers.NBTElementHelper<any>

export function itemName(item: ItemStack): string {
    return item.getDefaultName().getString()
}

export function itemId(item: ItemStack): string {
    return item.getItemId()
}

export function itemToString(item: ItemStack): string {
    return `${itemName(item)} (${item.getCount()}) \
    (${item.getMaxDamage() - item.getDamage()}/${item.getMaxDamage()})`
}

export function areSimilar(i1: ItemStack, i2: ItemStack): boolean {
    return itemId(i1) === itemId(i2)
}

export function areVerySimilar(i1: ItemStack, i2: ItemStack): boolean {
    return  areSimilar(i1, i2)
            && i1.getDamage() === i2.getDamage()
            && i1.getCount() === i2.getCount()
}

/**
 * 
 * @param {*} itemStack 
 * @returns 
 */
export function isAir(itemStack: ItemStack): boolean {
    return itemId(itemStack) == "minecraft:air"
}

function slotEmpty() {

}
