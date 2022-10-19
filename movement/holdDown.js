"use strict";
exports.__esModule = true;
var Logger_1 = require("../lib/Logger");
var logger = new Logger_1.Logger("Hold Down", "holdDown.log");
var key = "key.forward";
function hold() {
    logger.Prod("Setting ".concat(key, " to true"));
    KeyBind.keyBind(key, true);
}
hold();
