// MADE BY discord: MotokoKusanagi#5346
// config
const ORE_CUBE_DEBUG = true; // logs additional message(s)

function posCoords(pos) {
    return [pos.getX(), pos.getY(), pos.getZ()];
}


function end() {
    Chat.log(`Ore cube deactivated!`);
   
    // CLEAR UP DISPLAY
    const oreCubeUI = GlobalVars.getObject("oreCubeUI");
    oreCubeUI.unregister();
    if (ORE_CUBE_DEBUG) {
        Chat.log("UI cleared!");
    }
    GlobalVars.remove("oreCubeDraw");
    GlobalVars.remove("isOreCubeActive");
}

function start() {
    Chat.log("Ore cube actived!");
    const cuberadius = 7
    const Draw = Hud.createDraw3D();
    const loc = Player.getPlayer().getPos().add(0,2,0);

    Draw.addBox(
        ...posCoords(loc).map(e=>e+cuberadius-0.01), // start coords 
        ...posCoords(loc).map(e=>e-cuberadius-0.01), // end coords
        0, // color
        255, // fill color
        0xffffff, // fill color
        Math.floor(1/3 * 255), // fill alpha
        true, // fill
        true // cull
        );

    Hud.registerDraw3D(Draw);
    GlobalVars.putObject("oreCubeUI", Draw);
}

function oreCube() {
    
    const isActive = !!GlobalVars.getBoolean("isOreCubeActive");
    const loc = Player.getPlayer().getPos();
    if (ORE_CUBE_DEBUG) {
        Chat.log(`Center of ore cube: ${loc.toString()}`);
    }


    if (isActive) { // disable cube
        end();        
    } else { // draw cube
        start();
    }

    GlobalVars.putBoolean("isOreCubeActive", !isActive);
}

oreCube();
