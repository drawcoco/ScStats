import settings from "../settings";


displayDeploy = "";

export function getDisplayDeploy() {
    return displayDeploy;
}


var fluxes = [["Radiant", 18], ["Mana Flux", 18], ["Overflux", 18], ["Plasmaflux", 20]];
rocketLast = 0;
rocketX = -999999999;
rocketY = -999999999;
rocketZ = -999999999;

// detect for flare / flux
register("step", () => {
    if (settings.flareFluxDetect)
    {
        let bestDistance = 10000;
        let player = null
        World.getAllEntities().forEach( entity => {
            if (entity.getName().includes(Player.getName()))
            {
                player = entity;
            }
        });

        World.getAllEntities().forEach( entity => {
            if(entity.getName().includes("FireworksRocketEntity"))
            {
                rocketLast = 180;
                rocketX = entity.getX();
                rocketY = entity.getY();
                rocketZ = entity.getZ();
            }
            fluxes.forEach( flux => {
                if(entity.getName().includes(flux[0]))
                {
                    distance = entity.distanceTo(player);
                    if (distance < flux[1] && bestDistance > distance)
                    {
                        bestDistance = distance;
                        displayDeploy = entity.getName();
                    }
                }
            });
        });

        if (rocketLast > 0)
        {
            distance = player.distanceTo(rocketX, rocketY, rocketZ);
            if (bestDistance > distance && distance < 40)
            {
                bestDistance = distance;
                displayDeploy = "&cFlare &e" + rocketLast + "s";
            }
        }

        if (rocketLast == 1)
        {
            rocketX = -999999999;
            rocketY = -999999999;
            rocketZ = -999999999;
        }

        if (rocketLast > 0)
        {
            
            rocketLast -=1;
        }

        if (bestDistance == 10000)
        {
            displayDeploy = "";
        }
    }
}).setDelay(1);
