let { itemName, itemId } = require("./item.js")

function invSection(section) {
    return Player.openInventory().getMap().get(section)
}

/**
 * 
 * @returns 
 */
function hotBarSlots() {
    return Player.openInventory().getMap().get("hotbar")
}

/**
 * 
 * @returns 
 */
function mainSlots() {
    return Player.openInventory().getMap().get("main")
}

/**
 * 
 * @returns 
 */
function offHandSlot() {
    return Player.openInventory().getMap().get("offhand")
}

/**
 * 
 * @returns 
 */
function onHandItem() {
    return Player.openInventory().getSlot(Player.openInventory().getMap().get("hotbar")[
        Player.openInventory().getSelectedHotbarSlotIndex()
    ])
}

/**
 * 
 * @returns 
 */
function slotCount() {
    return Player.openInventory().getTotalSlots()
}

/**
 * 
 * @param {*} section 
 * @returns 
 */
function getItemsFrom(section) {
    items = []
    slots = Player.openInventory().getMap().get(section, [0, 0])
    for(let slot = slots[0]; slot < slots[slots.length - 1]; slot++ ) {
        items.push(inv.getSlot(slot))
    }
    return items
}

/**
 * 
 * @param {*} name 
 * @param {*} id 
 * @param {*} count 
 * @returns 
 */
function findSimilarItems(name=null, id=null, count=slotCount()) {
    if (name === null && id === null || count < 1)
        return []

    const inv = Player.openInventory()
    const list = []
    let idFunc = name !== null ? itemName  : itemId
    const item = name ?? id

    for (let k of [...hotBarSlots(), ...mainSlots(), ...offHandSlot()]) {
        if (idFunc(inv.getSlot(k)) === item) {
            list.push([k,inv.getSlot(k)])
            if (list.length === count)
                return list
        }
    }

    return list
}

/**
 * 
 * @param {*} item 
 * @returns 
 */
function isSimilarItemInInventory(item) {
    return findSimilarItems(id=itemId(item)).some(({_,i})=>item.isItemEqual(i))
}

/**
 * 
 * @param {*} item 
 * @returns 
 */
function isItemInInventory(item) {
    return findSimilarItems(id=itemId(item)).some(c=>areVerySimilar(c,item))
}

/**
 * Swaps two slots in an opened inventory.
 * @param {number} a slot number
 * @param {number} b slot number
 */
function swapSlots(a, b) {
    var inv = Player.openInventory()
    if (!!inv.getHeld()) {
        inv.closeAndDrop()
        inv = Player.openInventory()
    }
    inv.swap(a,b)
}

module.exports = {
    getItemsFrom: getItemsFrom,
    offHandSlot: offHandSlot,
    hotBarSlots: hotBarSlots,
    mainSlots: mainSlots,
    findSimilarItems: findSimilarItems,
    isSimilarItemInInventory: isSimilarItemInInventory,
    isItemInInventory: isItemInInventory,
    heldItem: onHandItem(),
    invSection: invSection,
}