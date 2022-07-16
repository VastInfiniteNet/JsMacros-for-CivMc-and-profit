const itemString = function(item) {
    return `${item.getName().getString()} (${item.getCount()}) dura: (${item.getMaxDamage() - item.getDamage()}/${item.getMaxDamage()})`
}

// first inventory slot number of inventory section
const InvSlots = {
    main: 9,
    hotBar: 36,
    offHand: 45,
}

module.exports = {
    itemToString: itemString,
    InvSlots: InvSlots,
}