const {Logger} = require("../../lib/Logger.js")
const {startEnd, distFromHere} = require("./selectBlock.js")
const {centerSelf, blocksForward} = require("../../lib/move.js")
const {lookAngle, horLookVec, flipYaw} = require("../../lib/look.js")
const {distance } = require("../../lib/coords.js")

const logger = new Logger("wheatbot Icenian wall", "wheat.log", Logger.llog.debug, Logger.llog.debug)
const user = Player.getPlayer()
const start = {}
// should follow PositionCommon.createPos(X, Y, Z)
const width = 0
let length = 5

// FUNCTIONS
/**
 * Go through line column of crops, harvest all. 
 * @param {*} length how long the column of crops is
 */
function snortLine(length) {
    //const goalPos = 
    KeyBind.keyBind("key.use", true);
    blocksForward(length)
    KeyBind.keyBind("key.use", false);

}

function dumpProduct() {

}


// MAIN
function Main() {
    //centerSelf()
    //lookAngle(40, -90)

    //const [end, start] = startEnd()
    if (!length)
        length = distFromHere()

    //snortLine(length)
}

Main()





