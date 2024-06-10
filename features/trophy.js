import { request } from "axios";


register("command", (playerName) => {
    getTrophy(playerName);
}).setName("getTrophy");


function getTrophy(playerName) {

    ChatLib.chat("Requesting trophy fish for player " + playerName);

    request({url: `https://sky.shiiyu.moe/api/v2/profile/${playerName}`, json: true}).then(response => {
        try {
            playerProfile = Object.entries(response.data.profiles).find(profile => profile[1].current == true)[1];

            trophy = {};
            unluckiness = 0;

            playerProfile.data.crimson_isle.trophy_fish.fish.forEach(fishType => {
                trophy[fishType.display_name] = {};
                if (fishType.diamond > 0 || fishType.gold > 0) {
                    trophy[fishType.display_name].noluck = parseInt((1 - Math.pow(0.9978, parseInt( fishType.diamond > 0 ? fishType.total/fishType.diamond : fishType.total/fishType.gold*10)))*100)/100;

                    ChatLib.chat(fishType.display_name.padEnd(21) + " =>   unluckyness: " + trophy[fishType.display_name].noluck);
                    unluckiness += trophy[fishType.display_name].noluck * getDifficulty(fishType.display_name);
                } else {
                    ChatLib.chat(fishType.display_name.padEnd(21) + " =>   unluckyness: 0");
                }
            });
            
            // ♚♚♚♚♚♚♚♚♚♚♚♚♚♚♚

            ChatLib.chat("Total unluckiness: " + unluckiness);

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