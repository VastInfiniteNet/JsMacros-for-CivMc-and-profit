// MADE BY discord: MotokoKusanagi#5346
// alias
const Draw = Hud.createDraw2D();


const screenWidth = Draw.getWidth();
const screenHeight = Draw.getHeight();

let screen = Hud.createScreen("Hello World!", false);

let closeScreen = function () {
    screen.close();
}

screen.setOnInit(JavaWrapper.methodToJava( () => {
    screen.addButton(
        parseInt(screenWidth/2 - 50), parseInt(screenHeight/2 - 20), 
        50, 20, "exit",
        JavaWrapper.methodToJava(closeScreen)
        );
} ));

Hud.openScreen(screen);