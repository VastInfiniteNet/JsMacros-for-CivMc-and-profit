function craft(itemId="minecraft:stone_pickaxe") {
    // IF LOOKING AT CRAFTING TABLE
    const player = Player.getPlayer()

    player.interact()
    Client.waitTick(5)

    const  inv = Player.openInventory()
    if (inv.getContainerTitle() !== "Crafting") { // fails if crafting table isn't opene
        Chat.log("FAILED TO OPEN CRAFTING TABLE")
        return false
    }

    inv.getCraftableRecipes().forEach(r => {
        Chat.log(`${r.toString()}`)
        if (r.getId() === itemId) {
            r.craft(true)
        }
    });
    inv.quick(Player.openInventory().getMap().get("output")[0])
    inv.closeAndDrop()
    return true
}

craft()