import { turboFormater, inputs, load, DOM } from "../main.js";
import EventEmitter from "../EventEmitter.js";

export const maps = new Map();

export function createMaps() {

    return new Promise((resolve, reject) => 
    {
        maps.set("map1", new SvgMap(5, 46, 2500, "map1", 1400, 700, "8px", "3.5em"));
        //maps.set("map2", new SvgMap(-61, 15.5, 15000, "map2", 1400, 700, "30px", "3em"));
        //maps.set("map3", new SvgMap(-54, 4.2, 5000, "map3", 1400, 700, "30px", "112.5px"));
        //maps.set("map4", new SvgMap(55.5, -21.2, 30000, "map4", 1400, 700, "30px", "112.5px"));
        //maps.set("map5", new SvgMap(45, -12.8, 40000, "map5", 1400, 700, "30px", "112.5px"));

        maps.get("map1").on('loaded', () => resolve())
    })
}

export function refreshMap()
{
    const stations = turboFormater.getDay(inputs.day).stations

    for(const map of maps.values())
    {
        map.placePoints(stations)
    }
}

export class SvgMap extends EventEmitter {

    constructor(lat, long, sca, container, w, h, pinR, fontSize) {

        super();
        console.log(`creating map "${container}"`);

        this.pinR = pinR;
        this.fontSize = fontSize;

        this.svg =
        d3.select("div#" + container)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .style("background-color", "#333333")
            .attr("viewBox", "0 0 " + w + " " + h)
            .style("display", "flex")
            .classed("svg-content", true);

        this.projection =
        d3.geoMercator()
            .translate([w / 2, h / 2])
            .scale(sca)
            .center([lat, long]);

        const path =
        d3.geoPath()
            .projection(this.projection);

        // load data  
        d3.json("assets/data/countries.geojson")
        .then((values) => {
            // draw map
            this.svg.selectAll("path")
                .data(values.features)
                .enter()
                .append("path")
                .attr("class", "continent")
                .attr("d", path)

            this.emit('loaded');
        });
    }

    placePoints(points)
    {
        function onclick(station)
        {
            DOM.dropdownButton.innerHTML = station.name;
            inputs.station = station.name;
            load();
        }

        this.svg.selectAll(".pin").remove();

        this.svg.selectAll(".pin")
            .data(points)
            .enter().append("circle")
            .classed("pin", true)
            .attr("transform", (d) => `translate(${this.projection(d.pos)})`)
            .attr("r", this.pinR)
            .attr("fill", "#5BB4E8")
            .on('click', onclick);

        this.svg.selectAll(".pin-text").remove();

        this.svg.selectAll(".pin-text")
            .data(points)
            .enter().append("text")
            .classed("pin-text", true)
            .attr("style", `font-size: ${this.fontSize}`)
            .attr("text-anchor", "middle")
            .attr("transform", (d) => `translate(${this.projection([d.pos[0], d.pos[1] + 0.15 ])})`)
            .text((d) => d.averageTemp)
            .on('click', onclick);
    }
}

/*
            
*/