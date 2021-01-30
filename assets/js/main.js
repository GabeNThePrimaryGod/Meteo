import TurboFormater from "./dataManagement/turboFormater.js";

const DOM = {
    day : document.getElementById("day"),
    station : document.getElementById("station"),   
    hour : document.getElementById("hour"),
    show : document.getElementById("show"),
    ddContents : document.getElementsByClassName("dd-content")
}

async function onStart()
{
    const turboFormater = new TurboFormater({
        dataPath : "/assets/data/meteo.json",
        indexs : ["d", null, "n", null, "h"]
    });

    await turboFormater.load()

    for(const ddElement of DOM.ddContents)
    {
        ddElement.addEventListener('click', () => {

            console.log(ddElement.innerHTML);
    
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