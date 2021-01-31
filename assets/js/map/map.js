import { turboFormater, inputs } from "../main.js"

export const maps = new Map();

export function createMaps() {
    maps.set("map1", new SvgMap(5, 46, 2500, "map1", 1400, 700));
    maps.set("map2", new SvgMap(-61, 15.5, 15000, "map2", 1400, 700));
    maps.set("map3", new SvgMap(-54, 4.2, 5000, "map3", 1400, 700));
    maps.set("map4", new SvgMap(55.5, -21.2, 30000, "map4", 1400, 700));
    maps.set("map5", new SvgMap(45, -12.8, 40000, "map5", 1400, 700));
}

export function refreshMap()
{
    const stations = turboFormater.getDay(inputs.day).stations

    for(const map of maps.values())
    {
        map.placePoints(stations)
    }
}

export class SvgMap {

    constructor(lat, long, sca, container, w, h) {

        console.log(`creating map "${container}"`);

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
        });
    }

    placePoints(points)
    {
        this.svg.selectAll(".pin")
            .data(points)
            .enter()
            .append("circle", ".pin")
            .attr("transform", (d) => `translate(${this.projection(d.pos)})`)
            .attr("r", "40px")
            .attr("fill", "red")
            .on('click', onclick);

            function onclick(d)
            {
                console.log('click', d)
            }

        this.svg.selectAll(".pin")
            .data(points)
            .enter().append("text")
            .attr('class', ".pin-text")
            .attr("style", "font-size: 200px")
            .attr("text-anchor", "middle")
            .attr("transform", (d) => `translate(${this.projection([d.pos[0], d.pos[1] + 0.10 ])})`)
            .text(() => "10 °C")
            .on('click', onclick);
    }

    reset()
    {

    }
}

/*
            
*/