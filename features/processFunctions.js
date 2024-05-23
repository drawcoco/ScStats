import {data} from "../utils";

var nbrColumns = 50;

export function getNbrColumns() {
    return nbrColumns;
}

var thunderData = [];
var thunderMax = 0;

var jawbusData = [];
var jawbusMax = 0;


export function getThunderData() {
    return thunderData;
}

export function getJawbusData() {
    return jawbusData;
}

export function getThunderMax() {
    return thunderMax;
}

export function getJawbusMax() {
    return jawbusMax;
}

// calculate average catch for thunder
export function calcAvgThunder(nbr)
{
    data.nbrThunder.push(nbr);
    data.save();
    ChatLib.chat(`&r&fNew entry for &r&b&lThunder &r&fadded: &r&b&l${nbr} &r&fsince last`);

    var sum = 0;
    for (var i = 0; i < data.nbrThunder.length; i++)
    {
        sum += parseInt(data.nbrThunder[i]);
    }
    data.STATS.avgNbrThunder = Math.round(sum/data.nbrThunder.length);
    data.save();
}

// calculate average catch for jawbus
export function calcAvgJawbus(nbr)
{
    data.nbrJawbus.push(nbr);
    data.save();
    ChatLib.chat(`&r&fNew entry for &r&e&lJawbus &r&fadded: &r&e&l${nbr} &r&fsince last`);

    var sum = 0;
    for (var i = 0; i < data.nbrJawbus.length; i++)
    {
        sum += parseInt(data.nbrJawbus[i]);
    }
    data.STATS.avgNbrJawbus = Math.round(sum/data.nbrJawbus.length);
    data.save();
}


// calculate average catch for vial
export function calcAvgVial(nbr)
{
    data.nbrVial.push(nbr);
    data.save();
    ChatLib.chat(`&r&fNew entry for &r&a&lVial &r&fadded: &r&a&l${nbr} &r&fsince last`);

    var sum = 0;
    for (var i = 0; i < data.nbrVial.length; i++)
    {
        sum += parseInt(data.nbrVial[i]);
    }
    data.STATS.avgNbrVial = Math.round(sum/data.nbrVial.length);
    data.save();
}


// calculate average catch for vial
export function calcMFVial(nbr)
{
    data.MFVial.push(nbr);
    data.save();
    ChatLib.chat(`&r&fNew entry for &r&a&lMF &r&fadded : ${nbr}`);

    var sum = 0;
    for (var i = 0; i < data.MFVial.length; i++)
    {
        sum += parseInt(data.MFVial[i]);
    }
    data.STATS.avgMFVial = Math.round(sum/data.MFVial.length);
    data.save();
}


// process thunder data and calculate data for display purpose
export function processThunderColumns()
{
    vals = data.nbrThunder;
    vals.sort(function(a, b) { return a - b; });
    thunderMax = vals[vals.length-1];
    
    thunderData = [];
    thunderColumns = [];
    for (i = 0; i < nbrColumns+1; i++)
    {
        thunderColumns.push(Math.round(i/100 * thunderMax));
    }
    for (i = 0; i < nbrColumns; i++)
    {
        thunderData.push(data.nbrThunder.filter(x => x > thunderColumns[i] && x <= thunderColumns[i+1]).length);
    }
}


// process jawbus data and calculate data for display purpose
export function processJawbusColumns()
{
    vals = data.nbrJawbus;
    vals.sort(function(a, b) { return a - b; });
    jawbusMax = vals[vals.length-1];

    jawbusData = [];
    jawbusColumns = [];
    for (i = 0; i < nbrColumns+1; i++)
    {
        jawbusColumns.push(Math.round(i/100 * jawbusMax));
    }
    for (i = 0; i < nbrColumns; i++)
    {
        jawbusData.push(data.nbrJawbus.filter(x => x > jawbusColumns[i] && x <= jawbusColumns[i+1]).length);
    }
}

