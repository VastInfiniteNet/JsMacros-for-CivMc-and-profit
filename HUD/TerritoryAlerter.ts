type TerritoryCoordinate = [number, number];
type TerritoryLine = [TerritoryCoordinate, TerritoryCoordinate];
type Polygon = TerritoryCoordinate[];

interface TerritoryDetails {
   name: string;
   id: string;
   polygon: Polygon[];
   x: number;
   z: number;
   nation: string;
   website: string;
   color: string;
   eventHandler: Events.Custom;
}

class TerritoryAlerter {
   TerritoryName: string;
   TerritoryFeatures: TerritoryDetails[];
   #CurrentLocation: string;
   #Debug: boolean;

   constructor(territoryJsonFileName: string, debug: boolean = false) {
      this.ReadJson(territoryJsonFileName);
      this.#Debug = debug;
   }

   ReadJson(fileName: string) { // TODO: support multiple claims maps
      if (this.#Debug)
         Chat.log(`Reading in ${fileName}` as any)
      if (!FS.exists(fileName)) {
         // TODO: download claims map if one doesn't exist
         Chat.log(`Territory file '${fileName}' does not exist! Stopping...` as any);
         return;
      }
      try {
         let file = FS.open(fileName);
         let territoryJson = JSON.parse(file.read());
         this.TerritoryFeatures = territoryJson.features;
         this.TerritoryName = territoryJson.name;
         this.Setup();
      }
      catch (e) {
         Chat.log(e);
         Chat.log("Error reading into territory json file name, stopping..." as any);
      }
   }

   Setup() {
      for (let i = 0; i < this.TerritoryFeatures.length; i++) {
         let event = JsMacros.createCustomEvent(`${this.TerritoryFeatures[i].name}-eventHandler`);
         event.registerEvent();
         this.TerritoryFeatures[i].eventHandler = event;
      }
   }

   Check(): boolean {
      var isPresent: boolean;

      for (let feature of this.TerritoryFeatures) {
         if (this.#Debug)
            Chat.log(`Checking ${feature.name}` as any);

         let currentPos: TerritoryCoordinate = [Math.floor(Player.getPlayer().getPos().getX()),
         Math.floor(Player.getPlayer().getPos().getZ())];
         if (feature.polygon == undefined) { // feature is a point
            isPresent = currentPos[0] == feature.x && currentPos[1] == feature.z;
         } else { // feature is a polygon
            isPresent = this.#IsPointInFeature(currentPos, feature);
         }

         if (!isPresent)
            continue;

         if (feature.name != this.#CurrentLocation) {
            let featureName = this.#Colorize(feature.name, feature.color);
            let message = Chat.createTextBuilder().append("Entered " as any).append(featureName).build();
            let subtitle = Chat.createTextBuilder().append(featureName).append(`, ${this.TerritoryName}` as any).build();

            this.#DisplayLocationChange(message, subtitle);
            World.playSound(TERRITORY_ENTER_SOUND, 0.1, 100);
            this.#CurrentLocation = feature.name;
            if (feature.eventHandler !== undefined)
               feature.eventHandler.trigger();
         }
         return true;
      }

      if (this.#Debug)
         Chat.log(`IsPresent: ${isPresent}, Location: ${this.#CurrentLocation}` as any);

      if (!isPresent && this.#CurrentLocation != undefined) {
         let message = "NOW IN THE UNKNOWN";
         let subtitle = `You have left ${this.TerritoryName}`;

         this.#DisplayLocationChange(message, subtitle)
         World.playSound(TERRITORY_LEAVE_SOUND, 0.1, 0.5);
         this.#CurrentLocation = undefined;
      }
      return false;
   }

   #DisplayLocationChange(message: any, subtitle: any) {
      if ((TERRITORY_CHANGE_DISPLAY_OPTION & TERRITORY_CHANGE_DISPLAY_OPTIONS.TITLE) != 0)
         Chat.title(message, subtitle as any, 10, 35, 10);
      if ((TERRITORY_CHANGE_DISPLAY_OPTION & TERRITORY_CHANGE_DISPLAY_OPTIONS.TOAST) != 0)
         Chat.toast(message, subtitle as any);
      if ((TERRITORY_CHANGE_DISPLAY_OPTION & TERRITORY_CHANGE_DISPLAY_OPTIONS.LOG) != 0)
         Chat.log(subtitle);
      if ((TERRITORY_CHANGE_DISPLAY_OPTION & TERRITORY_CHANGE_DISPLAY_OPTIONS.ACTIONBAR) != 0)
         Chat.actionbar(subtitle);
   }

   #Colorize(name: string, colorString: string) {
      if (colorString === undefined)
         return Chat.createTextBuilder().append(Chat.createTextHelperFromString(name));

      let color: [number, number, number] = [parseInt(colorString.slice(1, 3), 16), parseInt(colorString.slice(3, 5), 16), parseInt(colorString.slice(5, 7), 16)];
      return Chat.createTextBuilder().append(name as any).withColor(...color);
   }

   #IsPointInFeature(point: TerritoryCoordinate, feature: TerritoryDetails): boolean {
      for (let poly of feature.polygon) {
         if (this.#Debug)
            Chat.log(`Checking polygon with ${poly.length} vertices` as any);
         if (this.#IsPointInPolygon(point, poly)) {
            if (this.#Debug)
               Chat.log(`Point in poly (${poly.length})` as any);
            return true;
         }
      }
      return false;
   }

   #IsPointInPolygon(point: TerritoryCoordinate, polygon: Polygon): boolean {
      if (polygon.length < 3) return false;

      let count = 0;
      for (let i = 0; i < polygon.length; i++) {
         let a = polygon[i];
         let b = polygon[(i + 1) % polygon.length];

         if (this.#IsPointOnLine(point, [a, b]) &&                            // point left of line segment
            point[0] < a[0] + ((point[1] - a[1]) / (b[1] - a[1])) * (b[0] - a[0])) {  // point near line   
            count++
            if (this.#Debug)
               Chat.log(`   Intersection w/: [${a}, ${b}]` as any);
         }
      }

      if (this.#Debug)
         Chat.log(`   Count: ${count}` as any)
      return count % 2 == 1;
   }

   #IsPointOnLine(point: TerritoryCoordinate, line: TerritoryLine): boolean {
      return (point[1] < line[0][1]) != (point[1] < line[1][1]);
   }
}

//////////////////////////////////////////////////////////
/////////////// CONFIG //////////////////////////////////

const TERRITORY_CLAIMS_FILENAME = "Updated Icenian Territory.json"; // Should be in same folder as script

// To disable continuous polling set to 0
const TERRITORY_POLLING_INTERVAL = 5;  // IN SECONDS
const TERRITORY_DEBUG_MODE = false;   // logs debug messages to the chat
const TERRITORY_ENTER_SOUND = "entity.player.levelup";  // sound when player entered some territory
const TERRITORY_LEAVE_SOUND = "entity.wither.spawn";    // sound when player left entire territory 
const TERRITORY_HOTKEY = undefined;   // optional key to activate a territory alert check
//"key.keyboard.left.bracket";

// DISPLAY OPTIONS
// To use multiple bitwise OR (|) an additional option to the end
enum TERRITORY_CHANGE_DISPLAY_OPTIONS {
   TOAST = 1 << 0,
   TITLE = 1 << 1,
   LOG = 1 << 2,
   ACTIONBAR = 1 << 3,
};
const TERRITORY_CHANGE_DISPLAY_OPTION: TERRITORY_CHANGE_DISPLAY_OPTIONS = TERRITORY_CHANGE_DISPLAY_OPTIONS.TOAST;
// to use all set to 0xFF
/////////////// END OF CONFIG ///////////////////////////
/////////////////////////////////////////////////////////////

function runTerritoryAlerter() {
   const isActive = !!GlobalVars.getBoolean("TerritoryAlerterActive");
   if (isActive && (event as Events.Key).key !== undefined) {
      Chat.log("TerritoryAlerter is already running!" as any);
      return;
   }
   GlobalVars.putBoolean("TerritoryAlerterActive", true);

   let Alerter = new TerritoryAlerter(TERRITORY_CLAIMS_FILENAME, TERRITORY_DEBUG_MODE);
   if (Alerter.TerritoryFeatures == undefined) {
      Chat.log("Error..." as any);
      return;
   }
   Alerter.Check();

   let listeners = [];
   let tickListenerInterval = TERRITORY_POLLING_INTERVAL * 20;
   if (tickListenerInterval != 0) {
      listeners.push(JsMacros.on('Tick', JavaWrapper.methodToJava(() => {
         if (World.getTime() % tickListenerInterval == 0)
            Alerter.Check();
      }) as any))
   }
   if (TERRITORY_HOTKEY !== undefined) {
      listeners.push(JsMacros.on('Key', JavaWrapper.methodToJava((keyEvent: Events.Key) => {
         if (keyEvent.key == TERRITORY_HOTKEY && keyEvent.action) {
            if (TERRITORY_DEBUG_MODE)
               Chat.log("KEY PRESS ACTIVED CHECK" as any);
            Alerter.Check();
         }
      }) as any))
   }

   (event as Events.Service).stopListener = JavaWrapper.methodToJava(() => {
      listeners.forEach(listener => JsMacros.off(listener));
      Chat.log("TerritoryAlerter disabled" as any);
      GlobalVars.remove("TerritoryAlerterActive");
   }) as any;
}

runTerritoryAlerter()
