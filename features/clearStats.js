import {data} from "../utils";

var confirmClearStats = false;

// clear command
register("command", () => {
    confirmClearStats = true;
    ChatLib.chat("Do /confirmClear to confirm");
}).setName("clearStats");


// confirmation command
register("command", () => {
    if (confirmClearStats)
    {
        confirmClearStats = false;
        data.nbrJawbus = [];
        data.nbrThunder = [];
        data.nbrVial = [];
        data.STATS.avgNbrJawbus = 0;
        data.STATS.avgNbrThunder = 0;
        data.STATS.avgNbrVial = 0;
        data.save();
        ChatLib.chat("Stats cleared!");
    }
}).setName("confirmClear");
