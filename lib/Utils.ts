/**
 * Stolen from https://github.com/pontaoski/BotCore
 */

export class CancellationToken {
    cancelled: boolean

    constructor() {
        this.cancelled = false
    }
    throwIfCancelled() {
        throw new Error("Cancelled")
    }
    isCancelled(): boolean {
        return this.cancelled
    }
    cancel() {
        this.cancelled = true
    }
}
