// MADE BY discord: MotokoKusanagi#5346
// log a chat message for every item you pick up
const i = event.item;
Chat.log(`You picked up ${i.getCount()} ${i.getName().getString()}`);
