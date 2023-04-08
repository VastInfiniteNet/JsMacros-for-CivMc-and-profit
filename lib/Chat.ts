/**
 * Functions related to sending, receiving, reading, saving chat messages. 
 */

export function setChatGroup(group:string) {
    const command = `/g ${group}`
    Chat.say(command)
}