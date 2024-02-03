// MADE BY discord: MotokoKusanagi#5346

function chatLogWindow() {
    const Draw = Hud.createDraw2D();

    // get dimensions of the screen
    const screenWidth: number = Draw.getWidth(); // length of X dimension
    const screenHeight: number = Draw.getHeight(); // length of Y dimension

    function screenWidthPercent(percent: number) {
        return Math.floor(screenWidth * percent)
    }

    function screenHeightPercent(percent: number) {
        return Math.floor(screenHeight * percent)
    }
    
    // name of screen and whether screen background is dirt or transparent
    let screen = (Hud.createScreen("Item Exchange Helper" /* screen title */, false /* dirt background */) as any);
    
    let textField: string = "Enter text in the box.";
    
    // list of elements to add to the screen
    let elements = [
        {   // CLOSE BUTTON
            add: screen.addButton,
            callback: () => screen.close(),
            xOffset: screenWidthPercent(0.5),
            yOffset: screenHeightPercent(0.55),
            width: 50,
            height: 20,
            text: "Close",
        },
        {   // item search bar input
            add: screen.addTextInput,
            callback: (str: string) => {
                textField = str;
            },
            xOffset: screenWidthPercent(0.01),
            yOffset: screenHeightPercent(0.10),
            width: screenWidthPercent(0.20),
            height: 20,
            text: "Enter message",
        },
        {
            // log text input button
            add: screen.addButton,
            callback: () => Chat.log((textField as any)),
            xOffset: screenWidthPercent(0.22),
            yOffset: screenHeightPercent(0.1),
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
