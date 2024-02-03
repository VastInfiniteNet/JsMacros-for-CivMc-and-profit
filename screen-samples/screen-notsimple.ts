// MADE BY discord: MotokoKusanagi#5346

function chatLogWindow() {
    const Draw = Hud.createDraw2D();

    // get dimensions of the screen
    const screenWidth = Draw.getWidth();
    const screenHeight = Draw.getHeight();
    
    // name of screen and whether screen background is dirt or transparent
    let screen = (Hud.createScreen("Hello World!" /* screen title */, false /* dirt background */) as any);
    
    var textField = "Enter text in the box.";
    
    // list of elements to add to the screen
    let elements = [
        {   // CLOSE BUTTON
            add: screen.addButton,
            callback: () => screen.close(),
            xOffset: Math.floor(screenWidth/2 - 50),
            yOffset: Math.floor(screenHeight/2 + 25),
            width: 50,
            height: 20,
            text: "Close",
        },
        {   // text input
            add: screen.addTextInput,
            callback: (str: string) => {
                textField = str;
            },
            xOffset: Math.floor(screenWidth/2 - 200),
            yOffset: Math.floor(screenHeight/2),
            width: 200,
            height: 20,
            text: "Enter message",
        },
        {
            // log text input button
            add: screen.addButton,
            callback: () => Chat.log((textField as any)),
            xOffset: Math.floor(screenWidth/2 + 5),
            yOffset: Math.floor(screenHeight/2),
            width: 40,
            height: 20,
            text: "Log",
        }
    ];
    

    
    // what the initial screen should look like
    function initScreen()
    {
        // adds elements to the screen
        elements.forEach(e => {
            Chat.log(e.text)
            let [method, callback, ...properties] = Object.values(e)
            Chat.log(`Callback: ${callback}`)
            Chat.log(`Screen object: ${method}`)
            Chat.log(`Properties: ${properties}`)

            method(...properties,
                JavaWrapper.methodToJava(callback));

            Chat.log("\n\n");
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
}

chatLogWindow()
