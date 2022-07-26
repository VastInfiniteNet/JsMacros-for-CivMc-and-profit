function itemName(item) {
    return item.getName().getString()
}

function itemToString(item) {
    return `${itemName(item)} (${item.getCount()}) 
    dura: (${item.getMaxDamage() - item.getDamage()}/${item.getMaxDamage()})`
}

module.exports = {
    itemName: itemName,
    itemToString: itemToString,
}