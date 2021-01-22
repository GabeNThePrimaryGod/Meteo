export class Day {

    constructor(day)
    {
        this._ = day;
    }

    get day() { return this._.d; }
    get averageTemp() { return this._.t / 100; }
    get averageHumidity() { return this._.p; }
    
    getStation(s)
    {
        if(!this._.station[s])
        {
            console.warn(`can't get station "${s}" of day "${this.day}"`);
            return null
        }
        
        return new Station(this._.station[s], this);
    }

    get stations()
    {
        return Object.values(this._.station).map(elem => elem = new Station(elem, this));
    }

    get hours()
    {
        const hours = [];

        Object.values(this._.station).map(elem => { 
            new Station(elem, this).hours.map(hour => hours.push(hour));
        });

        return hours
    }

    getHours(h)
    {
        const hours = [];

        Object.values(this._.station).map(elem => { 
            elem = new Station(elem, this)
            
            if(elem.getHour(h))
            {
                hours.push(elem.getHour(h))
            }
        });

        return hours
    }

    get data() {
        return {
            "day" : this.day,
            "averageTemp" : this.averageTemp,
            "averageHumidity" : this.averageHumidity 
        }
    }
}

export class Station {

    constructor(station, day)
    {
        this._ = station;
        this.day = day;
    }

    get name() { return this._.n };
    get lat() { return this._.lat };
    get lng() { return this._.lng };
    get averageTemp() { return this._.t / 100; }
    get averageHumidity() { return this._.p; }

    getHour(h) 
    { 
        if(!this._.hours[h])
        {
            console.warn(`can't get hour "${h}" of station "${this.name}"`);
            return null
        }

        return new Hour(this._.hours[h], this.day, this);
    }

    get hours()
    {
        return Object.values(this._.hours).map(elem => elem = new Hour(elem, this.day, this));
    }

    get data() {
        return {
            "name" : this.name,
            "averageTemp" : this.averageTemp,
            "averageHumidity" : this.averageHumidity,
            "lat" : this.station.lat,
            "lng" : this.station.lng    
        }
    }
}

export class Hour {
    
    constructor(hour, day, station)
    {
        this._ = hour
        this.day = day;
        this.station = station;
    }

    get hour() { return this._.h }
    get temp() { return this._.t / 100 }
    get humidity() { return this._.p }

    get data() {
        return {
            "hour" : this.hour,
            "temp" : this.temp,
            "humidity" : this.humidity,
            "lat" : this.station.lat,
            "lng" : this.station.lng
        }
    }  
}