import { EventListener } from "../lib/Types"

let eventListeners: EventListener[] = []
let recordingToggle: string = "key.keyboard.u"


class KeyPress {
    public Key: string
    public Mod: string
    private _startTime: number
    private _endTime: number
    private _duration: number

    constructor(key: string, mod: string, startTime = Date.now()) {
        this.Key = key
        this.Mod = mod
        this._startTime = startTime
    }

    public Completed(): boolean {
        return this._startTime !== undefined && this._endTime !== undefined
    }

    public Stop(endTime = Date.now()): void {
        this._endTime = endTime
    }

    //** Time in milliseconds */
    public Duration(): number {
        if (this._duration === undefined) {
            if (this.Completed()) {
                this._duration = this._endTime - this._startTime
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
        Chat.log("Completed keys:")
        completedKeyPresses.forEach(k => {
            Chat.log(k.toString())
        });
        Chat.log("\nIncompleted Keys:")
        incompleteKeyPresses.forEach((v, k, m) => {
            Chat.log(v.toString())
        })
    }
    addKey(e)
    Chat.log(JsMacros.listeners("Key").length)
}


const keyListener: EventListener = JsMacros.on("Key", JavaWrapper.methodToJavaAsync(keyPressed))
eventListeners.push(keyListener)






const service = (event as Events.Service)
service["stopListener"] = JavaWrapper.methodToJavaAsync(() => {
    eventListeners.forEach(e => { JsMacros.off(e) });
})
