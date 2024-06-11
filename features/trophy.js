import { request } from "axios";


register("command", (playerName) => {
    getTrophy(playerName);
}).setName("getTrophy");


function getTrophy(playerName) {

    ChatLib.chat("Requesting trophy fish for player " + playerName);

    request({url: `https://sky.shiiyu.moe/api/v2/profile/${playerName}`, json: true}).then(response => {
        try {
            playerProfile = Object.entries(response.data.profiles).find(profile => profile[1].current == true)[1];

            unluckiness = 0;

            playerProfile.data.crimson_isle.trophy_fish.fish.forEach(fishType => {
                colorChar = "";
                colorChar += fishType.bronze > 0 ? "&8❤" : "&8▫";
                colorChar += fishType.silver > 0 ? "&7❤" : "&7▫";
                colorChar += fishType.gold > 0 ? "&6❤" : "&6▫";
                colorChar += fishType.diamond > 0 ? "&b❤" : "&b▫";
                if (fishType.diamond > 0 || fishType.gold > 0) {
                    noluck = parseInt(
                        (1 - Math.pow(0.9978, parseInt( fishType.diamond > 0 ? fishType.total/fishType.diamond : fishType.total/fishType.gold*10)))*100
                    )/100;

                    filler = " ".repeat(parseInt(Math.pow(23-fishType.display_name.length, 1.11)));
                    luckColor = noluck < 0.25 ? "&b" : noluck < 0.5 ? "&a" : noluck < 0.75 ? "&e" : "&4";

                    ChatLib.chat(colorChar + "&f " + fishType.display_name + filler + " =>   unluckyness: " + luckColor + noluck);
                    unluckiness += noluck * getDifficulty(fishType.display_name);
                } else {
                    ChatLib.chat(colorChar + "&f " + fishType.display_name + filler + " =>   unluckyness: 0");
                }
            });
            
            unluckynessColor = unluckiness < 400 ? "&b" : unluckiness < 500 ? "&a" : unluckiness < 600 ? "&e" : "&4";

            ChatLib.chat("Total unluckiness: " + unluckynessColor + parseInt(unluckiness) + "/1000");

        } catch (e) {
            ChatLib.chat(e);
        }
    });
}


difficulty = {
    "Blobfish": 18.2,
    "Flyfish": 53.46,
    "Golden Fish": 85.31,
    "Gusher": 23.89,
    "Karate Fish": 112.61,
    "Lavahorse": 31.85,
    "Mana Ray": 51.19,
    "Moldfin": 86.45,
    "Obfuscated 1": 23.9,
    "Obfuscated 2": 52.33,
    "Obfuscated 3": 78.49,
    "Skeleton Fish": 88.73,
    "Slugfish": 112.61,
    "Soul Fish": 83.04,
    "Steaming-Hot Flounder": 39.81,
    "Sulphur Skitter": 23.89,
    "Vanille": 106.93,
    "Volcanic Stonefish": 63.7,
};

function getDifficulty(fishType) {
    return difficulty[fishType];
}