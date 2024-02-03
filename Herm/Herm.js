class TerritoryChange {
   NewTerritory
   OldTerritory
}

class Herm {
   TerritoryFeatures;
   #TerritoryChangeEvent
   #CurrentTerritory
   #Debug;

   constructor(territoryJsonFileName) {
      this.#Debug = TERRITORY_DEBUG_MODE;
      this.#SetupTerritory(territoryJsonFileName);
   }

   #Log(msg, debugMode = this.#Debug) {
      if (debugMode)
         Chat.log("Herm: " + `${msg}`)
   }

   /**
    * 
    * @param {*} fileName 
    * @returns 
    */
   #SetupTerritory(fileName) { // TODO: support multiple claims maps
      this.#Log(`Reading in ${fileName}`)
      if (!FS.exists(fileName)) { // TODO: download claims map if one doesn't exist
         Chat.log(`Territory file '${fileName}' does not exist! Stopping...`);
         return;
      }
      try {
         let file = FS.open(fileName);
         let territoryJson = JSON.parse(file.read());
         this.TerritoryFeatures = territoryJson.features;
         Chat.log(this.LandName)
      }
      catch (e) {
         Chat.log(e);
         Chat.log("Error reading territory json file, stopping...");
         return;
      }
      this.#CreateEvents();
   }

   /**
    * 
    */
   #CreateEvents() {
      let territoryChangeEvent = JsMacros.createCustomEvent(`TerritoryChangeEvent`);
      territoryChangeEvent.registerEvent();
      this.#TerritoryChangeEvent = territoryChangeEvent;
      this.#Log("TerritoryChangeEvent Ready")
   }

   #SendTerritoryChangeEvent(oldTerritory, newTerritory) {
      this.#Log(`TerritoryChangeEvent: ${oldTerritory?.name}, ${oldTerritory?.nation} -> ${newTerritory?.name}, ${newTerritory?.nation}`)
      this.#TerritoryChangeEvent.putObject("TerritoryChange", { NewTerritory: newTerritory, OldTerritory: oldTerritory})
      this.#TerritoryChangeEvent.trigger()
   }

   Check() {
      var isPresent;

      for (let feature of this.TerritoryFeatures) { // check if player is in any feature
         this.#Log(`Checking ${feature.name}`)

         let currentPos = [Math.floor(Player.getPlayer().getPos().getX()),
         Math.floor(Player.getPlayer().getPos().getZ())];
         if (feature.polygon == undefined) { // feature is a point
            isPresent = currentPos[0] == feature.x && currentPos[1] == feature.z;
         } else { // feature is a polygon
            isPresent = this.#IsPointInFeature(currentPos, feature);
         }

         if (!isPresent) // Player not in this feature
            continue;

         if (feature?.name != this.#CurrentTerritory?.name) { // Player changed territory
            this.#SendTerritoryChangeEvent(this.#CurrentTerritory, feature)
            this.#CurrentTerritory = feature;
         }
         return true;
      }

      this.#Log(`IsPresent: ${isPresent}, Location: ${this.#CurrentTerritory.name}`)

      if (!isPresent && this.#CurrentTerritory != undefined) { // player left any known territory
         this.#SendTerritoryChangeEvent(this.#CurrentTerritory, undefined)

         this.#CurrentTerritory = undefined;
      }
      return false;
   }

   #IsPointInFeature(point, feature) {
      for (let poly of feature.polygon) {
         this.#Log(`Checking polygon with ${poly.length} vertices`)
         if (this.#IsPointInPolygon(point, poly)) {
            this.#Log(`Point in poly (${poly.length})`)
            return true;
         }
      }
      return false;
   }

   #IsPointInPolygon(point, polygon) {
      if (polygon.length < 3) return false;

      let count = 0;
      for (let i = 0; i < polygon.length; i++) {
         let a = polygon[i];
         let b = polygon[(i + 1) % polygon.length];

         if (this.#IsPointOnLine(point, [a, b]) &&   // point left of line segment
            point[0] < a[0] + ((point[1] - a[1]) / (b[1] - a[1])) * (b[0] - a[0])) {  // point near line   
            count++
            this.#Log(`   Intersection w/: [${a}, ${b}]`)
         }
      }

      this.#Log(`   Count: ${count}`)

      return count % 2 == 1;
   }

   #IsPointOnLine(point, line) {
      return (point[1] < line[0][1]) != (point[1] < line[1][1]);
   }

   Cleanup() { // disable all listeners to Herm events
      this.#Log("Disabling all TerritoryLeftEvent listeners", true)
      for (let l in JsMacros.listeners('TerritoryLeftEvent')) {
         JsMacros.off('TerritoryLeftEvent', l)
         this.#Log(`Disable ${l.toString()}`, true)
      }
      this.#Log("Disabling all TerritoryEnteredEvent listeners", true)
      for (let l in JsMacros.listeners('TerritoryEnteredEvent')) {
         JsMacros.off('TerritoryEnteredEvent', l)
         this.#Log(`Disable ${l.toString()}`, true)
      }
   }
}

//////////////////////////////////////////////////////////
/////////////// CONFIG //////////////////////////////////

const TERRITORY_CLAIMS_FILENAME = "Updated Icenian Territory.json"; // Should be in same folder as script

// to disable continuous polling set to 0
const TERRITORY_POLLING_INTERVAL = 3;  // IN SECONDS
const TERRITORY_DEBUG_MODE = false;   // logs debug messages to the chat
const TERRITORY_HOTKEY = undefined;   // optional key to activate a territory check
//"key.keyboard.left.bracket";

/////////////// END OF CONFIG ///////////////////////////
/////////////////////////////////////////////////////////////

function startHerm() {
   const isActive = !!GlobalVars.getBoolean("HermActive");
   if (isActive && event.key !== undefined) {
      Chat.log("HermActiva is already running!");
      return;
   }
   GlobalVars.putBoolean("HermActive", true);

   let Herma = new Herm(TERRITORY_CLAIMS_FILENAME);
   if (Herma.TerritoryFeatures == undefined) {
      Chat.log("Error: Herm TerritoryFeatures not defined!");
      return;
   }

   Herma.Check()


   let listeners = [];
   let tickListenerInterval = TERRITORY_POLLING_INTERVAL * 20;

   if (tickListenerInterval != 0) {
      listeners.push(JsMacros.on('Tick', JavaWrapper.methodToJava(() => {
         if (World.getTime() % tickListenerInterval == 0)
            Herma.Check();
      })))
   }
   if (TERRITORY_HOTKEY !== undefined) {
      listeners.push(JsMacros.on('Key', JavaWrapper.methodToJava((keyEvent) => {
         if (keyEvent.key == TERRITORY_HOTKEY && keyEvent.action) {
            if (TERRITORY_DEBUG_MODE)
               Chat.log("KEY PRESS ACTIVED CHECK");
            Herma.Check();
         }
      })))
   }


   event.stopListener = JavaWrapper.methodToJava(() => {
      listeners.forEach(listener => JsMacros.off(listener));
      Chat.log("HermActiva disabled");
      GlobalVars.remove("HermActive");
      Herma.Cleanup()
   });
}

startHerm()