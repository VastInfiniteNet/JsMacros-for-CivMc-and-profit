// MADE BY discord: MotokoKusanagi#5346
// log a chat message for every item you pick up
import { Logger, LogOptions } from "../lib/Logger";

const logger: Logger = new Logger("pickup", "pickup.log", LogOptions.positioning + LogOptions.direction)

// MADE BY discord: MotokoKusanagi#5346
// echos recieved chat messages back as logs
// sent as script to be triggered by "recvmessage" event
const i = event.item;
logger.log(`You picked up ${i.getCount()} ${i.getName().getString()}`);
