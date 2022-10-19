const {Logger} = require("../lib/Logger.js") 

const logger = new Logger("echo", "echo.log")

// MADE BY discord: MotokoKusanagi#5346
// echos recieved chat messages back as logs
// sent as script to be triggered by "recvmessage" event
logger.Info(`'${event.text.getString()}'`)