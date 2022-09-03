const {Logger} = require("../lib/Logger.js") 
const {heldItem} = require("../lib/inventory.js")

const logger = new Logger("repair cost", "repairCost.log", chatLevel=Logger.llog.debug)

function printRepairCost() {
    const item = heldItem.getNBT()
    if (item === null)
        return
    let repairCost = item.get("RepairCost")
    if (repairCost === null) 
        repairCost = 0
    else if (repairCost.isNumber())
        repairCost = repairCost.asNumberHelper().asInt()
    const partialRepairFee = 2
    const totalRepairCost = repairCost + partialRepairFee
    logger.log(`${heldItem.getName().getString()} (times repaired: ${Math.log2(repairCost+1)}):
    ${totalRepairCost} levels to repair again`)
    //Bottles needed: ${}-${}`)
}

printRepairCost()
