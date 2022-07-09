const h3d = Hud.createDraw3D();

const MAX_COLOR = 0xffffff;

for (let index = 0; index < 16; index++) {
    h3d.addBox( -3863 + index,  105,    -5461.5, 
        -3863 + index + 1,  106,    -5462, 
        index * Math.floor(Math.random() * MAX_COLOR), 250, 
        index * Math.floor(Math.random() * MAX_COLOR), 250,
        true, true);
}

Hud.registerDraw3D(h3d);
