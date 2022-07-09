Hud.listDraw3Ds().forEach(element => {
    element.unregister()
});

Chat.log("Cleared all drawings!");

GlobalVars.remove("tapeMeasureLock");