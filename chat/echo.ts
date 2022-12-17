import { Logger, LogOptions } from "../lib/Logger"

const logger: Logger = new Logger("echo", "echo.log", LogOptions.positioning | LogOptions.direction)

// echos recieved chat messages back as logs
// sent as script to be triggered by "recvmessage" event
logger.Info(`'${(event as Events.RecvMessage).text.getString()}'`)