//Made by Zace#0142
startingX = Player.getPlayer().getX();
startingZ = Player.getPlayer().getZ();
currentX = Player.getPlayer().getX();
currentZ = Player.getPlayer().getZ();

//Set farm length and width here
farmLength = 10;
farmWidth = 10;

KeyBind.keyBind('key.forward', true);
KeyBind.keyBind('key.use', true);


while(currentZ < startingZ + farmWidth){ 
    Player.getPlayer().lookAt(270,90)
        while(currentX < startingX + farmLength){
            currentX = Player.getPlayer().getX();
            Client.waitTick(1);
        }
        Chat.log("While Loop 1")
    Player.getPlayer().lookAt(0,90)
        currentZ = Player.getPlayer().getZ();
        anchorZ = currentZ
        while(currentZ < anchorZ + 0.5){
            currentZ = Player.getPlayer().getZ();
            Client.waitTick(1);
        }
        Chat.log("While Loop 2")
    Player.getPlayer().lookAt(90,90)
        while(currentX > startingX){
                currentX = Player.getPlayer().getX();
                Client.waitTick(1);
        }
        Chat.log("While Loop 3")
     Player.getPlayer().lookAt(0,90)
        currentZ = Player.getPlayer().getZ();
        anchorZ = currentZ
        while(currentZ < anchorZ + 0.5){
            currentZ = Player.getPlayer().getZ();
            Client.waitTick(1);
        }
       Chat.log("While Loop 4") 
}
 
    

KeyBind.keyBind('key.forward', false);
KeyBind.keyBind('key.use', false);