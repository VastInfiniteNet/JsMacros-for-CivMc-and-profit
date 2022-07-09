// MADE BY discord: MotokoKusanagi#5346
// makes a 2 high, 1 wide tunnel.

var tunnelLength = 5;
const ttb = {
    "diamond": 0.9,
}
const bufferTime = 0.25;
const totalSeconds = tunnelLength * (ttb["diamond"]*2 + bufferTime);

KeyBind.keyBind("key.forward", true);
KeyBind.keyBind("key.attack", true);

Client.waitTick(20*totalSeconds);

KeyBind.keyBind("key.forward", false);
KeyBind.keyBind("key.attack", false);
