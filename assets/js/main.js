import TurboFormater from "./dataManagement/turboFormater.js";

const DOM = {
    day : document.getElementById("day"),
    station : document.getElementById("station"),   
    hour : document.getElementById("hour"),
    show : document.getElementById("show")
}

const turboFormater = new TurboFormater({
    dataPath : "/assets/data/meteo.json",
    indexs : ["d", null, "n", null, "h"]
});

async function onStart()
{

    await turboFormater.load()

    var range = document.getElementById("timeline");

    var temp = document.getElementById("temp");
    var pluv = document.getElementById("pluv");
    var tempFR = document.getElementById("tempFR");
    var pluvFR = document.getElementById("pluvFR");
    var tempChart = document.getElementById("tempChart");
    var pluvChart = document.getElementById("pluvChart");

    range.addEventListener('change', () => {
        temp.innerHTML = turboFormater.getDay(range.value).getStation("NICE").averageTemp+"°C";
        tempFR.innerHTML = turboFormater.getDay(range.value).averageTemp+"°C";
        tempChart.innerHTML = turboFormater.getDay(range.value).getStation("NICE").averageTemp+"°C";
        pluv.innerHTML = turboFormater.getDay(range.value).getStation("NICE").averageHumidity+" mm/m²"
        pluvFR.innerHTML = turboFormater.getDay(range.value).averageHumidity+" mm/m²"
        pluvChart.innerHTML = turboFormater.getDay(range.value).getStation("NICE").averageHumidity+" mm/m²"
    });

    var stations = turboFormater.getDay(1).stations;
    var dropdown = document.getElementById("dropdown-content");

    for (const station of stations) {
        dropdown.innerHTML += `<div class="dd-content">${station.name}</div>`;
    }

    /*DOM.show.addEventListener('click', () => {

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
    });*/
}


onStart();

