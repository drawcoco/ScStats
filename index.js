// data format
import {data} from "./utils";
import settings from "./settings";

import "./features/doubleHook";
import "./features/clearStats";


import { getWormCount} from "./features/worms";
import { GUIIsOpen } from "./features/moveGUI";
import { getDisplayDeploy } from "./features/FlareFlux";
import { processJawbusColumns, processThunderColumns, getThunderData, getJawbusData, getThunderMax, getJawbusMax, getNbrColumns
    } from "./features/processFunctions";

import "./features/mobEvents";

// option settings GUI
register("command", () => {
     settings.openGUI();
}).setName("scstats").setAliases("scs");

launch = 0;

launchTimer = register("tick", () => {
    launch += 1;
    if (launch == 3) {
        ChatLib.chat("&9ScStats ready!");
        processThunderColumns();
        processJawbusColumns();
        launchTimer.unregister();
    }
});

//##############################################################################
//                GRAPH
//##############################################################################


// render event
register("renderoverlay", () => {
    try {

    xThunder = data.GRAPH.xThunder;
    yThunder = data.GRAPH.yThunder;
    sThunder = data.GRAPH.sThunder;
    lThunder = sThunder / 1.618;
    xJawbus = data.GRAPH.xJawbus;
    yJawbus = data.GRAPH.yJawbus;
    sJawbus = data.GRAPH.sJawbus;
    lJawbus = sJawbus / 1.618;
    xWorm = data.GRAPH.xWorm;
    yWorm = data.GRAPH.yWorm;
    xDeploy = data.GRAPH.xDeploy;
    yDeploy = data.GRAPH.yDeploy;
    
    if (settings.flareFluxDetect)
    {
        new Text(`${getDisplayDeploy()}`, xDeploy, yDeploy).setColor(Renderer.WHITE).draw();
    }
    if (settings.wormCounter)
    {
        new Text(`Worms around: ${getWormCount()}`, xWorm, yWorm).setColor(Renderer.WHITE).draw();
    }

    if (settings.showInfos)
    {
        new Text(`SC since Thunder : ${data.COUNTER.thunder}`, xThunder+sThunder-125, yThunder).setColor(Renderer.AQUA).draw();
        new Text(`Catches : ${data.nbrThunder.length}`, xThunder+sThunder-77, yThunder+10).setColor(Renderer.AQUA).draw();
        new Text(`Avg : ${data.STATS.avgNbrThunder}`, xThunder+sThunder-55, yThunder+20).setColor(Renderer.AQUA).draw();

        new Text(`SC since Jawbus : ${data.COUNTER.jawbus}`, xJawbus+sJawbus-119, yJawbus).setColor(Renderer.YELLOW).draw();
        new Text(`Catches : ${data.nbrJawbus.length}`, xJawbus+sJawbus-77, yJawbus+10).setColor(Renderer.YELLOW).draw();
        new Text(`Avg : ${data.STATS.avgNbrJawbus}`, xJawbus+sJawbus-55, yJawbus+20).setColor(Renderer.YELLOW).draw();

        
        if (settings.showGraphs)
        {
            new Rectangle(Renderer.BLACK, xThunder+10, yThunder+10, 0, 0.9*lThunder-15).setOutline(Renderer.BLACK, 0.75).draw();
            new Rectangle(Renderer.BLACK, xThunder+10, yThunder-5+0.9*lThunder, 0.87*sThunder, 0).setOutline(Renderer.BLACK, 0.75).draw();
            new Text("0", xThunder+0.06*sThunder, yThunder+0.9*lThunder).setColor(Renderer.AQUA).draw();
            new Text(getThunderMax()/2, xThunder+0.37*sThunder, yThunder+0.9*lThunder).setColor(Renderer.AQUA).draw();
            new Text(getThunderMax(), xThunder+0.8*sThunder, yThunder+0.9*lThunder).setColor(Renderer.AQUA).draw();

            new Rectangle(Renderer.BLACK, xJawbus+10, yJawbus+10, 0, 0.9*lJawbus-15).setOutline(Renderer.BLACK, 0.75).draw();
            new Rectangle(Renderer.BLACK, xJawbus+10, yJawbus-5+0.9*lJawbus, 0.87*sJawbus, 0).setOutline(Renderer.BLACK, 0.75).draw();
            new Text("0", xJawbus+0.06*sJawbus, yJawbus+0.9*lJawbus).setColor(Renderer.YELLOW).draw();
            new Text(getJawbusMax()/2, xJawbus+0.37*sJawbus, yJawbus+0.9*lJawbus).setColor(Renderer.YELLOW).draw();
            new Text(getJawbusMax(), xJawbus+0.8*sJawbus, yJawbus+0.9*lJawbus).setColor(Renderer.YELLOW).draw();

            dupe = [...getThunderData()];
            c = dupe.sort(function(a, b) { return a - b; })[49];
            new Text(c, xThunder-4, yThunder+10).setColor(Renderer.AQUA).draw();
            h = (0.9*lThunder-15) / c;
            z = (0.87*sThunder) / getNbrColumns();
            for (i = 0; i < getNbrColumns(); i++)
            {
                new Rectangle(Renderer.AQUA, xThunder+10+i*z, yThunder+0.9*lThunder-5-(h*getThunderData()[i]), z, h*getThunderData()[i]).draw();
            }


            dupe = [...getJawbusData()];
            c = dupe.sort(function(a, b) { return a - b; })[49];
            new Text(c, xJawbus-4, yJawbus+10).setColor(Renderer.YELLOW).draw();
            h = (0.9*lJawbus-15) / c;
            z = (0.87*sJawbus) / getNbrColumns();
            for (i = 0; i < getNbrColumns(); i++)
            {
                new Rectangle(Renderer.YELLOW, xJawbus+10+i*z, yJawbus+0.9*lJawbus-5-(h*getJawbusData()[i]), z, h*getJawbusData()[i]).draw();
            }
            
        }
    }

    if (GUIIsOpen())
    {
        new Text("ECHAP to save position", 10, 10).setColor(Renderer.WHITE).draw();

        if (settings.showGraphs)
        {
            new Rectangle(Renderer.WHITE, xThunder-5, yThunder-5, sThunder+10, 0).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xThunder-5, yThunder-5, 0, sThunder/1.618+10).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xThunder-5, yThunder+sThunder/1.618+5, sThunder+10, 0).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xThunder+sThunder+5 , yThunder-5, 0, sThunder/1.618+10).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xThunder+sThunder+5, yThunder+sThunder/1.618+5, 5, 5).draw();

            new Rectangle(Renderer.WHITE, xJawbus-5, yJawbus-5, sJawbus+10, 0).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xJawbus-5, yJawbus-5, 0, sJawbus/1.618+10).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xJawbus-5, yJawbus+sJawbus/1.618+5, sJawbus+10, 0).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xJawbus+sJawbus+5 , yJawbus-5, 0, sJawbus/1.618+10).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xJawbus+sJawbus+5, yJawbus+sJawbus/1.618+5, 5, 5).draw();
        }

        if (settings.wormCounter)
        {
            new Rectangle(Renderer.WHITE, xWorm-5, yWorm-5, 100, 0).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xWorm-5, yWorm-5, 0, 20).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xWorm-5+100, yWorm-5, 0, 20).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xWorm-5, yWorm-5+20, 100, 0).setOutline(Renderer.WHITE, 1.0).draw();
        }

        if (settings.flareFluxDetect)
        {
            new Rectangle(Renderer.WHITE, xDeploy-5, yDeploy-5, 100, 0).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xDeploy-5, yDeploy-5, 0, 20).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xDeploy-5+100, yDeploy-5, 0, 20).setOutline(Renderer.WHITE, 1.0).draw();
            new Rectangle(Renderer.WHITE, xDeploy-5, yDeploy-5+20, 100, 0).setOutline(Renderer.WHITE, 1.0).draw();
        }
    }

    var jawbusHP = 0;
    var thunderHP = 0;

    if (settings.bossBar)
    {
        sx = Renderer.screen.getWidth();
        delta = 0;

        World.getAllEntities().forEach( entity => {
            if (entity.getName().includes("Lord Jawbus"))
            {
                
                let name = entity.getName();
                let hp = name.split('/')[0].split(' ')[4].slice(2);
                let mult =  hp.includes("M") ? 1000000 : hp.includes("k") ? 1000 : 0;
                let fullHp = parseFloat(hp);
                jawbusHP = fullHp * mult;

                new Rectangle(Renderer.BLACK, 10, 10+delta, (sx-20), 11).draw();
                new Rectangle(Renderer.YELLOW, 11, 11+delta, (sx-22)*jawbusHP / 100000000, 9).draw();
                new Text(`Lord Jawbus: ${jawbusHP} / 100000000`, 12, 12+delta).setColor(Renderer.RED).draw();

                delta += 13;
            }
            else if (entity.getName().includes("Thunder"))
            {
                let name = entity.getName();
                let hp = name.split('/')[0].split(' ')[3].slice(2);
                let mult = hp.includes("M") ? 1000000 : hp.includes("k") ? 1000 : 1;
                let fullHp = parseFloat(hp);
                thunderHP = fullHp * mult;

                new Rectangle(Renderer.BLACK, 10, 10+delta, (sx-20), 11).draw();
                new Rectangle(Renderer.AQUA, 11, 11+delta, (sx-22)*thunderHP / 35000000, 9).draw();
                new Text(`Thunder: ${thunderHP} / 35000000`, 12, 12+delta).setColor(Renderer.RED).draw();

                delta += 13;
            }        
        })
    }
} catch (e) {
    ChatLib.chat(e);
}
});
