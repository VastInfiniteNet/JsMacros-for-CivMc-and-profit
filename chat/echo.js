const {Logger, llogs} = require("../lib/logging/Logger.js") 

const logger = new Logger(llogs.debug, "echo", "echo.log")

// MADE BY discord: MotokoKusanagi#5346
// echos recieved chat messages back as logs
// sent as script to be triggered by "recvmessage" event
logger.log(`Message: '${event.text.getString()}'`)