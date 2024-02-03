export type Delegate<I,J,K> = (itemA: I, itemBList: J[]) => K

export type EventListener = Java.xyz.wagyourtail.jsmacros.core.event.IEventListener