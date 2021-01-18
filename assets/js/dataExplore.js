import formatData from "./formatData.js";

export default class DataEplore {
    /**
     * 
     * @param {any} config 
     */
    constructor(config = {}) 
    {
        this.dataPath = config.dataPath || "/assets/data/meteo.json";

        fetch(this.dataPath)
            .then(response => response.text())
            .then(text => JSON.parse(text))
            .then(json => formatData(json))
            .then(data => {
                this.data = data;
                this.init();
            });
    }

    init() 
    {
        console.log(this.data);
        console.log();
    }

    get()
    {
        
    }

    get(day, station, hours)
    {
        
    }
}