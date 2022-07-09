// MADE BY discord: MotokoKusanagi#5346

// config
const DEBUG = false; // logs additional message(s)
const tapeTime = 5; // number of seconds for blocks to be marked for

function posCoords(pos) {
    return [pos.getX(), pos.getY(), pos.getZ()];
}

function round(pos) {
    const [x, y, z] = posCoords(pos).map(e=>Math.floor(e));
    const newPos = PositionCommon.createPos(x, y, z);
    if (DEBUG) {
        Chat.log(`${pos.toString()} rounded to ${newPos.toString()}`);
    }

    return newPos;
}

function end(Draw, loc) {
    const start = GlobalVars.getObject("tapeMeasurePos");
    Chat.log(`Tape measure deactived!`);
    const distance  = loc.add(start.scale(-1)).toVector().getMagnitude();
    Chat.log(`Distance: ${distance}`);
   
    // draw end line
    Draw.addLine(...(posCoords(start).map(e=>e+0.5)), ...(posCoords(loc).map(e=>e+0.5)), 0);
   
    // HOLD DISPLAY
    Client.waitTick(20 * tapeTime);

    // CLEAR UP DISPLAY
    const startUI = GlobalVars.getObject("tapeMeasureUI");
    startUI.unregister();
    Draw.unregister();
    if (DEBUG) {
        Chat.log("UI cleared!");
    }
    GlobalVars.remove("tapeMeasurePos");
    GlobalVars.remove("tapeMeasureUI");
    GlobalVars.remove("isTapeMeasureActive");
}

function start(Draw, loc) {
    Chat.log("Tape measure actived!");
    GlobalVars.putObject("tapeMeasurePos", loc);
    GlobalVars.putObject("tapeMeasureUI", Draw);
}

function measure() {
    if(GlobalVars.getBoolean("tapeMeasureLock")) {
        Chat.log("Wait to measure again!");
        return;
    }
    GlobalVars.putBoolean("tapeMeasureLock", true); // get lock
    if (DEBUG) {
        Chat.log("Got tapeMeasureLock lock!");
    }

    const isActive = !!GlobalVars.getBoolean("isTapeMeasureActive");
    const loc = round(Player.getPlayer().getPos()).add(0, -1, 0);
    if (DEBUG) {
        Chat.log(`Current location: ${loc.toString()}`);
    }

    const Draw = Hud.createDraw3D();
    Draw.addBox(...posCoords(loc), ...(posCoords(loc).map(e=>e+1)),
                0, 255, 0xffffff, 255, true);

    Hud.registerDraw3D(Draw);


    GlobalVars.putBoolean("isTapeMeasureActive", !isActive);

    if (isActive) { // marks the end
        end(Draw, loc);        
    } else { // marks the start
        start(Draw, loc);
    }


    GlobalVars.putBoolean("tapeMeasureLock", false); // release lock
    if (DEBUG) {
        Chat.log("Release tapeMeasureLock lock!");
    }
}

measure();
