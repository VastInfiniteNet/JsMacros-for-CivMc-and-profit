// MADE BY discord: MotokoKusanagi#5346
// alias

const screenWidth = (Hud.createDraw2D()).getWidth();
const screenHeight = (Hud.createDraw2D()).getHeight();

let screen = (Hud.createScreen("Hello World!", false) as any);
screen.setOnInit(JavaWrapper.methodToJava( () => {
    screen.addButton(
        Math.floor(screenWidth/2 - 50), Math.floor(screenHeight/2 - 20), 
        50, 20, "exit",
        JavaWrapper.methodToJava(() => {screen.close()})
        );
} ));

Hud.openScreen(screen);