import TurboFormater from "./dataManagement/turboFormater.js";
import { createMaps, refreshMap } from "./map/map.js";
import { 
    buildStationCharts, 
    buildFranceCharts, 
    refreshFranceCharts, 
    refreshStationCharts 
} from "./charts.js";

export const DOM = {
    dayText : document.getElementById("day-text"),
    mapPreloader : document.getElementById("map-preloader"),
    maps : [
        document.getElementById("map1"),
        document.getElementById("map2"),
        document.getElementById("map3"),
        document.getElementById("map4"),
        document.getElementById("map5"),    
    ],
    tabs : {
        generalTab : document.getElementById("general-tab"),
        tempTab : document.getElementById("temperature-tab"),
        pluieTab : document.getElementById("pluie-tab"),
        franceTab : document.getElementById("france-tab"),
        
        link : {
            general : document.getElementById("general-tab-link"),
            temp : document.getElementById("temperature-tab-link"),
            pluie : document.getElementById("pluie-tab-link"),
            france : document.getElementById("france-tab-link"),
        }
    },
    swipes: {
        generalSwipe : document.getElementById("general-swipe"),
        tempSwipe : document.getElementById("temperature-swipe"),
        pluieSwipe : document.getElementById("pluie-swipe"),
        franceSwipe : document.getElementById("france-swipe")
    },

    dropDownContent: document.getElementById("dropdown-content"),
    dropdownButton: document.getElementById("dropdown-button"),

    timelineRange: document.getElementById("timeline-range"),
};

export const inputs = {
    day: 15,
    hours : 0,
    station: "",
};

export const turboFormater = new TurboFormater({
    dataPath : "/assets/data/meteo.json",
    indexs : ["d", null, "n", null, "h"]
});

async function onStart()
{
    buildStationCharts();
    buildFranceCharts();

    await turboFormater.load();
    initInputsEvents();

    await createMaps();
    DOM.mapPreloader.remove();
    DOM.maps.forEach((m) => m.hidden = false);

    load();
}

async function initInputsEvents()
{
    const stations = turboFormater.getDay(inputs.day).stations;

    for (const station of stations) {

        const stationElement = document.createElement("div");
        stationElement.setAttribute("class", "dd-content");
        stationElement.innerHTML = station.name;

        stationElement.addEventListener('click', () => 
        {
            inputs.station = stationElement.innerHTML;
            DOM.dropdownButton.innerHTML = stationElement.innerHTML;
            
            load();
        });

        DOM.dropDownContent.appendChild(stationElement);
    }

    DOM.timelineRange.addEventListener('change', () => {

        inputs.day = Number.parseInt(DOM.timelineRange.value);
        DOM.dayText = `Jour ${inputs.day}`;

        load();
    });
}

export function load()
{   
    console.log("load", inputs)

    setSwipes();
    refreshMap();
}

function setSwipes() {

    const day = turboFormater.getDay(inputs.day);

    DOM.swipes.franceSwipe.innerHTML = 
    `<div class="general-content">
        <label>
            <h3>Température : </h3>
            <h5 id="tempFR">${day.averageTemp}°C</h5>
            <div class="chart" id="france-temp-chart"></div>
        </label>
        <label>
            <h3>Pluviosité : </h3>
            <h5 id="pluvFR">${day.averageHumidity} mm/m²</h5>
            <div class="chart" id="france-pluie-chart"></div>
        </label>
    </div>`;

    refreshFranceCharts();

    if(inputs.station)
    {
        if(DOM.tabs.link.france.getAttribute("class") == "active")
        {
            DOM.tabs.generalTab.setAttribute("class", "tab col s3");
            DOM.tabs.tempTab.setAttribute("class", "tab col s3");
            DOM.tabs.pluieTab.setAttribute("class", "tab col s3");
            DOM.tabs.franceTab.setAttribute("class", "tab col s3");

            DOM.tabs.link.general.click();
        }

        const station = day.getStation(inputs.station);

        DOM.swipes.generalSwipe.innerHTML = 
        `<div class="general-content">
            <label>
                <h3>Station sélectionnée : </h3>
                <h5 id="station">${inputs.station}</h5>
            </label>
            <label>
                <h3>Température : </h3>
                <h5 id="temp">${station.averageTemp}°C</h5>
                <div class="chart" id="temperature-chart-general"></div>
            </label>
            <label>
                <h3>Pluviosité : </h3>
                <h5 id="pluv">${station.averageHumidity} mm/m²</h5>
                <div class="chart" id="pluie-chart-general"></div>
            </label>
        </div>`;

        DOM.swipes.tempSwipe.innerHTML = 
        `<div class="general-content">
            <label>
                <h3>Température : </h3>
                <h5 id="tempChart">${station.averageTemp}°C</h5>
            </label>
            <div class="chart" id="temperature-chart"></div>
        </div>`;

        DOM.swipes.pluieSwipe.innerHTML = 
        `<label>
            <h3>Pluviosité : </h3>
            <h5 id="pluvChart">${station.averageHumidity} mm/m²</h5>
        </label>
        <div class="chart" id="pluie-chart"></div>`;

        refreshStationCharts();
    }
    else
    {
        DOM.tabs.generalTab.setAttribute("class", "tab col s3 disabled");
        DOM.tabs.tempTab.setAttribute("class", "tab col s3 disabled");
        DOM.tabs.pluieTab.setAttribute("class", "tab col s3 disabled");
        DOM.tabs.franceTab.setAttribute("class", "tab col s3");

        DOM.tabs.link.france.click();
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