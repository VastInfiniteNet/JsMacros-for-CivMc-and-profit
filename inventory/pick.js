let item = event.item;
let damage = event.damage;

let pick = function(item) {
    let f = function(item) {
        let i = Player.openInventory();
        let n = i.getTotalSlots();
        for (let k = 0; k < n; k++) {
            let thing = i.getSlot(k);
            Chat.log(`Slot ${k} has ${thing.getCount()} ${thing.getName().getString()}`);
            if (thing.getName().getString() === item) {
                Chat.log(`FOUND MATCH ${item} in slot ${k}`);
                
                return true;
            }
        }
    }
    let r = f(item);
}

Chat.log(`Item ${item.getName().getString()} took damage: ${damage}`);