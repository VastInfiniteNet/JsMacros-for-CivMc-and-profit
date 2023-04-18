import { EventListener } from "../lib/Types"
import { pressFor } from "../lib/Utils"

let eventListeners: EventListener[] = []
let recordingToggle: string = "key.keyboard.u"


class KeyPress {
    public Key: string
    public Mod: string
    public StartTick: number
    public StartTime: number
    private _endTime: number
    private _duration: number

    constructor(key: string, mod: string, startTime = Date.now()) {
        this.Key = key
        this.Mod = mod
        this.StartTime = startTime
    }

    public Completed(): boolean {
        return this.StartTime !== undefined && this._endTime !== undefined
    }

    public Stop(endTime = Date.now()): void {
        this._endTime = endTime
    }

    //** Time in milliseconds. */
    public Duration(): number {
        if (this._duration === undefined) {
            if (this.Completed()) {
                this._duration = this._endTime - this.StartTime
            } else {
                Chat.log("KeyPress not completed.")
                return 0
            }
        }
        return this._duration
    }

    public toString(): string {
        return `Key: ${this.Key}, Mod: ${this.Mod}, Completed: ${this.Completed()} ${this.Completed() ? 'Duration: ' + this.Duration() : ''}`
    }
}

const completedKeyPresses: KeyPress[] = []
const incompleteKeyPresses = new Map<string, KeyPress>();

function addKey(e: Events.Key) { 
    if (incompleteKeyPresses.has(e.key)) { // key pressed finished
        let key = incompleteKeyPresses.get(e.key)
        incompleteKeyPresses.delete(e.key)
        key.Stop()
        completedKeyPresses.push(key)
    } else{ // key pressed started
        incompleteKeyPresses.set(e.key, new KeyPress(e.key, e.mods))
    }
}

function keyPressed(e: Events.Key): void {
    Chat.log(`Key: ${e.key}, Action: ${e.action}, Mod: ${e.mods}`)
    if (e.key == recordingToggle) {
        JsMacros.off(keyListener)
        Chat.log("Key logger off")
        recordingDone()
    }
    addKey(e)
    Chat.log(JsMacros.listeners("Key").length)
}

function recordingDone() {
    Chat.log("Completed keys:")
    completedKeyPresses.forEach(k => {
        Chat.log(k.toString())
    });
    Chat.log("\nIncompleted Keys:")
    incompleteKeyPresses.forEach((v, k, m) => {
        Chat.log(v.toString())
    })
    setStartTicks()
}

function setStartTicks() {
    completedKeyPresses.sort((key1, key2) => {
        if (key1.StartTime < key2.StartTime)
            return -1
        else if (key1.StartTime > key2.StartTime)
            return 1
        else
            return 0
    })

    const initialStartTime: number = completedKeyPresses[0].StartTime
    Chat.log(`Init start time: ${initialStartTime}`)
    completedKeyPresses.forEach(k => {
        k.StartTick = Math.floor((k.StartTime - initialStartTime)/1000*20)
        Chat.log(`Pressing ${k.Key} for ${k.Duration()} ticks starting in ${k.StartTick} ticks.`)
    })
    replayKeys()
}

function replayKeys() {
    let currentTick: number = 0
    let keyQueue = [...completedKeyPresses]

    while (keyQueue.length > 0) {
        Chat.log(currentTick)
        while (keyQueue.length > 0 && keyQueue[0].StartTick == currentTick) {
            const keyPress: KeyPress = keyQueue.shift()
            pressFor(keyPress.Key, keyPress.Duration())
        }
            
        currentTick += 1
        Client.waitTick()
    }
}


const keyListener: EventListener = JsMacros.on("Key", JavaWrapper.methodToJavaAsync(keyPressed))
eventListeners.push(keyListener)


const service = (event as Events.Service)
service["stopListener"] = JavaWrapper.methodToJavaAsync(() => {
    eventListeners.forEach(e => { JsMacros.off(e) });
})
