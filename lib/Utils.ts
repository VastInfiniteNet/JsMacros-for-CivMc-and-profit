/**
 * Wholey taken from https://github.com/pontaoski/BotCore/blob/master/scripts/utils.ts
 * 
 * Credit: Janet Blackquill (https://github.com/pontaoski)
 */

import { Pos3D } from "./Coords";
import BaseEvent = Events.BaseEvent;
import { ItemStack } from "./Item";

export class CancellationToken {
    cancelled: boolean

    constructor() {
        this.cancelled = false
    }
    throwIfCancelled() {
        throw new Error("Cancelled")
    }
    isCancelled(): boolean {
        return this.cancelled
    }
    cancel() {
        this.cancelled = true
    }
}

export function eventPromise<T extends BaseEvent>(eventName: string): Promise<T> {
    return new Promise(resolve => {
        JsMacros.once(eventName, JavaWrapper.methodToJava((event: T): any => {
            resolve(event)
        }))
    })
}

export function eventUntil<T extends BaseEvent>(eventName: string, predicate: (event: T) => boolean): Promise<T> {
    return new Promise((resolve) => {
        const listener = JsMacros.on(eventName, JavaWrapper.methodToJava((event: T): any => {
            if (predicate(event)) {
                JsMacros.off(listener)
                resolve(event)
            }
        }))
    })
}

export function waitTick(): Promise<void> {
    return new Promise((resolve) => {
        JsMacros.once("Tick", JavaWrapper.methodToJava((ev: BaseEvent): any => {
            resolve()
        }))
    })
}

export async function waitTicks(count: number): Promise<number> {
    for (let i = 0; i < count; i++) {
        await waitTick()
    }
    return count
}

export async function spawn(callback: () => Promise<void>): Promise<void> {
    await callback()
}

export function pos(): Pos3D {
    return Player.getPlayer().getPos()
}

export async function doUntilObstructed(callback: () => void): Promise<void> {
    let {x: lastX, y: lastY, z: lastZ} = pos()

    do {
        lastX = pos().x, lastY = pos().y, lastZ = pos().z
        callback()
        await waitTicks(2)
    } while (lastX != pos().x || lastY != pos().y || lastZ != pos().z)
}

export async function pressFor(key: string, duration: number): Promise<void> {
    Chat.log(`Pressing ${key} for ${duration/1000*20} ticks.`)
    KeyBind.key(key, true)

    setTimeout(() => {
    KeyBind.key(key, false)
    Chat.log(`Released ${key}`)
    }, duration);

}

export async function walkForwardUntilObstructed(sneak: boolean = true): Promise<void> {
    //snapToCardinal()
    await doUntilObstructed(() => {
        KeyBind.keyBind("key.sneak", sneak)
        KeyBind.keyBind("key.forward", true)
    })
    KeyBind.keyBind("key.forward", false)
    if (sneak) {
        await pressFor("key.back", 2)
        KeyBind.keyBind("key.sneak", false)
    }
}

export async function walkForwardFor(blocks: number): Promise<void> {
    //snapToCardinal()

    let {x: firstX, y: firstY, z: firstZ} = pos()
    let {x: lastX, y: lastY, z: lastZ} = pos()

    const distance = () => {
        const dx = firstX - lastX
        const dy = firstY - lastY
        const dz = firstZ - lastZ
        const d = Math.sqrt(dx**2 + dy**2 + dz**2)
        return d
    }

    KeyBind.keyBind("key.forward", true)
    KeyBind.keyBind("key.sneak", true)
    do {
        lastX = pos().x, lastY = pos().y, lastZ = pos().z
        await waitTick()
    } while ((distance() - blocks) < -0.4)
    KeyBind.keyBind("key.forward", false)
    KeyBind.keyBind("key.sneak", false)
}


export function countItems(callback: (item: ItemStack) => boolean): number {
    const inventory = Player.openInventory()
    let count = 0
    for (let i = 0; i < inventory.getTotalSlots(); i++) {
        const slot = inventory.getSlot(i)
        if (callback(slot)) {
            count += slot.getCount()
        }
    }
    return count
}

