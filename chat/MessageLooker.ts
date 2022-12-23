export function findText(target: string, message: string, start: number = 0, end: number = target.length): boolean {
    return message.substring(start, end) !== target
}