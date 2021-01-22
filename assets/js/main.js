import TurboFormater from "./turboFormater.js";

const DOM = {
    day : document.getElementById("day"),
    station : document.getElementById("station"),   
    hour : document.getElementById("hour"),
    show : document.getElementById("show")
}

async function onStart()
{
    const turboFormater = new TurboFormater({
        dataPath : "/assets/data/meteo.json",
        indexs : ["d", null, "n", null, "h"]
    });

    await turboFormater.load()

    DOM.show.addEventListener('click', () => {

        const day = DOM.day.value;
        const station = DOM.station.value;
        const hour = DOM.hour.value;

        console.log(day.valueOf(), station.valueOf(), hour.valueOf())

        if(day && station && hour)
        {
            console.log("day & station & hour") 
            console.log("day & station & hour", turboFormater.getDay(day).getStation(station).getHour(hour))
        }
        else if(day && station)
        {
            console.log("day & station")
            console.log("day & station", turboFormater.getDay(day).getStation(station).hours)
        }
        else if(day && hour)
        {
            console.log("day & hour")
            console.log("day & hour", turboFormater.getDay(day).getHours(hour))
        }
        else if(day)
        {
            console.log("day")
            console.log("day", turboFormater.getDay(day))

            console.log("day", turboFormater.getDay(day).station.map(s => s.data));
            console.log("day", turboFormater.getDay(day).hours.map(h => h.data));
        }
    });
}

onStart();