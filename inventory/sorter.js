/**
 * A simple inventory sorter.
 * Author: MotokoKusanagi#5346
 * TODO: 
 * - fix empty slots (air slots) being weird
 * - configurable/custom sorting order selection
 */

const chat = require("../chat/chat")
const { invSection } = require("../lib/inventory")
const { itemId, isAir } = require("../lib/item")
const {Logger} = require("../lib/Logger")


const logger = new Logger("Inventory sorter", "sorter.log", Logger.llog.debug)

/**
 * 
 * @param {number} itemStackA 
 * @param {number} itemStackB 
 * @return  -1 if slot A is before slot B
 *          0 if slots are equal
 *          1 if slot A is after slot B
 */
function cmpFunc(slotNumA, slotNumB) {
    const inv = Player.openInventory()
    const itemA = inv.getSlot(slotNumA)
    const itemB = inv.getSlot(slotNumB)
    if (isAir(itemA) && isAir(itemB)) {
        //return 0
    }
    if (isAir(itemA)) {
        return 1
    }
    if (isAir(itemB)) {
        return -1
    }
    return itemId(itemA).localeCompare(itemId(itemB))
}

function sortInv(section) {
    Chat.log(`Sorting ${section}`)
    const SLOTS = [...invSection(section)]
    let start = [...SLOTS]
    const goal = [...SLOTS]
    goal.sort(cmpFunc)

    //Chat.log(`Start slots: ${start.join(" ")}`)
    //Chat.log(`Goal slots:  ${goal.join(" ")}`)

    const base = Math.min(...SLOTS)
    const destinationForSlot = (slotNum) => base + goal.indexOf(slotNum)

    let actions = new Map() // something wrong with empty slots
    for (let i = 0; i < start.length; i++) {
        if (start[i] != goal[i])
            actions.set(start[i], destinationForSlot(start[i]))
    }
    Chat.log(`Action list: (${[...actions].join("),  (")})`)

    const inv = Player.openInventory()
    while (actions.size > 0) {
        let pos = [...actions][0][0]
        let dest = actions.get(pos)

        inv.click(pos) // pick up wrong item
        inv.click(dest) //place down 
        actions.delete(pos)
        Client.waitTick()

        while(!isAir(inv.getHeld())) { // still holding an item
            pos = dest
            dest = actions.get(pos)
            inv.click(dest)
            actions.delete(pos)
            Client.waitTick()
        }
    }

    Chat.log("Done sorting.")
    World.playSound("entity.villager.celebrate", 1, 1)

}

sortInv("hotbar")