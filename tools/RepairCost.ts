import { getHeldItem } from "../lib/Inventory"
import { ItemStack, NBTElementHelper } from "../lib/Item"
import { LogOptions, Logger } from "../lib/Logger"

const logger: Logger = new Logger("repair cost", "repairCost.log", LogOptions.NONE)

export function getRepairCost(item: ItemStack = getHeldItem()): [number, number] {
    const itemNBT: NBTElementHelper = item.getNBT()
    if (!(itemNBT?.isCompound()) || itemNBT.asCompoundHelper().get("Enchantments") == null)
        return null

    let repairCostNBT = itemNBT.asCompoundHelper().get("RepairCost")
    let repairCost: number = 0
    if (repairCostNBT?.isNumber())
        repairCost = repairCostNBT.asNumberHelper().asInt()

    const partialRepairFee: number = 2
    const totalRepairCost: number = repairCost + partialRepairFee

    return [totalRepairCost, Math.log2(repairCost+1)]
}

export function printRepairCost(item: ItemStack = getHeldItem()): void {
    const costs = getRepairCost()
    if (costs == null)
        logger.Debug(`${item.getName().getString()} can not be repaired.`)
    else 
        logger.Prod(`${item.getName().getString()} (${costs[1]} repairs): ${costs[0]} levels to repair`)
}

printRepairCost()