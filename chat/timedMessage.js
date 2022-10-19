const message = "Hi Hg__80"
const waitPeriod = 20 * 60 * 10

while (true) {
    Chat.say(message)
    Client.waitTick(waitPeriod)
}