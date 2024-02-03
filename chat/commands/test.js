const w = (fn) => JavaWrapper.methodToJava(() => {
    fn()
    return true;
  })
  
  
let listener = null;
  const disable = () => {
    if (listener) JsMacros.off(listener);
    Array.from(World.getEntities())
      .forEach(e => e.setGlowing(false))
  }
  const enable = (filter) => () => {
    disable();
    listener = JsMacros.on('Tick', JavaWrapper.methodToJava(() => {
      Array.from(World.getEntities())
        .forEach((e) => {
          e.setGlowing(filter(e))
        });
  
      return Client;
    }))
  }
  Chat.createCommandBuilder('glow')
    .literalArg('off').executes(w(disable)).or()
    .literalArg('dirt').executes(w(enable(e => e.getType() === 'minecraft:dirt'))).or()
    .literalArg('all').executes(w(enable(() => true)))
    .register()
  
  event.stopListener = JavaWrapper.methodToJava(() => {
    disable();
    Chat.getCommandManager().unregisterCommand('glow');
  })