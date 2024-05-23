import settings from "../settings";

var wormCount = 0;

export function getWormCount() {
    return wormCount;
}

// detect for worms
register("step", () => {
    if (settings.wormCounter)
    {
        count = 0;
        World.getAllEntities().forEach( entity => {
            if (entity.getName().includes("Silverfish"))
            {
                //ChatLib.chat(entity.getX() + " " + entity.getY() + " " + entity.getZ());
                count += 1;
            }
        })
        wormCount = count;
        if (count >= 60 && settings.wormPartyNotifier)
        {
            ChatLib.command("pc WORMS CAP ! Lootshare !");
        }
    }
}).setDelay(1);
