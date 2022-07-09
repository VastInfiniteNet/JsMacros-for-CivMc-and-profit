

let clear = function() {
    const dd = GlobalVars.getObject("drawDemo");
    if (dd) {
        dd.unregister();    
    }
    GlobalVars.remove("drawDemo");
};

module.exports = {
    clear: clear,
};

clear();
Chat.log("Cleared draw.js drawings!");

