import {data} from "../utils";
import settings from "../settings";

var movedisplay = new Gui();

export function GUIIsOpen() {
    return movedisplay.isOpen();
}

var moveThunder = false;
var moveJawbus = false;
var moveWorm = false;
var moveDeploy = false;
var resizeThunder = false;
var resizeJawbus = false;
var cx = 0;
var cy = 0;


// move graph event
register("command", () => {
    if (settings.showInfos || settings.wormCounter)
    {
        movedisplay.open();
    }
}).setName("moveGraph");


// mouse click event
register("guimouseclick", (x, y, button, gui, event) => {
    if (x > data.GRAPH.xDeploy - 5 &&
        x < data.GRAPH.xDeploy + 100 &&
        y > data.GRAPH.yDeploy - 5 &&
        y < data.GRAPH.yDeploy + 20)
    {
        moveDeploy = true;
        cx = data.GRAPH.xDeploy- x;
        cy = data.GRAPH.yDeploy - y;
    }
    else if (x > data.GRAPH.xWorm - 5 &&
        x < data.GRAPH.xWorm + 100 &&
        y > data.GRAPH.yWorm - 5 &&
        y < data.GRAPH.yWorm + 20)
    {
        moveWorm = true;
        cx = data.GRAPH.xWorm - x;
        cy = data.GRAPH.yWorm - y;
    }
    else if (x > data.GRAPH.xThunder - 5 &&
        x < data.GRAPH.xThunder + data.GRAPH.sThunder + 5 &&
        y > data.GRAPH.yThunder - 5 &&
        y < data.GRAPH.yThunder + data.GRAPH.sThunder/1.618 + 5)
    {
        moveThunder = true;
        cx = data.GRAPH.xThunder - x;
        cy = data.GRAPH.yThunder - y;
    }
    else if (x > data.GRAPH.xJawbus - 5 &&
        x < data.GRAPH.xJawbus + data.GRAPH.sJawbus + 5 &&
        y > data.GRAPH.yJawbus - 5 &&
        y < data.GRAPH.yJawbus + data.GRAPH.sJawbus/1.618 + 5)
    {
        moveJawbus = true;
        cx = data.GRAPH.xJawbus - x;
        cy = data.GRAPH.yJawbus - y;
    }
    else if (x > data.GRAPH.xThunder + data.GRAPH.sThunder + 5 &&
        x < data.GRAPH.xThunder + data.GRAPH.sThunder + 10 &&
        y > data.GRAPH.yThunder + data.GRAPH.sThunder/1.618 + 5 &&
        y < data.GRAPH.yThunder + data.GRAPH.sThunder/1.618 + 10)
    {
        resizeThunder = true;
    }
    else if (x > data.GRAPH.xJawbus + data.GRAPH.sJawbus + 5 &&
        x < data.GRAPH.xJawbus + data.GRAPH.sJawbus + 10 &&
        y > data.GRAPH.yJawbus + data.GRAPH.sJawbus/1.618 + 5 &&
        y < data.GRAPH.yJawbus + data.GRAPH.sJawbus/1.618 + 10)
    {
        resizeJawbus = true;
    }
})

// mouse drag event
register("dragged", (dx, dy, x, y) => {
    if (!movedisplay.isOpen())
    {
        return;
    }
    if (moveDeploy)
    {
        data.GRAPH.xDeploy = x+cx;
        data.GRAPH.yDeploy = y+cy;
        data.save();
    }
    if (moveWorm)
    {
        data.GRAPH.xWorm = x+cx;
        data.GRAPH.yWorm = y+cy;
        data.save();
    }
    if (moveThunder)
    {
        data.GRAPH.xThunder = x+cx;
        data.GRAPH.yThunder = y+cy;
        data.save();
    }

    if (moveJawbus)
    {
        data.GRAPH.xJawbus = x+cx;
        data.GRAPH.yJawbus = y+cy;
        data.save();
    }

    if (resizeThunder)
    {
        data.GRAPH.sThunder = Math.max(x-data.GRAPH.xThunder, (y-data.GRAPH.yThunder)*1.618);
        data.save();
    }

    if (resizeJawbus)
    {
        data.GRAPH.sJawbus = Math.max(x-data.GRAPH.xJawbus, (y-data.GRAPH.yJawbus)*1.618);
        data.save();
    }
});


// mouse release event
register("guimouserelease", (x, y, button, gui, event) => {
    moveThunder = false;
    moveJawbus = false;
    moveWorm = false;
    moveDeploy = false;
    resizeThunder = false;
    resizeJawbus = false;
});
