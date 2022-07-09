require("./clear.js");
const h3d = Hud.createDraw3D();

const MAX_COLOR = 0xffffff;

const pos = Player.getPlayer().getPos();
const x = pos.getX() - 10;
const y = pos.getY() + 1;
const z = pos.getZ() + 5;

for (let index = 0; index < 16; index++) {
    let color = index * Math.floor(Math.random() * MAX_COLOR);
    h3d.addBox( x + index,  y,    z, 
        x + index + 1,  y+1,    z+0.5, 
        color, 255, 
        color, 255,
        true, true);
}

Hud.registerDraw3D(h3d);
GlobalVars.putObject("drawDemo", h3d);