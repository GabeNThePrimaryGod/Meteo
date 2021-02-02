import {
    turboFormater,
    inputs
} from "./main.js"

export const charts = {
    francePluie: null,
    franceTemp: null,
    pluie: null,
    temp: null,
}

export function buildFranceCharts() {
    charts.francePluie = new Chart("france-pluie-chart", "steelblue");
    charts.franceTemp = new Chart("france-temp-chart");
    charts.pluie = new Chart("pluie-chart", "steelblue");
    charts.temp = new Chart("temperature-chart");
}

export function buildStationCharts() {
    
}

export function refreshFranceCharts() {

    const francePluieChartData = turboFormater.getDay(inputs.day).hours.map((h, i) => {
        return {
            date: d3.timeParse("%d-%I")(i + "-" + h.hour),
            day: h.station.day.day,
            hour: h.hour,
            value: h.humidity
        }
    });

    const franceTempChartData = turboFormater.getDay(inputs.day).hours.map((h, i) => {
        return {
            date: d3.timeParse("%d-%I")(i + "-" + h.hour),
            day: h.station.day.day,
            hour: h.hour,
            value: h.temp
        }
    });

    charts.franceTemp.refreshdata(franceTempChartData);
    charts.francePluie.refreshdata(francePluieChartData);
}

export function refreshStationCharts() {

    const station = turboFormater.getDay(inputs.day).getStation(inputs.station);

    if(!station) return;

    const tempChartData = station.hours.map((h, i) => {
        return {
            date: d3.timeParse("%d-%I")(i + "-" + h.hour),
            day: h.station.day.day,
            hour: h.hour,
            value: h.temp
        }
    });

    const pluieChartData = station.hours.map((h, i) => {
        return {
            date: d3.timeParse("%d-%I")(i + "-" + h.hour),
            day: h.station.day.day,
            hour: h.hour,
            value: h.humidity
        }
    });

    charts.pluie.refreshdata(pluieChartData)
    charts.temp.refreshdata(tempChartData)
}

export class Chart {

    constructor(container, pathColor, width, height, margin, padding, adj) {

        console.log(`building chart "${container}"`);

        this.container = container;
        this.pathColor = pathColor || "crimson";
        this.width = width || 960;
        this.height = height || 500;
        this.margin = margin || 5;
        this.padding = padding || 5;
        this.adj = adj || 30;
    }

    refreshdata(data) {

        //console.log(`refreshing chart ${this.container}`, data);

        if(this.svg) this.svg.remove();

        this.svg = d3.select(`#${this.container}`)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `-${this.adj} -${this.adj} ${this.width + this.adj * 3} ${this.height + this.adj * 3}`)
            .style("padding", this.padding)
            .style("margin", this.margin)
            .classed("svg-content", true);

        const x = d3.scaleTime()
            .domain(d3.extent(data, (d) => d.date))
            .range([0, this.width]);

        const max = d3.max(data, (d) => d.value)
        const min = d3.min(data, (d) => d.value)

        const y = d3.scaleLinear()
            .domain([min, max])
            .range([this.height, 0]);

        this.svg.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .attr("class", "axisWhite")
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d, %Ih")));

        this.svg.append("g")
            .attr("class", "axisWhite")
            .call(d3.axisLeft(y));

        this.svg.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("y1", y(0))
            .attr("x2", 0)
            .attr("y2", y(max))
            .selectAll("stop")
            .data([{
                    offset: "0%",
                    color: "blue"
                },
                {
                    offset: "100%",
                    color: "red"
                }
            ])
            .enter().append("stop")
            .attr("offset", (d) => d.offset)
            .attr("stop-color", (d) => d.color);

        this.svg.selectAll("path").remove();

        this.svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", this.pathColor)
            .attr("stroke-width", 2)
            .attr("d", d3.line()
                .x((d) => x(d.date))
                .y((d) => y(d.value))
            )
    }
}