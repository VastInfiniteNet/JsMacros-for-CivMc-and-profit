const AssetExchangeReaderActivity = "isExchangeReaderActive"

function messageChecker(sp, spi, v:Array<string>) {
   let listener = JsMacros.on('RecvMessage', JavaWrapper.methodToJava((e: Events.RecvMessage) => {
      let message = e.text.getStringStripFormatting().split(' ')
      if (message[spi] == sp) {
         v.push(e.text.getStringStripFormatting())
         JsMacros.off(listener)
      }
   }) )
}

function Start() {
   Chat.log("Starting Exchange Reader...")
   let exchangeRecord = []

   messageChecker("Input:", 0, exchangeRecord)
   const ec = JsMacros.waitForEvent('RecvMessage')

   ec.context.releaseLock();
   messageChecker("Output:", 0, exchangeRecord)
   messageChecker("available.", 2, exchangeRecord)
   Chat.log("ON")
   Client.waitTick(20 * 3)
   Chat.log("OFF")

   Chat.log(exchangeRecord)
   GlobalVars.putBoolean(AssetExchangeReaderActivity, true)
}

function RecordExchanges() {
}

function Stop() {
   Chat.log("Stopping Exchange Reader...")
   GlobalVars.remove(AssetExchangeReaderActivity)
}


function Run() {
   if (false) { // already running
      RecordExchanges()
      Stop()
   }
   else {
      Start()
   }
}

Run()