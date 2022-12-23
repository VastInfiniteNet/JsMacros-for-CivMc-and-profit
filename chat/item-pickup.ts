/**
 * Upon picking up an item, logs information about the item.
 */
import { Logger, LogOptions } from "../lib/Logger";
const logger: Logger = new Logger("pickup", "pickup.log", LogOptions.POSITIONING | LogOptions.DIRECTION)

const i = (event as Events.ItemPickup).item;
logger.Info(`You picked up ${i.getCount()} ${i.getName().getString()}`);