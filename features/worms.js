import settings from "../settings";

const doubleHook = /^(It\'s a Double Hook\! Woot woot\!|It's a Double Hook\!|Double Hook\!)$/;


var wormCount = 0;
var stacker = 0;
var ls = [];

var membraneCount = 0;
var membraneBatches = [];
membraneBatches = [12, 17, 13, 8, 9, 11];

var wormStats = {};

maxCount = 0;

export function getWormCount() {
    return wormCount;
}

export function getWormStats() {
    return wormStats;
}

export function getMaxCount() {
    return maxCount;
}

export function getBatches() {
    return membraneBatches;
}



// detect for worms
register("step", () => {
    if (settings.wormCounter)
    {
        wormCount = countWormsAround();
        if (wormCount >= stacker) {
            stacker = wormCount;
            membraneCount = countMembranes();
        } else {
            // if some worms are dead, calculate the stats
            calculateStats();
            count = countMembranes();
            membraneBatches.push(count-membraneCount);
            membraneCount = count;
        }
        if (count >= 60 && settings.wormPartyNotifier)
        {
            ChatLib.command("pc WORMS CAP ! Lootshare !");
        }
    }
}).setDelay(1);


register("chat", () => {
    wormStats[Player.getName().toString()] ? wormStats[Player.getName().toString()] += 1: wormStats[Player.getName().toString()] = 1;
}).setCriteria("A Flaming Worm surfaces from the depths!");


register("chat", () => {
    if (stacker > 0) {
        wormStats[Player.getName().toString()] ? wormStats[Player.getName().toString()] += 1: wormStats[Player.getName().toString()] = 1;
    }
}).setCriteria(doubleHook);


register("chat", (player) => {
    ls.push([Date.now(), player.toString()]);
}).setCriteria("LOOT SHARE You received loot for assisting ${player}!");


register("step", () => {
    for (let a = 0; a < ls.length; a++){
        if (Date.now() - ls[a][0] > 5000) {
            ls.shift();
            a-=1;
        }
    }
}).setFps(1);




function calculateStats() {
    uniquePeople = {};
    ls.forEach(player => {
        uniquePeople[player[1]] ? uniquePeople[player[1]] += 1: uniquePeople[player[1]] = 1;
    });

    temp = stacker;
    Object.keys(uniquePeople).forEach(player => {
        temp -= uniquePeople[player];
        wormStats[player] ? wormStats[player] += uniquePeople[player]: wormStats[player] = uniquePeople[player];
        if (maxCount < wormStats[player]) {
            maxCount = wormStats[player];
        }
    });
    if (maxCount < wormStats[Player.getName().toString()]) {
        maxCount = wormStats[Player.getName().toString()];
    }

    stacker = wormCount;
    ls = [];
}


function countMembranes() {
    let membranecurrent = 0;
    Player.getContainer().getItems().forEach(item => {
        try {
            if (item.getName().includes("Worm Membrane")) {
                membranecurrent += item.getStackSize();
            }
        } catch (e) {/* just pass empty slots... */}
    });
    return membranecurrent;
}


function countWormsAround() {
    count = 0;
    World.getAllEntities().forEach( entity => {
        if (entity.getName().includes("Silverfish"))
        {
            //ChatLib.chat(entity.getX() + " " + entity.getY() + " " + entity.getZ());
            count += 1;
        }
    });
    return count;
}