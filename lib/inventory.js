let { itemName, itemId } = require("./item.js")

function invMap() {
    return Player.openInventory().getMap()
}

function hotBarSlots() {
    return Player.openInventory().getMap().get("hotbar")
}

function mainSlots() {
    return Player.openInventory().getMap().get("main")
}

function offHandSlot() {
    return Player.openInventory().getMap().get("offhand")
}

function onHandItem() {
    return Player.openInventory().getSlot(Player.openInventory().getMap().get("hotbar")[
        Player.openInventory().getSelectedHotbarSlotIndex()
    ])
}

function slotCount() {
    return Player.openInventory().getTotalSlots()
}

function getItemsFrom(section) {
    items = []
    slots = Player.openInventory().getMap().get(section, [0, 0])
    for(let slot = slots[0]; slot < slots[slots.length - 1]; slot++ ) {
        items.push(inv.getSlot(slot))
    }
    return items
}

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

function isSimilarItemInInventory(item) {
    return findSimilarItems(id=itemId(item)).some(({_,i})=>item.isItemEqual(i))
}

function isItemInInventory(item) {
    return findSimilarItems(id=itemId(item)).some(c=>areVerySimilar(c,item))
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
}