import { Day } from "./dataClass.js";

export default class TurboFormater {
    /**
     * 
     * @param {any} config 
     */
    constructor(config = {}) 
    {
        this.dataPath = config.dataPath || "/assets/data/meteo.json";
        this.indexs = config.indexs || ["d", "station", "n", "hours", "h"];
    }

    async load() {
        const response = await fetch(this.dataPath)
        const text = await response.text()
        const rawData = await JSON.parse(text);
        
        const formatedData = {};
    
        this.formatDataLoop(rawData, formatedData);
    
        this.data = formatedData;
        return this.data;
    }

    formatDataLoop(currentData, formatedData, curr = 0) {
        const index = this.indexs[curr];
    
        for (const _key in currentData) {
            const value = currentData[_key]; // cpy
            const key = (value[index]) ? value[index] : _key; // cpy
    
            const iterables = [];
    
            // si la valeur n'est pas un objet ou un tableau
            if (typeof value !== 'object') {
                formatedData[key] = value;
            } else {
                // si c'est un objet ou un tableau on le stock pour le parcourir ensuite
                iterables.push(value) // cpy
            }
    
            for (const iterable of iterables) {
                formatedData[key] = {};
                
                this.formatDataLoop(iterable, formatedData[key], curr + 1);
            }
        }
    }

    getDay(day)
    {
        return new Day(this.data[day]);
    }
}