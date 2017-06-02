import * as d3 from "d3";
import { sin30, cos30 } from "./Consts";

export default class Sierpinski {
    svg: d3.Selection<any,any,any,any>;
    width: number;
    height: number;
    triangleHeight: number;

    constructor() {

        this.width = 1000;
        this.height = 1000;
        this.triangleHeight = 800;

        this.svg = d3.select("#chart")
            .append("svg:svg")
            .attr("width", this.width)
            .attr("height", this.height)
                .attr("pointer-events", "all")
                .append('svg:g')
            .call(d3.zoom().on("zoom", this.transform))
            .append('svg:g');

        this.init();
    }

    newTriangle = (cx: number, cy: number, r: number) => {
        this.svg.append('polygon')
            .attr('cx', cx)
            .attr('cy', cy)
            .attr('r', r)
            .attr('class', 'outer')
            .attr('fill', 'black')
            .attr('points', (cx) + ',' + (cy - r) + ' ' +
            (cx - r * sin30) + ',' + (cy + r * cos30) + ' ' +
            (cx + r * sin30) + ',' + (cy + r * cos30))
    }

    processOuterTriangles = () => {
        const self = this;

        d3.selectAll('.outer').each(function () {
            let t = d3.select(this);
            self.splitTriangle(this, Number(t.attr('cx')), Number(t.attr('cy')), Number(t.attr('r')));
        });
    }

    splitTriangle = (triangle: d3.BaseType, cx: number, cy: number, r: number) => {
        this.newTriangle(cx, cy - r / 2, r / 2);
        this.newTriangle(cx - r * sin30 / 2, cy + r * cos30 / 2, r / 2);
        this.newTriangle(cx + r * sin30 / 2, cy + r * cos30 / 2, r / 2);

        //d3.select(triangle).attr('fill', 'white').on('click', () => { }).attr('class','inner');
        d3.select(triangle).remove();
    }

    init = () => {
        this.newTriangle(this.width / 2, this.height * 2 / 3, this.triangleHeight * 2 / 3)

        for (var i = 0; i < 5; i++) {
            this.processOuterTriangles();
        }
    }

    transform = () => {
        this.svg.attr("transform", d3.event.transform)
    }
}
