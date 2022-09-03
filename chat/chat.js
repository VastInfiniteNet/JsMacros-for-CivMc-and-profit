
const DEFAULT_GC_GROUP = "!"

function setDefaultChat(group=DEFAULT_GC_GROUP) {
    Client.waitTick(10)
    const command = `/g ${group}`
    Chat.say(command)
}

module.exports = {
    setDefaultChat: setDefaultChat,
}