// log a chat message for every item you pick up
import { Logger, LogOptions } from "../lib/Logger";
const logger: Logger = new Logger("pickup", "pickup.log", LogOptions.positioning | LogOptions.direction)

// sent as script to be triggered by "recvmessage" event
const i = (event as Events.ItemPickup).item;
logger.log(`You picked up ${i.getCount()} ${i.getName().getString()}`);