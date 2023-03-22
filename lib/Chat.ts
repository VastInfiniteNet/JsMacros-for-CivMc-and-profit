/**
 * Functions related to sending, receiving, reading, saving chat messages. 
 */

/** Imports/exports */
import { Constants } from "./Constants"

export function setChatGroup(group:string = Constants.DEFAULT_GC_GROUP): void {
    const command = `/g ${group}`
    Chat.say(command)
}