import {data} from "../utils";
import settings from "../settings";

import { processJawbusColumns, processThunderColumns, calcMFVial, calcAvgVial, getThunderData, getJawbusData, getThunderMax, getJawbusMax,
    calcAvgJawbus, calcAvgThunder } from "./processFunctions";

    

// LAVA LEECH, LAVA FLAME, PYRO WORM, MAGMA SLUGS, MOOGMAS, FIRE EEL, TAURUS, PLHLEGBLAST 
const lavaCatch = /^(A small but fearsome Lava Leech emerges\.|A Lava Flame flies out from beneath the lava\.|You feel the heat radiating as a Pyroclastic Worm surfaces\.|From beneath the lava appears a Magma Slug\.|You hear a faint Moo from the lava\.\.\. A Moogma appears\.|A Fire Eel slithers out from the depths\.|Taurus and his steed emerge\.|WOAH! A Plhlegblast appeared\.)$/;


// chat register all kind of random lava sc
register("chat", () => {
    data.COUNTER.thunder += 1;
    data.COUNTER.jawbus += 1;
    data.save()
}).setCriteria(lavaCatch)


// chat register thunder
register("chat", (event) => {
    if (settings.sendThunder)
    {
        ChatLib.command(`pc -=:{o] THUNDER [o}:=- (${data.COUNTER.thunder+1})`);
    }
    data.COUNTER.jawbus += 1;
    if (settings.bossNotif)
    {
        Client.showTitle("&bThunder !","You hear a massive rumble as Thunder emerges.", 10, 20, 10);
    }
    calcAvgThunder(data.COUNTER.thunder+1);
    processThunderColumns();
    data.COUNTER.thunder = 0;
    data.save();
}).setCriteria("You hear a massive rumble as Thunder emerges.");


// manually register thunder
register("command", (nbrSinceThunder) => {
    calcAvgThunder(nbrSinceThunder);
    processThunderColumns();
}).setName("addThunder").setAliases("addt");

// chat register jawbus
register("chat", (event) => {
    if (settings.sendJawbus)
    {
        ChatLib.command(`pc -=:{o] JAWBUS [o}:=- (${data.COUNTER.jawbus+1})`);
    }
    data.COUNTER.thunder += 1;
    data.COUNTER.vial += 1;
    if (settings.bossNotif)
    {
        Client.showTitle("&eJawbus !","You have angered a legendary creature... Lord Jawbus has arrived.", 10, 20, 10);
    }
    calcAvgJawbus(data.COUNTER.jawbus+1);
    processJawbusColumns();
    data.COUNTER.jawbus = 0;
    data.save();
}).setCriteria("You have angered a legendary creature... Lord Jawbus has arrived.");


// manually register jawbus
register("command", (nbrSinceJawbus) => {
    calcAvgJawbus(nbrSinceJawbus);
    processJawbusColumns();
}).setName("addJawbus").setAliases("addj");


// get info from party
register("chat", (rank, ign, msg) => {

    message = ChatLib.removeFormatting(msg);
    if (ign != Player.getName())
    {
        if (settings.bossNotif)
        {
            if (msg.includes("-=:{o] THUNDER [o}:=-"))
            {
                Client.showTitle("&bThunder !","You hear a massive rumble as Thunder emerges.", 10, 20, 10);
            }
            else if (msg.includes("-=:{o] JAWBUS [o}:=-"))
            {
                Client.showTitle("&eJawbus !","You have angered a legendary creature... Lord Jawbus has arrived.", 10, 20, 10);
            }
        }
    }
}).setChatCriteria("Party > ${rank} ${ign}: ${msg}");


// chat register vial
register("chat", (mf, event) => {
    calcAvgVial(data.COUNTER.vial);
    calcMFVial(mf);
    data.COUNTER.vial = 0;
    data.save();
}).setCriteria("RARE DROP! Radioactive Vial (+${mf}% ✯ Magic Find)");
