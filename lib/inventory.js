
const inv = Player.openInventory()

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
    return Player.openInventory().getMap().get("main")[0]
}

function getItemsFrom(section) {
    items = []
    slots = Player.openInventory().getMap().get(section, [0, 0])
    for(let slot = slots[0]; slot < slots[slots.length - 1]; slot++ ) {
        items.push(inv.getSlot(slot))
    }
    return items
}

module.exports = {
    getItemsFrom: getItemsFrom,
    offHandSlot: offHandSlot,
    hotBarSlots: hotBarSlots,
    mainSlots: mainSlots,
}