export function holdItem(callback: (item: ItemStack) => boolean): boolean {
    const inventory = Player.openInventory()
    const hand = inventory.getSlot(inventory.getMap()["hotbar"][inventory.getSelectedHotbarSlotIndex()])
    if (callback(hand)) {
        return true
    }

    let ok = false
    for (let i = 0; i < inventory.getTotalSlots(); i++) {
        const slot = inventory.getSlot(i)
        if (callback(slot)) {
            inventory.swapHotbar(i, inventory.getSelectedHotbarSlotIndex())
            ok = true
            break
        }
    }
    inventory.close()
    return ok
}

export function isEnchanted(item: ItemStack): boolean {
    if (!item.getNBT()?.asCompoundHelper().has(`Enchantments`))
        return false

    return item.getNBT()?.asCompoundHelper().get(`Enchantments`).asListHelper().length() > 0
}

export function shouldUse(item: ItemStack): boolean {
    const pricey = item.getItemID().includes(`netherite`) || isEnchanted(item)
    if (pricey && (item.getMaxDamage() - item.getDamage()) < 10)
        return false

    return true
}

export function holdPickaxe(): boolean {
    return holdItem((item) => {
        return item.getItemID().includes("pickaxe") && shouldUse(item)
    })
}

export function holdAxe(): boolean {
    return holdItem((item) => {
        return item.getItemID().includes("_axe") && shouldUse(item)
    });
}

let _suspendGuards = false

export function suspendGuard() {
    _suspendGuards = true
}

export function stopSuspendGuard() {
    _suspendGuards = false
}

export function launchPickaxeGuard(callback: () => void): void {
    JsMacros.on("HeldItemChange" as const, JavaWrapper.methodToJava((hi: Events.HeldItemChange): any => {
        if (_suspendGuards) return

        let ok = holdPickaxe()
        if (!ok) {
            Chat.log("No more pickaxes! :/" as any)
            callback()
        }
    }))
}

export function launchAxeGuard(callback: () => void): void {
    JsMacros.on("HeldItemChange" as const, JavaWrapper.methodToJava((hi: Events.HeldItemChange): any => {
        if (_suspendGuards) return

        let ok = holdAxe()
        if (!ok) {
            Chat.log("No more axes! :/" as any)
            callback()
        }
    }))
}

export function launchVeinGuard(callback: () => void): void {
    JsMacros.on("RecvMessage" as const, JavaWrapper.methodToJava((hi: Events.RecvMessage): any => {
        if (hi.text.getString().includes("You sense a")) {
            callback()
        }
    }))
}

export function launchExitGuard(callback: () => void): void {
    JsMacros.on("Key" as const, JavaWrapper.methodToJava((hi: Events.Key): any => {
        if (hi.key == "key.keyboard.x") {
            callback()
        }
    }))
}

export async function ensureFed(): Promise<boolean> {
    const MinimumFood = 12
    const FoodItems = [
        "minecraft:apple",
        "minecraft:mushroom_stew",
        "minecraft:bread",
        "minecraft:cooked_porkchop",
        "minecraft:cooked_cod",
        "minecraft:cooked_salmon",
        "minecraft:cookie",
        "minecraft:melon_slice",
        "minecraft:cooked_beef",
        "minecraft:cooked_chicken",
        "minecraft:carrot",
        "minecraft:baked_potato",
        "minecraft:pumpkin_pie",
        "minecraft:cooked_rabbit",
        "minecraft:rabbit_stew",
        "minecraft:cooked_mutton",
        "minecraft:beetroot_soup",
        "minecraft:sweet_berries",
    ]

    if (Player.getPlayer().getFoodLevel() >= MinimumFood) {
        return true
    }
    suspendGuard()
    for (const food of FoodItems) {
        while (Player.getPlayer().getFoodLevel() < MinimumFood && holdItem(item => item.getItemID() == food)) {
            KeyBind.keyBind("key.use", true)
            await waitTicks(5)
        }
        KeyBind.keyBind("key.use", false)
    }
    stopSuspendGuard()
    return Player.getPlayer().getFoodLevel() < MinimumFood
}