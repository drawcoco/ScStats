import PogObject from "../PogData";

export let data = new PogObject("scStats", {
    "firstConnexion": true,

    "nbrVial": [],
    "nbrThunder": [],
    "nbrJawbus": [],

    "MFVial": [],

    "timeVial": [],
    "timeThunder": [],
    "timeJawbus": [],

    "STATS": {
        "avgNbrThunder": 0,
        "avgNbrJawbus": 0,
        "avgNbrVial": 0,
        "avgMFVial": 0
    },

    "GRAPH": {
        "xThunder": 10,
        "yThunder": 10,
        "sThunder": 161.8,
        "xJawbus": 10,
        "yJawbus": 120,
        "sJawbus": 161.8,
        "xWorm": 10,
        "yWorm": 10,
        "xDeploy": 10,
        "yDeploy": 10,
        "xWormStats": 10,
        "yWormStats": 10,
        "xPersonalStats": 10,
        "yPersonalStats": 10
    },

    "COUNTER": {
        "thunder": 0,
        "jawbus": 0,
        "vial": 0
    }
}, "data.json")
