import TurboFormater from "./dataManagement/turboFormater.js";
import { createMaps, refreshMap } from "./map/map.js";

export const DOM = {
    day : document.getElementById("day"),
    station : document.getElementById("station"),   
    hour : document.getElementById("hour"),
    show : document.getElementById("show"),
    ddContents : document.getElementsByClassName("dd-content"),
    mapPreloader : document.getElementById("map-preloader")
};

export const inputs = {
    day: 1,
    station: "",
};

export const turboFormater = new TurboFormater({
    dataPath : "/assets/data/meteo.json",
    indexs : ["d", null, "n", null, "h"]
});

async function onStart()
{
    initInputsEvents();
    createMaps();

    await turboFormater.load();
    refreshMap();
}

async function initInputsEvents()
{
    for(const ddElement of DOM.ddContents)
    {
        ddElement.addEventListener('click', () => {
            console.log(ddElement.value);
            inputs.station = ddElement.value;
        });
    }
}


onStart();


/*

const day = DOM.day.value;
const station = DOM.station.value;
const hour = DOM.hour.value;

if(day && station && hour)
{
    console.log("day & station & hour") 
    console.log("day & station & hour", turboFormater.getDay(day).getStation(station).getHour(hour).data)
}
if(day && station)
{
    console.log("day & station")
    console.log("day & station", turboFormater.getDay(day).getStation(station).hours.map(h => h.data))
}
if(day && hour)
{
    console.log("day & hour")
    console.log("day & hour", turboFormater.getDay(day).getHours(hour).data)
}
if(day)
{
    console.log("day")
    console.log("day", turboFormater.getDay(day).hours.map(h => h.data));
}

console.log("global")
console.log("global day", turboFormater.days.map(d => d.data));

const allhours = [];
turboFormater.days.map(d => d.hours.map(h => allhours.push(h.data)))

console.log("global hours", allhours);
*/