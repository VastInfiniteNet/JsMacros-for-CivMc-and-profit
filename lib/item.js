function itemName(item) {
    return item.getDefaultName().getString()
}

function itemId(item) {
    return item.getItemId()
}

function itemToString(item) {
    return `${itemName(item)} (${item.getCount()}) \
    (${item.getMaxDamage() - item.getDamage()}/${item.getMaxDamage()})`
}

function areSimilar(i1, i2) {
    return itemId(i1) === itemId(i2)
}

function areVerySimilar(i1,i2) {
    return  areSimilar(i1, i2)
            && i1.getDamage() === i2.getDamage()
            && i1.getCount() === i2.getCount()
}

module.exports = {
    itemName: itemName,
    itemId: itemId,
    itemToString: itemToString,
    areVerySimilar: areVerySimilar,
}