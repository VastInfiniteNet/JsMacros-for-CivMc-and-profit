class TerritoryAlerter {
   static HandleTerritoryChangeEvent(e) {
      new TerritoryAlerter().TerritoryChangeEventHandler(e)
   }

   #Log(msg) {
      if (TERRITORY_DEBUG_MODE)
         Chat.log(msg)
   }

   TerritoryChangeEventHandler(enteredEvent) {
      let terrChange = enteredEvent.getObject("TerritoryChange")
      let oldTerr = terrChange.OldTerritory
      let newTerr = terrChange.NewTerritory
      this.#Log(`EnteredEventHandler: ${oldTerr?.name} -> ${newTerr?.name}`)

      if (newTerr == undefined) { // entered unknown territory
         this.#SendAlert(
            "NOW IN THE UNKNOWN",
            `You have left ${oldTerr?.nation}`,
            TERRITORY_LEAVE_SOUND
         )
      } else { // entered known territory
         let newTerrName = this.#Colorize(newTerr?.name, newTerr?.color);
         this.#SendAlert(
            Chat.createTextBuilder().append("Entered ").append(newTerrName).build(),
            Chat.createTextBuilder().append(newTerrName).append(`, ${newTerr.nation}`).build(),
            TERRITORY_ENTER_SOUND
         )
      }
   }

   #SendAlert(message, subtitle, TERRITORY_CHANGE_SOUND) {
      this.#DisplayLocationChange(message, subtitle)
      World.playSound(TERRITORY_CHANGE_SOUND, 0.1, 100)
   }

   #DisplayLocationChange(message, subtitle) {
      if ((TERRITORY_CHANGE_DISPLAY_OPTION & TERRITORY_CHANGE_DISPLAY_OPTIONS.TITLE) != 0)
         Chat.title(message, subtitle, 10, 35, 10);
      if ((TERRITORY_CHANGE_DISPLAY_OPTION & TERRITORY_CHANGE_DISPLAY_OPTIONS.TOAST) != 0)
         Chat.toast(message, subtitle);
      if ((TERRITORY_CHANGE_DISPLAY_OPTION & TERRITORY_CHANGE_DISPLAY_OPTIONS.LOG) != 0)
         Chat.log(subtitle);
      if ((TERRITORY_CHANGE_DISPLAY_OPTION & TERRITORY_CHANGE_DISPLAY_OPTIONS.ACTIONBAR) != 0)
         Chat.actionbar(subtitle);
   }

   #Colorize(name, colorString) {
      if (colorString === undefined)
         return Chat.createTextBuilder().append(Chat.createTextHelperFromString(name));

      let color = [parseInt(colorString.slice(1, 3), 16), parseInt(colorString.slice(3, 5), 16), parseInt(colorString.slice(5, 7), 16)];
      return Chat.createTextBuilder().append(name).withColor(...color);
   }
}

//////////////////////////////////////////////////////////
/////////////// CONFIG //////////////////////////////////

const TERRITORY_DEBUG_MODE = true;   // logs debug messages to the chat
// For other sounds see: https://www.digminecraft.com/lists/sound_list_pc.php
const TERRITORY_ENTER_SOUND = "entity.player.levelup";  // sound when player entered some territory
const TERRITORY_LEAVE_SOUND = "entity.wither.spawn";    // sound when player left entire territory 

// DISPLAY OPTIONS
// To use multiple display options add the option after a bitwise OR (|) to the end of TERRITORY_CHANGE_DISPLAY_OPTION
const TERRITORY_CHANGE_DISPLAY_OPTIONS = {
   TOAST: 1 << 0,
   TITLE: 1 << 1,
   LOG: 1 << 2,
   ACTIONBAR: 1 << 3,
};
const TERRITORY_CHANGE_DISPLAY_OPTION = TERRITORY_CHANGE_DISPLAY_OPTIONS.TOAST;
// to use all set to 0xFF
/////////////// END OF CONFIG ///////////////////////////
/////////////////////////////////////////////////////////////

TerritoryAlerter.HandleTerritoryChangeEvent(event)