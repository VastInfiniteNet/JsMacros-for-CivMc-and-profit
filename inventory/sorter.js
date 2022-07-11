const inv = Player.openInventory()
const sections = {
    main: [9,35],
    hotbar: [36, 44],
}

function bubbleSort(startSlot, endSlot) {
    for (let i = startSlot; i < endSlot + 1; i++) {
        for (let j = startSlot; j < endSlot; j++) {
            if ( inv.getSlot(j).getName().getString() < inv.getSlot(j+1).getName().getString() )
                inv.swap(j, j+1)
        }
    }
}

function partition(low, high) {
    let pivot = inv.getSlot(high)

    let i = low - 1
    for (let j = low; j <= high - 1; j++) {

        if (inv.getSlot(j).getName().getString() < pivot.getName().getString()) {
            i++;
            inv.swap(i, j)
        }
    }
    inv.swap(i+1, high)
    Client.waitTick(1)
    return i+1
}

/**
 * BROKEN BROKEN BROKEN
 * @param {*} low 
 * @param {*} high 
 */
function quickSort(low, high) {
    if (low < high) {
        let pi = partition(low, high)

        quickSort(low, pi - 1)
        quickSort(pi + 1, high)
    }
}

function sort(startSlot, endSlot) {
    bubbleSort(startSlot, endSlot)
}

sort(...sections.hotbar)
sort(...sections.main)