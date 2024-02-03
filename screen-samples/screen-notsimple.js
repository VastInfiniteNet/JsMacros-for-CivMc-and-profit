// MADE BY discord: MotokoKusanagi#5346
// alias
const Draw = Hud.createDraw2D();

// get dimensions of the screen
const screenWidth = Draw.getWidth();
const screenHeight = Draw.getHeight();

// name of screen and whether screen background is dirt or transparent
const screenTitle = "Hello World!";
const isDirtBG = false;
let screen = Hud.createScreen(screenTitle, isDirtBG);

var textField = "";

// list of elements to add to the screen
let elements = [
    {   // CLOSE BUTTON
        add: screen.addButton,
        text: "Close",
        width: 50,
        height: 20,
        xOffset: screenWidth/2 - 50,
        yOffset: screenHeight/2 + 25,
        callback: () => screen.close()
    },
    {   // text input
        add: screen.addTextInput,
        text: "Enter Message Here",
        width: 200,
        height: 20,
        xOffset: screenWidth/2 - 200,
        yOffset: screenHeight/2,
        callback: (str) => {textField = str}
    },
    {
        // log text input
        add: screen.addButton,
        text: "Log",
        width: 40,
        height: 20,
        xOffset: screenWidth/2 + 5,
        yOffset: screenHeight/2,
        callback: () => Chat.log(textField)
    }
];

function cleanScreenParams(e) {
    return {
        add: e.add,
        text: e.text.toString(),
        width: Math.floor(e.width),
        height: Math.floor(e.height), 
        xOffset: Math.floor(e.xOffset),
        yOffset: Math.floor(e.yOffset),
        callback: e.callback
    }
}

// what the initial screen should look like
function initScreen()
{
    // adds elements to the screen
    elements.forEach(o => {
        let = e = cleanScreenParams(o)
        Chat.log(e.text)
        let method = e.add;
        method(e.xOffset, e.yOffset, e.width, e.height, e.text,
            JavaWrapper.methodToJava(e.callback));
    });
    
}

// how to initialize the screen
function setInitScreen()
{
    screen.setOnInit(JavaWrapper.methodToJava(initScreen));
}

// set initializer and show screen
setInitScreen();
Hud.openScreen(screen);